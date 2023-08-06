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



io.on('connection', (socket) => {

	socket.join('kitchen-room')
	const roomSize = io.sockets.adapter.rooms.get('kitchen-room').size
	io.sockets.in('kitchen-room').emit('boiling', `${roomSize}: boiling eges`)
	io.sockets.in('kitchen-room').emit('cooking', `${roomSize}: cooking brief`)

	socket.join('bed-room')
	io.sockets.in('bed-room').emit('sleep', 'Now I am sleeping')
	io.sockets.in('bed-room').emit('rest', 'Now I taking rest')

})




// const products = io.of('/products')
// products.on('connect', (socket) => {

// 	socket.on('message', (data) => {
// 		console.log(data)
// 	})

// })

// const users = io.of('/users')
// users.on('connect', (socket) => {

// 	socket.on('userData', (data) => {
// 		console.log(data)
// 		socket.emit('userData-resent', data)
// 	})

// })










// Send /public/index.js file to front-end: => http://localhost:3000/index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(clientRoot, 'index.html'))
})

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))