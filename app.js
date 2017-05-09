const express = require('express');
const app =express();

const bodyParser = require('body-parser');
const ejs = require('ejs');

const queries = require('./database/db')


app.use(express.static(__dirname + '/public'));
// set up template
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/home', (req, res) => {
	console.log('checking in from home!')
	res.render('home');
})
app.get('/signup', (req, res) => {
	console.log('checking in from signup!')
	res.render('mentee_signup');
})

app.post('/signup', (req, res) =>{
	console.log('req.body:' , req.body);
	queries.create(req.body)
	// .then(mentee => {
		console.log('this is the req.body', req.body)
		res.redirect('home')
	// })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('the server is now running on port: ' + port);
});

module.exports = app;