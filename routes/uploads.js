import UploadsController from "../controllers/uploads.js";

async function uploadsRoutes(fastify, options) {
  fastify.post("/upload", UploadsController.uploadFile);
  fastify.delete("/upload", UploadsController.deleteFile);
}

export default uploadsRoutes;
