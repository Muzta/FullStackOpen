const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url)
    return response.status(400).json({ error: "Title or url missed" });

  const user = request.user;

  // If likes is undefined, default 0
  const blog = new Blog({ likes: 0, ...body, user: user.id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return response.status(404).json({ error: "Blog not found" });

    const user = request.user;

    if (blog.user.toString() !== user.id)
      return response
        .status(401)
        .json({ error: "Only blog owner can delete it" });

    await blog.deleteOne();
    return response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  // If user data is provided, retain only its id. Otherwise, maintain the existing user id value
  const blogpost = { ...body, user: body.user.id || body.user };

  const updatedBlogpost = await Blog.findByIdAndUpdate(id, blogpost, {
    new: true,
  });
  response.json(updatedBlogpost);
});

module.exports = blogsRouter;
