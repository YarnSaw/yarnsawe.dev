const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { Server } = require('socket.io');

const app = express();
const redirectHTTP = express();
const port = 443;
const redirectPort = 80;
const options = {
	key: fs.readFileSync("/etc/ssl/private/yarnsawe.dev.key"),
	cert: fs.readFileSync('/etc/ssl/private/yarnsawe.dev.crt')
}


redirectHTTP.get(/./, (req, res) => {
	console.log("Had to redirect a user");
	res.redirect('https://yarnsawe.dev', 301);
});
redirectHTTP.listen(redirectPort);


/** @TODO: use better logic than a case by case basis for sending back files*/

app.get('/buddhabrot', (req, res) => {
	res.sendFile('/var/yarnsawe.dev/buddhabrot.html');
});

app.get('/buddhabrot/styles.css', (req, res) => {
	res.sendFile('/var/yarnsawe.dev/buddhabrot/styles.css');
});

app.get('/buddhabrot/dist/index.min.js', (req, res) => {
	res.sendFile('/var/yarnsawe.dev/buddhabrot/dist/index.min.js');
});

app.get('/DnD', (req, res) => {
	res.sendFile('/var/yarnsawe.dev/dnd.html')
})

app.get(/DnD\/./, (req, res) => {
	res.sendFile(path.join('/var/yarnsawe.dev', req.url))
})

app.get('/', (req, res) => {
	console.log("User connected");
	res.send('Hello World!');
});

const server = https.createServer(options, app);

// DnD and chatbot stuff
const io = new Server(server);
const ConnectionManager  = require('/var/yarnsawe.dev/DnDBackend/connection-manager').ConnectionManager;
const manager = new ConnectionManager(io, '/DnD');

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
