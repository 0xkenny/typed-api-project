import { fastifyCors } from '@fastify/cors'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifySwagger } from '@fastify/swagger'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { userRoutes } from './routes/user.routes'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth.routes'

const app = fastify({
  logger: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Project API Typed',
      version: '1.0.0',
      description: 'Simple api for a simple project',
    },
    tags: [
      { name: 'Users', description: 'User related endpoints' },
      { name: 'Auth', description: 'Auth related endpoints' },
    ],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(userRoutes, { prefix: 'api' })
app.register(authRoutes, { prefix: 'auth' })

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`app listening at http://localhost:3000`)
})
