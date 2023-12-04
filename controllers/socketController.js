module.exports = (io) => (socket) => {
	// console.log(io, socket)
	socket.send('hi client')
}
