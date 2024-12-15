import { Hono } from 'hono'
import authRouter from './routers/auth.router'
import {logger} from "hono/logger"

const app = new Hono().basePath("/").route("/auth", authRouter)
app.use(logger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
