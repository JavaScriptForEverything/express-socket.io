



// => io.on('connect', socketController(io))
module.exports = (io) => (socket) => {
	userSocket(io)	

	// socket.send('hi client')
	// socket.on('message', () => {
	// 	// socket.emit('receive-message', { message }) 						// only send to self
	// 	// socket.broadcast.emit('receive-message', { message }) 	// send to all except self
	// 	// io.emit('receive-message', { message }) 									// send to all even to self too
	// })

	socket.emit('send-id', ({ socketId: socket.id }))

	socket.on('send-message', ({ message, roomId }) => {
		// Step-1: if send no roomId then broadcast to every one
		if( !roomId.trim() ) return socket.broadcast.emit('receive-message', { message }) 

		/* Step-2: 
				if send connected User Id which is private roomId === socket.id 	=> 	1-1 private chat room
				if send any value except userId [ that will create a room if not exists in Step-3: 
					one step before when user click join-button before sending message ]
					then that will create 1-M custom room or group chat.

		*/ 
		socket.to( roomId ).emit('receive-message', { message }) 
	})

	// Step-3: if send any random string that will create new room custom room which require to join
	socket.on('join-room', ({ roomId }, cb) => {
		socket.join( roomId ) 	// add users to a custom room

		const rooms = io.sockets.adapter.rooms
		const roomSize = rooms.get( roomId ).size

		cb(roomSize)


		// To CURD operation on group chat room users
		socket.broadcast.emit('joined-room', { roomId, rooms })


	})
}




// user namespace for authentication task, and the default one is un-protected one
const userSocket = (io) => {
	// Step-1: connect to namespace slice for authentication
	const userSocket = io.of('/user')

	// Step-2: verify token, is ok add to socker object, else throw error
	userSocket.use((socket, next) => {
		const token = socket.handshake.auth.token 				// client-side: io('/user', { auth: { token: 'mytoken' }})
		if( !token ) return next( new Error('authentication failed: invalid token ') )

		socket.user = getUsername( token ) 								// defined bellow
		next()
	})

	// Step-3: on success: socket has user property, [ comes from Step-2 ]
	userSocket.on('connect', (socket) => {
		console.log('connected to user namespace: ', socket.user)
	})

	// Step-4: on error: if next('error') 	
	// but it not firing
	userSocket.on('connect_error', (error) => {
		console.log(`auth error handler`, error.message)
	})

}

const getUsername = (token) => {
	// authenticate user by token then 
	// get user by token._id from database
	return token
}