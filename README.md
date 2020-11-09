# Next.js + NextAuth.js + AntD + TypeScript Template

This template is a homebrew template that I mainly use to bootstrap a new frontend project. It was based on official [Next.js with Ant Design Pro Layout Less](https://github.com/vercel/next.js/tree/canary/examples/with-ant-design-pro-layout-less) template with additional things that I mostly use in my projects.

The template has been preconfigured with basic [NextAuth.js](https://next-auth.js.org/) credentials authentication using sqlite backend (not recommended for production), and ofcourse you can change this database backend with any database of your preference that is supported by NextAuth.js TypeORM Adapter.

# Running in Development

Clone this repository and run:

```
npm install
```

Before we run the project, create one `.env.local` file in the root of the project and configure this value:

```
# first user
FIRST_USER_USERNAME=<first user that will automatically created>
FIRST_USER_PASSWORD=<first user password>

# auth
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=<database connection string>
SESSION_SECRET=<generate secret for session>
JWT_SECRET=<generate secret for JWT>

# auth email
EMAIL_SERVER=<node mailer email connection string>
EMAIL_FROM=<email sender for verification>

```

To run this project in the development:

```
npm run dev
```

The development server will run at [http://localhost:3000](http://localhost:3000)
