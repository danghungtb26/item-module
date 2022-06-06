import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
