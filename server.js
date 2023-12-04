const { createServer } = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const socketController = require('./controllers/socketController')


const httpServer = createServer(app)
const io = new Server(httpServer)

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Server on: http://localhost:${PORT}`))

io.on('connect', socketController(io))