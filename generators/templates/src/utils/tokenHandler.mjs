import jwt from 'jsonwebtoken'

export function generate(payload) {
	try {
		return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1 day'})
	} catch (error) {
		throw error
	}
}

export function verify(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}

export default { generate, verify }
