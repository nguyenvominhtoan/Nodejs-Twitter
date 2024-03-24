import express from 'express'
import router from './routes/user.routes'
import databseServices from './services/database.services'

const app = express()
const port = 3000

app.use(express.json())
app.use('/user', router)
databseServices.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
