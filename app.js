const path = require('path')
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const clientRoot = path.join(__dirname, 'public')
const PORT = process.env.PORT || 3000

const app = express()

// make client directory as public so: index.html => <script src='/client.js'> </script>
app.use(express.static(path.join(clientRoot))) 	

const httpServer = createServer(app)
const io = new Server(httpServer)







// const products = io.of('/products')
// products.on('connect', (socket) => {

// 	socket.on('message', (data) => {
// 		console.log(data)
// 	})

// })

const users = io.of('/users')
users.on('connect', (socket) => {

	socket.on('userData', (data) => {
		console.log(data)
		socket.emit('userData-resent', data)
	})

})










// Send /public/index.js file to front-end: => http://localhost:3000/index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(clientRoot, 'index.html'))
})

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))