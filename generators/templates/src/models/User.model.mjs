import createSchema from "./modelGenerator.mjs";

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  usernameToDisplay: String
}


export default createSchema(userSchema, 'User')