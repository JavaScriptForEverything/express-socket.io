import { joinToCustomRoom, sendMessage } from './socket.js'
import { $ } from './utils.js'

/* Global Variables
		. title 		: comes from backend page route
		. io 				: comes from 	socket.io/socket.io.js 	script

*/

const header = $('#header')
const idSpan = $('#id-span')
const messageContainer = $('#message-container')
const messageInput = $('#message-input')
const roomIdInput = $('#room-id-input')
const sendButton = $('#send-button')
const joinButton = $('#join-button')

let roomId = ''

messageInput.value = ''
roomIdInput.value = ''

// => socket.js
export const showIdOnHeader = (socketId) => {
	idSpan.textContent = socketId
	// console.log({ socketId })
}

//----------------[ Footer section ]-----------------------
// Message Section

/* addMessageToMessageContainer used in 2 place:
		1. in ui.js 			: to show message immediately on slef 
		2. in socket.js 	: to send message to server. Now server can desice to which it will be send

			a. Server can response back to only that user who send the message to server by socket.emit()
				 and user listen that event, will get 2 messages, one by self (step-1)
				 and another on from server response

			b. Server can response back to every user who connected via WebSocket by io.emit()
				 in this senerio again user who send message will get output to DOM,
				 one from self (it always be true) and
				 another from server-response 	(only if server use io.emit() )

			c. Server can response back to every user except who send the message by socket.broadcast.emit()
				 this is re-realworld senerio, where sent user will receive only one message
				 by him attached to DOM,
				 and other users get response from server of that broadcast */ 
export const addMessageToMessageContainer = (message) => {
	const htmlString = `
		<p> ${message} </p>
	`
	messageContainer.insertAdjacentHTML('beforeend', htmlString)
}
const sendButtonHandler = () => {
	const message = messageInput.value.trim()
	if( !message ) return

	addMessageToMessageContainer(message)
	sendMessage({ message, roomId })
	messageInput.value = ''
}
sendButton.addEventListener('click', sendButtonHandler) 		// click handler
messageInput.addEventListener('keypress', (evt) => { 				// Enter key handler
	console.log(evt.key,'Enter', evt.key === 'Enter')
	if( evt.key === 'Enter') sendButtonHandler()
})


// Room Section
const joinButtonHandler = () => {
	roomId = roomIdInput.value.trim()

	if( !roomId ) return
	joinToCustomRoom(roomId) 	// send custom text instead of userId, because userId === socket.id create 1-1 chat
}
joinButton.addEventListener('click', joinButtonHandler)

export const handleJoinedRoom = ({ roomId, rooms }) => {
	console.log(rooms)

	// rooms.forEach( (room) => {

	// 	console.log({ room })

	// 	const htmlString = `
	// 		<p>${room}</p>
	// 	`
	// 	header.insertAdjacentHTML('beforeend', htmlString)		
	// })	
}
