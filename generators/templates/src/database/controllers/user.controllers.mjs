import User from '../services/user.services.mjs'
import throwError from './utils/throwError.mjs'
import passwordHandler from './utils/passwordHandlers.mjs'
import inputChecker from './utils/inputChecker.mjs'
import { generateToken, verifyToken } from './utils/tokenHandler.mjs'

const userController = {
	async signup(req, res, next) {
		const { username, password, email } = req.body

		try {
			if (!username || !password || !email) {
				throwError(true, 'You need to fill all the fields to create an account', 'signup', 400)
			}

			const emailRegex = inputChecker.email(email)
			throwError(!emailRegex, 'Please fill a valid email', 'signup', 400)

			const passwordRegex = inputChecker.password(password)
			throwError(
				!passwordRegex,
				'Password must have at least 9 characters and contain one number, one special character, one uppercase and one lowercase letter',
				'signup',
				400
			)

			const userFromDB = await User.findOne(username, email)

			throwError(userFromDB, 'user already exists', 'signup', 400)

			const passwordHashed = await passwordHandler.createPasswordHash(password)

			const createUser = {
				username,
				email,
				password: passwordHashed,
				usernameToDisplay: username,
			}

			const newUser = await User.createUser(createUser)

			res.status(200).json(newUser)
		} catch (error) {
			next(error)
		}
	},

	async login(req, res, next) {
		const login = req.body.username || req.body.email
		const { password } = req.body
		const loginType = login.includes('@')

		try {
			let userFromDB
			if (loginType) {
				userFromDB = await User.findOne(null, login)
			} else {
				userFromDB = await User.findOne(login, null)
			}
			throwError(!userFromDB, `User not found or incorrect password`, `login`, 400)

			const passwordChecked = await passwordHandler.verifyPassword(password, userFromDB.password)
			throwError(!passwordChecked, `User not found or incorrect password`, `login`, 400)


			const loggedUser = {
				username: userFromDB.usernameToDisplay,
				email: userFromDB.email
			}
			
			const token = generateToken(loggedUser)

			res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	},

	async verify(req, res, next) {
		try {
			if (req.payload) return res.status(200).json(req.payload)
		} catch (error) {
			next(error)
		}
	}
}

export default userController
