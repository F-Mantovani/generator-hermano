import { Router } from 'express'

const router = Router()

router.use((_, res, next) => {
  console.log('error handling')
  res.status(404).json({ message: 'route not found' })
})

export default router
