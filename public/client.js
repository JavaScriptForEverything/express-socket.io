// eslint-disable-next-line no-undef
// const socket = io()

// socket.on('connect', () => {
// 	console.log('connected with server')
// })

// const productSocket = io('/products')
// productSocket.send('Hi product')

const userSocket = io('/users')
userSocket.send('Hi user')


const root = document.getElementById('root')
const ul = document.createElement('ul')
const nameInput = document.createElement('input')
const submitButton = document.createElement('button')
const resetButton = document.createElement('button')
const form = document.createElement('form')

root.appendChild(ul)
form.appendChild(nameInput)
form.appendChild(submitButton)
form.appendChild(resetButton)
root.appendChild(form)


nameInput.type='text'
nameInput.placeholder = 'list items'
nameInput.onchange = (evt) => {
	nameInput.value = evt.target.value 
}

submitButton.innerText = 'Add'
submitButton.title = 'submit'
// button.onclick = () => {
// 	userSocket.emit('userData', input.value)
// }

resetButton.innerText = 'Reset'
resetButton.title = 'Reset'
resetButton.onclick = () => {
	const el = document.querySelector('ul')
	let child = el.lastChild

	while(child) {
		el.removeChild(child)
		child = el.lastChild
	}
}

form.onsubmit = (evt) => {
	evt.preventDefault()
	userSocket.emit('userData', nameInput.value)

	nameInput.value = ''
}

userSocket.on('userData-resent', (data) => {
	const li = document.createElement('li')
	li.innerText = data

	ul.appendChild(li)
})

