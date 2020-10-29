// To make importing them easier, you can export all models from single file
import User, { UserSchema } from "./User"

export default {
  User: {
    model: User,
    schema: UserSchema,
  },
}