import UploadsController from "../controllers/uploads.js";

async function uploadsRoutes(fastify, options) {
  const Message = {
    type: "object",
    properties: { message: { type: "string" } },
  };

  const postImageOpts = {
    handler: UploadsController.uploadImage,
    preValidation: [fastify.checkAuth],
    schema: {
      200: Message,
    },
  };

  fastify.post("/image", postImageOpts);

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
  };

  fastify.delete("/image", deleteImageOpts);

  const getImagesOpts = {
    handler: UploadsController.getImages,
    preValidation: [fastify.checkAuth],
    schema: {
      200: { type: "array", items: { type: "string" } },
    },
  };

  fastify.get("/images", getImagesOpts);
}

export default uploadsRoutes;
