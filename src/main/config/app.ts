import 'express-async-errors'
import '@/shared/infra/container'

import express, { Express } from 'express'
import { celebrateErrors, bodyParser, cors, helmet } from '@/main/middlewares'

import setupRoutes from '@/main/config/routes'

export const setupApp = (): Express => {
  const app = express()

  app.use(helmet)
  app.use(bodyParser)
  app.use(cors)
  app.use(celebrateErrors)

  setupRoutes(app)

  return app
}
