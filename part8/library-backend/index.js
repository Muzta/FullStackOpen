const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
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
    allBooks: async (root, args) => {
      return Book.find({});
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const authorsWithBookCount = authors.map(async (a) => {
        const bookCount = await Book.countDocuments({
          author: a._id,
        });
        console.log(a);
        return { ...a.toObject(), id: a._id, bookCount };
      });
      return authorsWithBookCount;
    },
    // allBooks: (root, { author, genre }) =>
    //   books.filter(
    //     (book) =>
    //       // In case no param is given, avoid that filter
    //       (!author || book.author === author) &&
    //       (!genre || book.genres.includes(genre))
    //   ),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const newBook = new Book({ ...args, author: author._id });

      return newBook.save();
    },
    // editAuthor: (root, { name, setBornTo }) => {
    //   const author = authors.find((author) => author.name === name);
    //   if (!author) return null;

    //   const updatedAuthor = { ...author, born: setBornTo };
    //   authors = authors.map((a) => (a.name === name ? updatedAuthor : a));
    //   return updatedAuthor;
    // },
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
