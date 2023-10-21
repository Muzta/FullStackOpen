const User = require("../models/user");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).send({ error: "Malformatted id" });
  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message });
  if (error.name === "JsonWebTokenError")
    return response.status(401).send({ error: error.message });
  next(error);
};

// Add the auth token from header to request
const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer"))
    request.token = auth.replace("Bearer ", "");
  next();
};

// Add the user mongoose object to the request after verifying his jwt
const userExtractor = async (request, response, next) => {
  const userToken = jwt.verify(request.token, process.env.SECRET);
  if (!userToken.id)
    return response.status(401).json({ error: "Invalid token" });
  const user = await User.findById(userToken.id);
  request.user = user;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
