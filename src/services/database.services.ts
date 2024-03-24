import { MongoClient, Db } from 'mongodb'
import { config } from 'dotenv'

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.w7cjlyy.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
    async function run() {}
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      await this.client.close()
    }
  }
}

// Create object from DatbaseServices
const databseServices = new DatabseServices()
export default databseServices
