var PORT = 8080;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());
app.use(bodyParser());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:8080/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/sendemail',function(req,res){
    var transporter = nodemailer.createTransport();
	
	console.log(req.body.email);
	console.log(req.body.name);
	console.log(req.body.message);

	transporter.sendMail({
	    from: req.body.email,
	    to: 'jik.jack@gmail.com',
	    subject: 'Hello from ' + req.body.name,
	    text: req.body.message
	});

    res.redirect("/");
});