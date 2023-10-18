const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsToInsert = helper.initialBlogs.map((blog) => new Blog(blog));
  await Blog.insertMany(blogsToInsert);

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("testingPassword", 10);
  const user = new User({ username: "root", name: "test", passwordHash });
  await user.save();
});

test("List of blogs is returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("Unique identifier property is called 'id'", async () => {
  const response = (await api.get("/api/blogs")).body;
  expect(response[0].id).toBeDefined();
});

describe("Creating a new blog post", () => {
  const newBlog = {
    title: "Test blog",
    author: "unknown",
    url: "http://test.com",
    likes: 3,
  };

  const makeCorrectPostRequest = async (api, data) => {
    const response = await api
      .post("/api/blogs")
      .send(data)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContainEqual(newBlog.title);
    return response;
  };

  test("succeeds 201 with fresh blog and return it as the response", async () => {
    const response = await makeCorrectPostRequest(api, newBlog);
    expect(response.body).toBeDefined();
  });

  test("succeeds 201 with likes property missing, default 0", async () => {
    const { likes, ...blogMissingLikes } = newBlog;

    const response = await makeCorrectPostRequest(api, blogMissingLikes);
    expect(response.body).toBeDefined();
    expect(blogMissingLikes.likes).toBeUndefined();
    expect(response.body.likes).toEqual(0);
  });

  test("without title property throws 400", async () => {
    const { title, ...blogMissingTitle } = newBlog;

    const response = await api
      .post("/api/blogs")
      .send(blogMissingTitle)
      .expect(400);

    expect(response.body.error).toBe("Title or url missed");
    expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length);
  });

  test("without url property throws 400", async () => {
    const { url, ...blogMissingURL } = newBlog;

    const response = await api
      .post("/api/blogs")
      .send(blogMissingURL)
      .expect(400);

    expect(response.body.error).toBe("Title or url missed");
    expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length);
  });

  test("with correct user id succeeds 201 and return user data when the list is fetched", async () => {
    const user = await User.findOne({});
    const blog = { ...newBlog, userId: user.id };

    const response = await makeCorrectPostRequest(api, blog);
    expect(response.body.user).toBeDefined();

    const blogsList = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const createdBlog = blogsList.body.find((b) => b.title === blog.title);
    expect(createdBlog.user.username).toBeDefined();
  });
});

describe("Deletion of a blog post", () => {
  test("succeeds with code 204 if id is valid and in db", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToDelete = startingBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(startingBlogs.length - 1);

    const startingBlogTitles = startingBlogs.map((blog) => blog.title);
    const endingBlogTitles = endingBlogs.map((blog) => blog.title);
    expect(startingBlogTitles).toContain(blogToDelete.title);
    expect(endingBlogTitles).not.toContain(blogToDelete.title);
  });

  test("succeeds with code 204 if id is valid but not in db", async () => {
    const startingBlogs = await helper.blogsInDb();
    const existingId = startingBlogs[0].id;
    const inventedId = existingId.slice(0, -3) + "000";

    await api.delete(`/api/blogs/${inventedId}`).expect(204);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(startingBlogs.length);
  });

  test("error if id has an invalid format", async () => {
    const startingBlogs = await helper.blogsInDb();
    const existingId = startingBlogs[0].id;
    const malformattedId = existingId.slice(0, -2);

    const response = await api
      .delete(`/api/blogs/${malformattedId}`)
      .expect(400);
    expect(response.body.error).toBe("Malformatted id");

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(startingBlogs.length);
  });
});

describe("Updating a blog post", () => {
  const { title, author, url, likes, _id } = helper.initialBlogs[0];
  const blogToUpdateProperties = { title, author, url, likes };

  test("succeeds with code 200", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToUpdate = { ...blogToUpdateProperties, likes: likes + 1 };
    await api
      .put(`/api/blogs/${_id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(startingBlogs.length);
    expect(startingBlogs.find((blog) => blog.id === _id).likes).toBe(likes);
    expect(endingBlogs.find((blog) => blog.id === _id).likes).toBe(likes + 1);
  });

  test("succeeds with code 200 and keep original attributes even when not passed", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToUpdate = {
      ...blogToUpdateProperties,
      title: undefined,
      url: undefined,
      likes: likes + 1,
    };

    await api
      .put(`/api/blogs/${_id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(startingBlogs.length);

    const previousBlog = startingBlogs.find((blog) => blog.id === _id);
    const updatedBlog = endingBlogs.find((blog) => blog.id === _id);
    expect(previousBlog.likes).toBe(likes);
    expect(updatedBlog.likes).toBe(likes + 1);
    expect(updatedBlog.title && updatedBlog.url).toBeDefined();
  });

  test("succeeds with code 200 if id is valid but not in db", async () => {
    const startingBlogs = await helper.blogsInDb();
    const existingId = startingBlogs[0].id;
    const inventedId = existingId.slice(0, -3) + "000";

    const response = await api
      .put(`/api/blogs/${inventedId}`)
      .send(blogToUpdateProperties)
      .expect(200);
    expect(response.body).toBeNull();
  });

  test("error 400 if id has an invalid format", async () => {
    const startingBlogs = await helper.blogsInDb();
    const existingId = startingBlogs[0].id;
    const malformattedId = existingId.slice(0, -2);

    const response = await api
      .put(`/api/blogs/${malformattedId}`)
      .send(blogToUpdateProperties)
      .expect(400);
    expect(response.body.error).toBe("Malformatted id");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
