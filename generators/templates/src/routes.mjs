import { Router } from 'express'

import authRoutes from '../src/routes/user.routes.mjs'
import notFound from './routes/not-found.mjs'

const router = Router()

router.get('/health', (_, res) => res.status(200).json({ Message: 'Ok' }))

router.use('/auth', authRoutes)

router.use(notFound)

router.use((error, req, res, _) => {
	console.log(`ERROR: ${error.message} in ${req.method} ${req.path}`)
	console.log(error)
	res.status(error.status || 500).json({ message: error.message, place: error.place })
})

export default router
