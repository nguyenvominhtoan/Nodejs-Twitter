import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databseServices from '~/services/database.services'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/request/User.requests'
import { body } from 'express-validator'

export const loginController = (res: Response, req: Request) => {
  const { email, password } = req.body

  if (email === 'nguyentoan@gmail.com' && password === '123') {
    return res.json({
      messegae: 'Login Successfuly'
    })
  }
  return res.status(400).json({
    messegae: 'Login Successfuly'
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    return res.status(200).json({
      message: 'Register Successfully',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register Fail'
    })
  }
}
