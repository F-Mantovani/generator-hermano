import User from '../models/User.model.mjs'
import query from './mongoose.services.mjs'

const UserClass = {
	createUser(user) {
		return query.create(User, user)
	},

	findOne(username, email) {
		return query.getOne(User, { $or: [{ username }, { email }] })
	},

	deleteUsers() {
		return query.deleteMany(User)
	},

	deleteOne(username, email){
		return query.deleteOne(User, { $or: [{ username }, { email }] })
	}
}

export default UserClass
