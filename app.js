const path = require('path')
const express = require('express')
const livereload = require('livereload')
const connectLivereload = require('connect-livereload')

const publicDirectory = path.join(__dirname, 'public')

const app = express()
app.set('view engine', 'pug')

// make client directory as public so: index.html => <script src='/client.js'> </script>
app.use(express.static(path.join(publicDirectory))) 	

if(process.env.NODE_ENV === 'development') {
	const livereloadServer = livereload.createServer() 				// for reload browser
	livereloadServer.watch(publicDirectory)
	livereloadServer.server.once('connection', () => {
		setTimeout(() => livereloadServer.refresh('/') , 10);
	})

	app.use(connectLivereload()) 													// for reload browser
}





app.get('/', (req, res) => {
	const payload = {
		title: 'Home Page'
	}
	res.render('index', payload)
})

module.exports = app
