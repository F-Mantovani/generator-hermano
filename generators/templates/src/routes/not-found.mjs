import { Router } from 'express'

const router = Router()

router.use((_, res) => {
  res.status(404).json({ message: 'route not found' })
})

export default router
