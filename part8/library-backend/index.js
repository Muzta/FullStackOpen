const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const validateAuthorization = (context) => {
  if (!context.currentUser) {
    throw new GraphQLError("Not authorized", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }
};

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      return (await Book.find({}).populate("author")).filter(
        (book) =>
          (!author || book.author.name === author) &&
          (!genre || book.genres.includes(genre))
      );
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const authorsWithBookCount = authors.map(async (a) => {
        const bookCount = await Book.countDocuments({
          author: a._id,
        });
        return { ...a.toObject(), id: a._id, bookCount };
      });
      return authorsWithBookCount;
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      validateAuthorization(context);

      // Validation of the book's author data
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          if (error.name === "ValidationError") {
            if (error.errors.name && error.errors.name.kind === "minlength")
              throw new GraphQLError(
                "Author name is too short (4 characters min)",
                {
                  extensions: {
                    code: "BAD_USER_INPUT",
                  },
                }
              );
            else
              throw new GraphQLError("Validation error occurred", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  error: error.errors,
                },
              });
          } else
            throw new GraphQLError("Saving new author failed", {
              extensions: {
                code: "INTERNAL_SERVER_ERROR",
                error: error.message,
              },
            });
        }
      }

      const newBook = new Book({ ...args, author: author._id });

      // Validation of the book data
      try {
        await newBook.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          if (error.errors.title && error.errors.title.kind === "minlength")
            throw new GraphQLError("Title is too short (5 characters min)", {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            });
          else if (error.errors.title && error.errors.title.kind === "unique")
            throw new GraphQLError("Title must be unique", {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            });
          else
            throw new GraphQLError("Validation error occurred", {
              extensions: {
                code: "BAD_USER_INPUT",
                error: error.errors,
              },
            });
        } else
          throw new GraphQLError("Saving new book failed", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              error: error.message,
            },
          });
      }

      return newBook.populate("author");
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      validateAuthorization(context);

      const author = await Author.findOne({ name });
      author.born = setBornTo;
      return author.save();
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const newUser = new User({ username, favoriteGenre });
      return newUser.save().catch((error) => {
        throw new GraphQLError("Error creating a new user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (password !== "secret" || !user) {
        throw new GraphQLError("Error login, incorrect credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userToken = {
        username,
        id: user._id,
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
