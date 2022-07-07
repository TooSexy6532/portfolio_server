import fastifyMultipart from '@fastify/multipart';
import fp from 'fastify-plugin';

async function multipart (fastify, opts) {
  fastify.register(fastifyMultipart)
}

export default fp(multipart, {
  name: 'multipart'
})