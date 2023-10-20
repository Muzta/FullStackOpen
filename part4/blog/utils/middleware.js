const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).send({ error: "Malformatted id" });
  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message });
  if (error.name === "JsonWebTokenError")
    return response.status(401).send({ error: error.message });
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer"))
    request.token = auth.replace("Bearer ", "");
  next();
};

module.exports = { errorHandler, tokenExtractor };
