import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.contronllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const router = Router()
router.post('/login', loginValidator, loginController)
/**
 * Register a new user
 * Path: /register
 * method: POST
 * body :{email: string, password: string, name: string, confirm_password: string, date_of_birth: ISO8601}
 */
router.post('/register', registerValidator, registerController)
export default router
