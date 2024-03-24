import { Router } from 'express'
import { loginController } from '~/controllers/users.contronllers'
import { loginValidator } from '~/middlewares/users.middlewares'

const router = Router()
router.post('/login', loginValidator, loginController)

export default router
