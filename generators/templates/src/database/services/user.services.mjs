import User from '../models/User.model.mjs'

const UserClass = {
	createUser(user) {
		return User.create(user)
	},

	findOne(username, email) {
		return User.findOne({ $or: [{ username }, { email }] })
	},

	deleteUsers() {
		return User.deleteMany()
	},
}

export default UserClass
