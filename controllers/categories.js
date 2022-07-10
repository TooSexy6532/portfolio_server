import Category from "../models/category.js"

const CategoryController = {
  getCategories: async function (request, reply) {
    const { search } = request.params

    const query = {}

    query.search = search

    try {
      const categories = await Category.find(query)
      return reply.send({ categories })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  getCategory: async function (request, reply) {
    const { _id } = request.params

    const query = {}

    if (_id) query._id = _id

    try {
      const category = await Category.findOne(query)
      return reply.send({ category })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  createCategory: async function (request, reply) {
    const { name, description } = request.body

    const check = await Category.findOne({ name })

    if (check) throw new Error("Такая категория уже существует")

    const category = new Category({
      name,
      description,
    })

    try {
      await category.save()
      return reply.send({ category })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  updateCategory: async function (request, reply) {
    const { _id, ...obj } = request.body
    try {
      await Category.updateOne({ _id }, obj)
      return reply.send({ message: "Категория обновлена" })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  deletetCategory: async function (request, reply) {
    const { _id } = request.body

    if (!_id) throw new Error("Для удаления категории необходимо указать _id")
    F
    try {
      await Category.deleteOne({ _id })

      return reply.send({ message: "Категория успешно удалена" })
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export default CategoryController
