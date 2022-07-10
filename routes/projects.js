import ProjectsController from "../controllers/projects.js"

async function routes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const Project = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
    },
  }

  const NewProject = {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
  }

  const getProjectsOpts = {
    handler: ProjectsController.getProjects,
    schema: {
      params: { type: "object", properties: { search: { type: "string" } } },
      response: {
        200: {
          type: "object",
          properties: {
            projects: { type: "array", items: Project },
          },
        },
      },
    },
  }

  const getProjectOpts = {
    handler: ProjectsController.getProject,
    schema: {
      params: {
        type: "object",
        properties: { _id: { type: "string" } },
      },
      response: {
        200: { type: "object", properties: { project: Project } },
      },
    },
  }

  const createProjectOpts = {
    handler: ProjectsController.createProject,
    preValidation: [fastify.checkAuth],
    body: NewProject,
    schema: {
      response: {
        200: { type: "object", properties: { project: Project } },
      },
    },
  }

  const updateProjectOpts = {
    handler: ProjectsController.updateProject,
    preValidation: [fastify.checkAuth],
    schema: {
      body: Project,
      response: {
        200: Message,
      },
    },
  }

  const deleteProjectOpts = {
    handler: ProjectsController.deletetProject,
    preValidation: [fastify.checkAuth],
    schema: {
      body: { type: "object", properties: { _id: { type: "string" } } },
      response: {
        200: Message,
      },
    },
  }
  fastify.get("/projects", getProjectsOpts)

  fastify.get("/project", getProjectOpts)

  fastify.post("/project", createProjectOpts)

  fastify.put("/project", updateProjectOpts)

  fastify.delete("/project", deleteProjectOpts)
}

export default routes
