import jwt from 'jsonwebtoken'
import throwError from './throwError.mjs'

export function generateToken(payload) {
	try {
		return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1 day'})
	} catch (error) {
		throw error
	}
}

export function verifyToken(req, res, next) {
	try {
		const bearer = req.get('Authorization')
		throwError(!bearer, 'Missing the authorization header', 'JWT middleware', 400)

		const token = bearer.split(' ')[1]
		throwError(!token, 'Missing token', 'JWT middleware', 400)

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

    req.payload = { ...decodedToken }

    next()
	} catch (error) {
		error.place = 'JWT middleware'
		next(error)
	}
}
