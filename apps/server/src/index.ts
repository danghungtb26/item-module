import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import db from './db'

dotenv.config()

db.authenticate()
  .then(() => {
    const app: Express = express()
    const port = process.env.PORT

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())

    app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))

    app.use('', routes)

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch(() => {
    console.log('db not running')

    process.exit(1)
  })
