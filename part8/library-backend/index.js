const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
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
  }
`;

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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, { name, setBornTo }) => {
      const author = await Author.findOne({ name });
      author.born = setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
