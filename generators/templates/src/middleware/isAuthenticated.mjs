import tokenHandler from "../utils/tokenHandler.mjs"
import throwError from "../utils/throwError.mjs"

export function verifyToken(req, _, next) {
	try {
		const bearer = req.get('Authorization')
		throwError(!bearer, 'Missing the authorization header', 'JWT middleware', 400)

		const token = bearer.split(' ')[1]
		throwError(!token, 'Missing token', 'JWT middleware', 400)

    const decodedToken = tokenHandler.verify(token)

    req.payload = { ...decodedToken }

    next()
	} catch (error) {
		error.place = 'JWT middleware'
		next(error)
	}
}