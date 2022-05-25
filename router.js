const { getCategories, getCategory, createCategory, updateCategory, deleteCategory }= require("./workers/categories");

async function routes(fastify, options) {
  fastify.get("/api/categories", getCategories);
  fastify.post("/api/checkanswer", checkQuiz);
  fastify.get("/api/quiz", getQuiz);
}

module.exports = routes