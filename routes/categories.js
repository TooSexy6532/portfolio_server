import CategoriesController from "../controllers/categories.js"

async function routes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const Category = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
    },
  }

  const NewCategory = {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
  }

  const getCategoriesOpts = {
    handler: CategoriesController.getCategories,
    schema: {
      params: { type: "object", properties: { search: { type: "string" } } },
      response: {
        200: {
          type: "object",
          properties: {
            categories: { type: "array", items: Category },
          },
        },
      },
    },
  }

  const getCategoryOpts = {
    handler: CategoriesController.getCategory,
    schema: {
      params: {
        type: "object",
        properties: { _id: { type: "string" } },
      },
      response: {
        200: { type: "object", properties: { category: Category } },
      },
    },
  }

  const createCategoryOpts = {
    handler: CategoriesController.createCategory,
    preValidation: [fastify.checkAuth],
    body: NewCategory,
    schema: {
      response: {
        200: { type: "object", properties: { category: Category } },
      },
    },
  }

  const updateCategoryOpts = {
    handler: CategoriesController.updateCategory,
    preValidation: [fastify.checkAuth],
    schema: {
      body: Category,
      response: {
        200: Message,
      },
    },
  }

  const deleteCategoryOpts = {
    handler: CategoriesController.deletetCategory,
    preValidation: [fastify.checkAuth],
    schema: {
      body: { type: "object", properties: { _id: { type: "string" } } },
      response: {
        200: Message,
      },
    },
  }
  fastify.get("/categories", getCategoriesOpts)

  fastify.get("/category", getCategoryOpts)

  fastify.post("/category", createCategoryOpts)

  fastify.put("/category", updateCategoryOpts)

  fastify.delete("/category", deleteCategoryOpts)
}

export default routes
