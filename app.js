const fastify = require("fastify")({ logger: true });
const fileUpload = require("fastify-file-upload");
const path = require("path");
fastify.register(
  fileUpload({
    createParentPath: true,
  }),
);
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

try {
  mongoose.connect(process.env.CONNECT_DB);
} catch (e) {
  console.error(e);
}

fastify.register(require("@fastify/cors"), {
  origin: true,
});

fastify.register(helmet, { global: true });

fastify.register(require("./router"));

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
