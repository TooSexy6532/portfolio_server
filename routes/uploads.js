import UploadsController from "../controllers/uploads.js"

async function uploadsRoutes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  }

  const postImageOpts = {
    handler: UploadsController.uploadImage,
    preValidation: [fastify.checkAuth],
    schema: {
      200: Message,
    },
  }

  const deleteImageOpts = {
    handler: UploadsController.deleteImage,
    body: {
      type: "object",
      required: ["filename"],
      properties: { filename: { type: "string" } },
    },
    preValidation: [fastify.checkAuth],
    schema: {
      200: Message,
    },
  }

  const getImagesOpts = {
    handler: UploadsController.getImages,
    // preValidation: [fastify.checkAuth],
    schema: {
      200: { type: "array", images: { type: "string" } },
    },
  }

  fastify.post("/image", postImageOpts)

  fastify.delete("/image", deleteImageOpts)

  fastify.get("/images", getImagesOpts)

}

export default uploadsRoutes
