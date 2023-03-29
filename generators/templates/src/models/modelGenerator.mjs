import { Schema, model } from 'mongoose'

const createSchema = (schema, collectionName) => {
  const newSchema = Schema(schema, { timestamps: true })

  return model(collectionName, newSchema)
}

export default createSchema