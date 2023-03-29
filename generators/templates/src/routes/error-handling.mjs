export default function errorHandler(app) {
	app.use((error, req, res, _) => {
		console.log(`ERROR: ${error.message} in ${req.method} ${req.path}`)
		res.status(error.status || 500).json({ message: error.message, place: error.place })
	})
}
