import { deflate } from 'zlib'
import { TokenType } from '~/constants/enums'
import { RegisterReqBody } from '~/models/request/User.requests'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import databseServices from './database.services'

class UsersService {
  private signAcessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPRIES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFESH_TOKEN_EXPRIES_IN
      }
    })
  }
  async register(payload: RegisterReqBody) {
    const result = await databseServices.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString()
    this.signAcessToken(user_id)
    const [access_token, refresh_token] = await Promise.all([
      this.signAcessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return {
      access_token,
      refresh_token
    }
  }
  async checkEmailExist(email: string) {
    const user = await databseServices.users.findOne({ email })
    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
