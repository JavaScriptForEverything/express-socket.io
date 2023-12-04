/* Global Variables
		. io 				: comes from 	socket.io/socket.io.js 	script

*/

import { addMessageToMessageContainer, handleJoinedRoom, showIdOnHeader } from './ui.js'

const socket = io('/') 		// comes from 	socket.io/socket.io.js 	script


socket.on('connect', () => {
	// console.log(socket.id)

	socket.on('message', (message) => {
		console.log(message)
	})
})


socket.on('send-id', ({ socketId }) => {
	showIdOnHeader(socketId)
})

export const sendMessage = ({ message, roomId }) => {
	socket.emit('send-message', { message, roomId })
}
socket.on('receive-message', ({ message }) => {
	addMessageToMessageContainer(message)
})


export const joinToCustomRoom = (roomId) => {
	socket.emit('join-room', { roomId }, (rooms) => {
		console.log(rooms)
	})
}
socket.on('joined-room', ({ roomId, rooms }) => {
	console.log(rooms)
	handleJoinedRoom({ roomId, rooms })
})



// const userSocket = io('/user', { auth: { token: 'my-token'}})
const userSocket = io('/user') // => Auth error