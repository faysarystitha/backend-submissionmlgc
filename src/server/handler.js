const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

async function postPredictHandler(req, h) {
  const { image } = req.payload;
  const { model } = req.server.app;

  const { result, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: result,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  const response = h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    })
    .code(201);

  return response;
}

async function getHistoriesHandler(req, h) {}

module.exports = [postPredictHandler, getHistoriesHandler];
