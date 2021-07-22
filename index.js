const express = require('express');
const fs = require('fs');
const https = require('https');
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


app.get('/', (req, res) => {
	console.log("User connected");
	res.send('Hello World!');
});

https.createServer(options, app).listen(port, () => {
	console.log(`Listening on port ${port}`);
});

