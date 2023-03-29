import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { dbConnect } from './src/configs/dbConnect.mjs'
                       
import routes from './src/routes.mjs'
import notFound from './src/routes/not-found.mjs'
import errorHandling from './src/routes/error-handling.mjs'

const database = await dbConnect()

console.log(`Database connected to ${database.connections[0].name}`)

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', routes)

app.use(notFound)

errorHandling(app)

export default app

