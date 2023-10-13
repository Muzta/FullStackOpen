const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  // If likes is undefined, default 0
  const blog = new Blog({ likes: 0, ...body });
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
