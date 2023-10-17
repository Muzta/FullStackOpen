const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).send({ error: "Malformatted id" });
  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message });
  next(error);
};

module.exports = { errorHandler };
