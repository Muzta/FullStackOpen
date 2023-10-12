const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsToInsert = helper.initialBlogs.map((blog) => new Blog(blog));
  await Blog.insertMany(blogsToInsert);
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
  console.log("Prueba", response[0]);
  expect(response[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
