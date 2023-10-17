const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("testingPassword", 10);
  const user = new User({ username: "root", user: "test", passwordHash });
  await user.save();
});

test("List of users is returned as JSON", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(1);
});

test("List of users displays blogs data too", async () => {
  const user = await User.findOne({});

  const newBlog = {
    title: "Test blog",
    author: "unknown",
    url: "http://test.com",
    likes: 3,
  };
  newBlog.userId = user.id;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersList = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const userWithBlog = usersList.body.find((u) => u.username === user.username);
  expect(userWithBlog.blogs[0].url).toBeDefined();
});

describe("Creation of new user when there is initially one", () => {
  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  test("succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("error 400 when password given is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const errorUser = { ...newUser, password: newUser.password.slice(0, 2) };

    const response = await api.post("/api/users/").send(errorUser).expect(400);
    expect(response.body.error).toBe(
      "Password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(errorUser.username);
  });

  test("error 400 when password is not given", async () => {
    const usersAtStart = await helper.usersInDb();

    const errorUser = { ...newUser, password: undefined };

    const response = await api.post("/api/users/").send(errorUser).expect(400);
    expect(response.body.error).toBe(
      "Password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(errorUser.username);
  });

  test("error 400 when username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const errorUser = { ...newUser, username: newUser.username.slice(0, 2) };

    const response = await api.post("/api/users").send(errorUser).expect(400);
    expect(response.body.error).toContain(
      "Username must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(errorUser.username);
  });

  test("error 400 when username is not given", async () => {
    const usersAtStart = await helper.usersInDb();

    const errorUser = { ...newUser, username: undefined };

    const response = await api.post("/api/users").send(errorUser).expect(400);
    expect(response.body.error).toContain("required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(errorUser.username);
  });

  test("error 400 when username is already taken", async () => {
    await api.post("/api/users").send(newUser).expect(201);
    const usersAtStart = await helper.usersInDb();

    const repeatedUser = { ...newUser, name: "New one" };

    const response = await api
      .post("/api/users")
      .send(repeatedUser)
      .expect(400);
    expect(response.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
