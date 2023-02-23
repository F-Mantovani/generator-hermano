import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'

export async function dbConnect() {
  const dbConnect = await mongoose.connect(MONGO_URI)
  console.log(`Database connected to ${dbConnect.connections[0].name}`)
}

export async function disconnect() {
  console.log('Database is disconnecting ....')
  await mongoose.disconnect()
}

