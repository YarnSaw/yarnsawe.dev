const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 443;


app.get('/', (req, res) => {
	res.send('Hello World!');
});

options = {
	key: fs.readFileSync("/etc/ssl/private/yarnsawe.dev.key"),
	cert: fs.readFileSync('/etc/ssl/private/yarnsawe.dev.crt')
}


https.createServer(options, app).listen(port, () => {
	console.log(`Listening on port ${port}`)
});

