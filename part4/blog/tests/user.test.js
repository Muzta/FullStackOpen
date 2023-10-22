const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

const testingUser = {
  username: "test",
  user: "test",
  password: "testingPassword",
};

let usersAtStart;

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash(testingUser.password, 10);
  const user = new User({
    username: testingUser.username,
    user: testingUser.user,
    passwordHash,
  });
  await user.save();

  usersAtStart = await helper.usersInDb();
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
  const token = await helper.tokenFromUser(api, testingUser);

  const newBlog = {
    title: "Test blog",
    author: "unknown",
    url: "http://test.com",
    likes: 3,
    user: user.id,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
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

  const makePostRequest = (user, httpCode) => {
    return api
      .post("/api/users")
      .send(user)
      .expect("Content-Type", /application\/json/)
      .expect(httpCode);
  };

  const checkBadPostRequest = async (response, errorMessage, errorUser) => {
    expect(response.body.error).toContain(errorMessage);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    // To avoid in the last test
    if (errorUser) {
      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).not.toContain(errorUser.username);
    }
  };

  test("succeeds 201 with a fresh username", async () => {
    await makePostRequest(newUser, 201);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("error 400 when password given is shorter than 3 characters", async () => {
    const errorUser = { ...newUser, password: newUser.password.slice(0, 2) };
    const response = await makePostRequest(errorUser, 400);
    await checkBadPostRequest(
      response,
      "Password must be at least 3 characters long",
      errorUser
    );
  });

  test("error 400 when password is not given", async () => {
    const { password, ...errorUser } = newUser;
    const response = await makePostRequest(errorUser, 400);
    await checkBadPostRequest(
      response,
      "Password must be at least 3 characters long",
      errorUser
    );
  });

  test("error 400 when username is shorter than 3 characters", async () => {
    const errorUser = { ...newUser, username: newUser.username.slice(0, 2) };
    const response = await makePostRequest(errorUser, 400);
    await checkBadPostRequest(
      response,
      "Username must be at least 3 characters long",
      errorUser
    );
  });

  test("error 400 when username is not given", async () => {
    const { username, ...errorUser } = newUser;
    const response = await makePostRequest(errorUser, 400);
    await checkBadPostRequest(response, "required", errorUser);
  });

  test("error 400 when username is already taken", async () => {
    const repeatedUser = { ...newUser, username: testingUser.username };
    const response = await makePostRequest(repeatedUser, 400);
    await checkBadPostRequest(response, "expected `username` to be unique");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
