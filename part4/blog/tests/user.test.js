const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("testingPassword", 10);
  const user = new User({ username: "root", user: "test", passwordHash });
  await user.save();
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
});

afterAll(async () => {
  await mongoose.connection.close();
});
