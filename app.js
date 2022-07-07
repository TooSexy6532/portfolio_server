import fastifyAutoload from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import mongoose from "mongoose";
import path from "path";
import initFolders from "./services/initFolders.js";

const fastify = Fastify({
  logger: true,
});

const fastifyEnvOptions = {
  dotenv: true,
  schema: {
    type: "object",
    required: ["PORT", "CONNECT_DB", "SALT"],
    properties: {
      CONNECT_DB: {
        type: "string",
        default: "mongodb://127.0.0.1:27017/your_database_name",
      },
      PORT: { type: "string", default: 5000 },
      SALT: { type: "string", default: "some32CharacterSuperSecretCode" },
    },
  },
};

const start = async (fastify) => {
  try {
    await fastify.register(fastifyEnv, fastifyEnvOptions);

    await mongoose.connect(fastify.config.CONNECT_DB);

    await fastify.register(fastifyAutoload, {
      dir: path.join(path.resolve(), "plugins"),
      options: Object.assign({}),
    });

    await fastify.register(fastifyAutoload, {
      dir: path.join(path.resolve(), "routes"),
      options: Object.assign({ prefix: "/api" }),
    });

    await initFolders();

    await fastify.listen({ port: fastify.config.PORT });

    console.log("...");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(fastify);
