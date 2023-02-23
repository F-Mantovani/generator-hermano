import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { dbConnect } from './src/database/utils/dbConnect.mjs'
                       
import routes from './src/routes.mjs'

dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', routes)

export default app

