import { $ } from './utils.js'
// const rootEl = document.getElementById('root')

const socket = io('/')

$('h2').style.color = 'red'

socket.on('connect', () => {
	socket.on('message', (message) => {
		console.log(message)
	})
})