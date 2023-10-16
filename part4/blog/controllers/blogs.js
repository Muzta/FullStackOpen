const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url)
    return response.status(400).json({ error: "Title or url missed" });

  // If likes is undefined, default 0
  const blog = new Blog({ likes: 0, ...body });
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blogpost = { ...body };

  const updatedBlogpost = await Blog.findByIdAndUpdate(id, blogpost, {
    new: true,
  });
  response.json(updatedBlogpost);
});

module.exports = blogsRouter;
