import fastifyAutoload from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import mongoose from "mongoose";
import path from "path";

const fastify = Fastify({
  logger: true,
});

const fastifyEnvOptions = {
  dotenv: true,
  schema: {
    type: "object",
    required: ["PORT", "CONNECT_DB", "SALT"],
    properties: {
      CONNECT_DB: { type: "string" },
      PORT: { type: "string", default: 5000 },
      SALT: { type: "string", default: "super-secret" },
    },
  },
};

const start = async () => {
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

    await fastify.listen({ port: fastify.config.PORT });

    console.log("...");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
