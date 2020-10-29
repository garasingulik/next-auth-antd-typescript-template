import Adapters from "next-auth/adapters"
import Models from "./models"

const sqliteConfig = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true
}

/*
  TypeORM DB Adapter: https://next-auth.js.org/tutorials/creating-a-database-adapter

  createUser,
  getUser,
  getUserByEmail,
  getUserByProviderAccountId,
  getUserByCredentials,
  updateUser,
  deleteUser,
  linkAccount,
  unlinkAccount,
  createSession,
  getSession,
  updateSession,
  deleteSession,
  createVerificationRequest,
  getVerificationRequest,
  deleteVerificationRequest
*/
const db = Adapters.TypeORM.Adapter(
  // The first argument should be a database connection string or TypeORM config object
  process.env.DATABASE_URL || sqliteConfig,
  // The second argument can be used to pass custom models and schemas
  {
    models: {
      User: Models.User,
    },
  }
)

export default db