import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'

export async function dbConnect() {
  return mongoose.connect(MONGO_URI)
}

export async function disconnect() {
  console.log('Database is disconnecting ....')
  await mongoose.disconnect()
}

