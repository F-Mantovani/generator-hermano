import request from 'supertest'
import app from '../../app.mjs'

export const requestRoute = async (variable, route) => {
	const res = await request(app).post(route).send(variable)
	return res
}

export const requestWithHeaders = async (route, header) => {
	const res = await request(app).get(route).set(header).send()
	return res
}
