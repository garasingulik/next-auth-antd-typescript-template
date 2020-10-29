import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import db from '../../../lib/db'
import * as password from '../../../lib/password'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter username" },
        password: { label: "Password", type: "password", placeholder: "Enter password" }
      },
      authorize: async (credentials) => {
        const dbAdapter = await db.getAdapter()
        let dbUser = await dbAdapter.getUserByEmail(credentials.username)

        if (!dbUser && credentials.username === process.env.FIRST_USER_USERNAME && credentials.password === process.env.FIRST_USER_PASSWORD) {
          // next-auth createUser adapter didn't allow additional property to be created
          dbUser = await dbAdapter.createUser({ name: credentials.username, email: process.env.FIRST_USER_USERNAME })

          const hashedPassword = await password.hashPassword(process.env.FIRST_USER_PASSWORD)
          dbUser.password = hashedPassword
          dbUser = await dbAdapter.updateUser(dbUser)

          console.log(dbUser)
        }

        if (dbUser) {
          // check if password is valid
          const compareResult = await password.verifyPassword(credentials.password, dbUser.password)
          if (!compareResult) {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null)
          }

          // remove password property
          delete dbUser.password
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(dbUser)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    })
  ],
  adapter: db,
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SECRET,

    // Set to true to use encryption (default: false)
    encryption: false
  },
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (user, account, profile) => {
      // no restriction at this point
      let isAllowedToSignIn = true

      if (isAllowedToSignIn) {
        return Promise.resolve(true)
      } else {
        // redirect to home when no access
        return Promise.reject(null)
      }
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000)
      }
      return Promise.resolve(token)
    }
  }
}

const AuthenticationRequest = (req, res) => {
  NextAuth(req, res, options)
}

export default AuthenticationRequest