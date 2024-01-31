const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    password && user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

  if (!passwordCorrect)
    return response.status(401).json({ error: "Invalid username or password" });

  const userForToken = { username, id: user._id };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;
