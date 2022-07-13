import Project from "../models/project.js"

const ProjectController = {
  getProjects: async function (request, reply) {
    const { search, showOnMainPage } = request.query

    const query = {}

    if (search) query.search = search
    if (showOnMainPage) query.showOnMainPage = showOnMainPage

    try {
      const projects = await Project.find(query)
      return reply.send({ projects })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  getProject: async function (request, reply) {
    const { _id } = request.query

    const query = {}

    if (_id) query._id = _id

    try {
      const project = await Project.findOne(query)
      return reply.send({ project })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  createProject: async function (request, reply) {
    const model = request.body

    const check = await Project.findOne({ alias: model.alias })

    if (check) throw new Error("Проект с таким алиасом уже существует")

    const project = new Project({
     ...model
    })

    try {
      await project.save()
      return reply.send({ project })
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateProject: async function (request, reply) {
    const { _id, ...obj } = request.body
    try {
      await Project.updateOne({ _id }, obj)
      return reply.send({ message: "Проект обновлен" })
    } catch (error) {
      throw new Error({ error: error.message })
    }
  },

  deleteProject: async function (request, reply) {
    const { _id } = request.body

    if (!_id) throw new Error("Для удаления проекта необходимо указать _id")

    try {
      await Project.deleteOne({ _id })

      return reply.send({ message: "Проект успешно удалена" })
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export default ProjectController
