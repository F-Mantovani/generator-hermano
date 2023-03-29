import User from '../src/services/user.services.mjs'
import { dbConnect, disconnect } from '../src/configs/dbConnect.mjs'
import passwordHandler from '../src/utils/passwordHandlers.mjs'
import { expectAbstraction } from './utils/expectAbs.mjs'
import { requestRoute, requestWithHeaders } from './utils/reqAbs.mjs'

describe('test the API', () => {
	let database, saveToken
	let fakeToken = '32109831nmcoweno190234fake'
	beforeAll(async () => {
		database = await dbConnect()

		const hash = await passwordHandler.createPasswordHash('Aa123456!')

		const user = {
			username: 'admin',
			email: 'admin@admin.com',
			password: hash,
			usernameToDisplay: 'admin',
		}

		await User.createUser(user)
	})

	afterAll(async () => {
		await User.deleteOne('admin', null)
		database.connections[0].db.dropDatabase()
	})

	describe('POST/login', () => {
		it('should authenticate the user, using username, and sign in', async () => {
			const user = {
				username: 'admin',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/login')

			let token = res.body.token

			saveToken = token

			expectAbstraction(res, 200, { token })
		})

		it('should authenticate the user, using email, and sign in', async () => {
			const user = {
				email: 'admin@admin.com',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/login')

			let token = res.body.token

			expectAbstraction(res, 200, { token })
		})

		it("shouldn't sign in, password cannot be empty", async () => {
			const user = {
				username: 'admin',
				password: '',
			}

			const res = await requestRoute(user, '/api/auth/login')

			const expectRes = {
				message: 'All fields are required to login',
				place: 'login',
			}

			expectAbstraction(res, 400, expectRes)
		})

		it("shouldn't sign in, username/email cannot be empty", async () => {
			const user = {
				username: '',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/login')

			const expectRes = {
				message: 'All fields are required to login',
				place: 'login',
			}

			expectAbstraction(res, 400, expectRes)
		})
	})

	describe('POST/signUp', () => {
		it('should create a new user', async () => {
			const user = {
				username: 'John Doe',
				email: 'john@gmail.com',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				username: 'john doe',
				email: 'john@gmail.com',
				usernameToDisplay: 'John Doe',
			}

			expectAbstraction(res, 200, expectedRes)
		})

		it("shouldn't create a new user, must contain username", async () => {
			const user = {
				username: '',
				email: 'john@gmail.com',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message: 'You need to fill all the fields to create an account',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it("shouldn't create a new user, must contain email", async () => {
			const user = {
				username: 'John Doe',
				email: '',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message: 'You need to fill all the fields to create an account',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it("shouldn't create a new user, must contain password", async () => {
			const user = {
				username: 'John Doe',
				email: 'john@gmail.com',
				password: '',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message: 'You need to fill all the fields to create an account',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it("shouldn't create a new user, must contain a valid email", async () => {
			const user = {
				username: 'John Doe',
				email: 'john@gmail',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message: 'Please fill a valid email',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it("shouldn't create a new user, must contain a valid password", async () => {
			const user = {
				username: 'John Doe',
				email: 'john@gmail.com',
				password: 'Aa12',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message:
					'Password must have at least 9 characters and contain one number, one special character, one uppercase and one lowercase letter',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it("shouldn't create the user, already existing user", async () => {
			const user = {
				username: 'John Doe',
				email: 'john@gmail.com',
				password: 'Aa123456!',
			}

			const res = await requestRoute(user, '/api/auth/signup')

			const expectedRes = {
				message: 'User already exists',
				place: 'signup',
			}

			expectAbstraction(res, 400, expectedRes)
		})
	})

	describe('GET/verify', () => {
		it('should verify the token and validate it', async () => {
			const header = {
				Authorization: `Bearer ${saveToken}`,
			}
			const res = await requestWithHeaders('/api/auth/verify', header)

			const expectedRes = {
				// we ignore here the iat and exp as they will vary every single time
				email: 'admin@admin.com',
				username: 'admin',
			}

			expectAbstraction(res, 200, expectedRes)
		})

		it('should verify the token and not validate it', async () => {
			const header = {
				Authorization: `Bearer ${fakeToken}`,
			}
			const res = await requestWithHeaders('/api/auth/verify', header)

			const expectedRes = {
				message: 'jwt malformed',
				place: 'JWT middleware',
			}

			expectAbstraction(res, 500, expectedRes)
		})

		it('should verify the token,must contain the token', async () => {
			const header = {
				Authorization: `Bearer`,
			}
			const res = await requestWithHeaders('/api/auth/verify', header)

			const expectedRes = {
				message: 'Missing token',
				place: 'JWT middleware',
			}

			expectAbstraction(res, 400, expectedRes)
		})

		it('should verify the token, must contain the authorization headers', async () => {
			const header = {}
			const res = await requestWithHeaders('/api/auth/verify', header)

			const expectedRes = {
				message: 'Missing the authorization header',
				place: 'JWT middleware',
			}

			expectAbstraction(res, 400, expectedRes)
		})
	})

	describe('USE/not-found', () => {
    it("should give us the not found page message", async () => {
      const res = await requestRoute(null, '/some/path')

      const expectRes = {
        message: 'route not found'
      }

      expectAbstraction(res, 404, expectRes)
    })
  })
})
 