import Swagger from '@fastify/swagger';
import fp from 'fastify-plugin';
import { readFileSync } from 'fs';
import path from "path";
  
const { version } = JSON.parse(readFileSync(path.join(path.resolve(), 'package.json')))

async function swaggerGenerator (fastify, opts) {
  fastify.register(Swagger, {
    routePrefix: '/documentation',
    
    swagger: {
      info: {
        title: 'Fastify URL Shortener',
        description: 'Fastify URL Shortener documentation',
        version
      },
      externalDocs: {
        url: 'https://github.com/delvedor/fastify-example',
        description: 'Find more info here'
      },
      host: 'localhost', // and your deployed url
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Bearer',
          in: 'header'
        },
        Csrf: {
          type: 'apiKey',
          name: 'x-csrf-token',
          in: 'header'
        }
      }
    },

    exposeRoute: fastify.config.NODE_ENV !== 'production'
  })
}

export default fp(swaggerGenerator, {
  name: 'swaggerGenerator'
})
