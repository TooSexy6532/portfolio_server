const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require("./workers/categories");
const { uploads } = require("./workers/uploads");

async function routes(fastify, options) {
  fastify.get("/api/categories", getCategories);


  fastify.post('/uploads', uploads)
}

module.exports = routes