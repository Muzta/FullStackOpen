// Merge params needed to be added so this can take params from the parent router (blogsRouter)
const commentsRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

commentsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    const blogId = request.params.id;
    // Use lean() method to work with it as a plain JavaScript object instead of a Mongoose document, allowing to freely add new properties (comments) if they are not presented yet
    const blog = await Blog.findById(blogId).lean();

    if (!body.comment)
      return response.status(400).json({ error: "Comment missed" });

    if (!blog.comments) blog.comments = [];

    const newComment = new Comment({ ...body, blog: blog.id });
    const result = await newComment.save();
    blog.comments.push(result._id);
    // With lean() method, save() function can't be called; it has to be handled this way
    await Blog.findByIdAndUpdate(blogId, { comments: blog.comments });
    response.status(201).json(result);
  }
);

module.exports = commentsRouter;
