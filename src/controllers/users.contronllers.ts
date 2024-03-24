import { Request, Response } from 'express'
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
