import { fastifyCors } from '@fastify/cors'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifySwagger } from '@fastify/swagger'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { userRoutes } from './routes/user.routes'
import fjwt, { FastifyJWT } from '@fastify/jwt'
import { authRoutes } from './routes/auth.routes'
import fCookie from '@fastify/cookie'

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

app.register(fjwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt
  return next()
})

app.register(fCookie, {
  secret: `${process.env.JWT_SECRET}`,
  hook: 'preHandler',
})

app.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token

    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
  }
)

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`app listening at http://localhost:3000`)
})
