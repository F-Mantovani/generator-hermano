import bcrypt from 'bcrypt'

const saltRounds = 12

function createPasswordHash(password) {
  try {
    return bcrypt.hash(password, saltRounds)

  } catch (error) {
    throw error
  }
}


function verifyPassword(password, hash) {
  try {
    return bcrypt.compare(password, hash) 
  } catch (error) {
    throw error
  }
}

export default { createPasswordHash, verifyPassword }