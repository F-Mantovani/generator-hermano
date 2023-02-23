import app from './app.mjs'

export const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on ${process.env.PORT || 8080}`)
})
