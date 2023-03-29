import { Router } from 'express'

import authRoutes from '../src/routes/user.routes.mjs'


const router = Router()

router.get('/health', (_, res) => res.status(200).json({ Message: 'Ok' }))

router.use('/auth', authRoutes)



export default router
