const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Define a pre-remove hook to remove associated comments
blogSchema.pre(
  // Trigger each time deleteOne method is called
  "deleteOne",
  // Ensure the deleteOne hook applies to document-level operations (instances), not query-level ones.
  { document: true, query: false },
  async function () {
    const Comment = require("./comment");
    await Comment.deleteMany({ _id: { $in: this.comments } });
  }
);

module.exports = mongoose.model("Blog", blogSchema);
