import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
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

    app.use('/api', routes)
    app.use(express.static(path.join(__dirname, '..', 'build')))

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
    })

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch(e => {
    console.log('🚀 ~ file: index.ts ~ line 33 ~ e', e)
    console.log('db not running')

    process.exit(1)
  })
