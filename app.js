const express = require( 'express' );
const app = express();
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var morgan = require( 'morgan' );
// var User = require('./models/user');
const bodyParser = require( 'body-parser' );
const ejs = require( 'ejs' );
const router = express.Router()

const queries = require('./database/db')
const mqueries = require('./database/mentordb')
const path = require("path");

// var bcrypt = require('bcrypt');

//Properties of a component
//state
// lifecycle event
// UI associated with render



// const menteeController = require('/public/../contollers/mentee_controller.js');
// set morgan to log info about our requests for development use.
app.use( morgan( 'dev' ) );

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use( cookieParser() );

// direct requests to the public directory
app.use( express.static( __dirname + '/public' ) );
// set up template
app.set( 'view engine', 'ejs' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );

// initialize express-session to allow us track the logged-in user across sessions.
app.use( session( {
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
} ) );

//This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

app.use((req, res, next) => {
    console.log('this is the usid: ', req.cookies.user_sid)
    console.log('this is the session: ', req.session.user_sid)
    if (req.cookies.user_sid && req.session.user_sid) {
        console.log('id check')
        res.clearCookie('user_sid');        
    }
    console.log('id else condition')
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.cookies.user_sid) {
        console.log('in the session checker- req!!!!!: ', req)
        console.log('in the session checker- res!!!!!: ', res)
        console.log('im in the if of session')
        res.redirect('/dashboard');
    } else {
        console.log('this is the user session ', req.session.user)
        console.log("I'm in the else condition")
        next();
    }    
};

app.get('/home', (req, res) => {
	console.log('checking in from home! I should have title')
	res.render('home');
})
app.get('/', sessionChecker, (req, res) => {
    console.log('checking in from home!')
    res.render('home');
})

app.post('/profile', (req, res) => {
    console.log('this is the req.body!!!!!! ', req.body)
    queries.getOnementee(req.body)
    .then( mentee => {
    console.log('this is the value of mentee: ', mentee)
	res.render('profile', {mentee: mentee});
    })
})
// app.get('/profile', (req, res) => {
//     // console.log('this is the req.body!!!!!! ', req.body)
    
//     // console.log('this is the value of mentee: ', mentee)
//     res.render('profile');
   
// })

app.get('/edit/:id', function(req, res){
        queries.getOnementee(req.params.id)   
        .then(mentee => {

            res.render('mentee_edit', {mentee});             
            })
    })

app.route('/mentee_signup')
	.get(sessionChecker, (req, res) => {

	console.log('checking in from mentee home!')
	res.render(__dirname + '/views/mentee_signup.ejs');
})
.post((req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
.then(user => {
	req.session.user = user.dataValues;
	res.redirect('/dashboard');
})
.catch(error => {
	console.log(error)
	res.redirect('/')
})

});
// route for user Login
app.get('/login', sessionChecker, (req, res) => {
    // console.log('this is the session Checker', sessionChecker)
        res.render(__dirname + '/views/login.ejs');
    })
    .post((req, res) => {
    	console.log('checking in from login')
        var mentee = req.body
       //  console.log('username', mentee.username)

       // console.log('this is the req.body: ', req.body)
       queries.getOnementee(mentee)
       // console.log('this is the qresult:', qresult)
       
        .then(function (user){
            // console.log(' this is the req.session:', req.session)

            	// console.log(user.username)
            if ((!user === null || user.username === (req.body.username)) && (( user.password === mentee.password))){
            	console.log("yo! You're logged-in!!!!")
                // console.log('this is the session', session)
                res.redirect('/profile');

            // }
        	} else {

                console.log('I did not login!!!:')
                // req.session.user = user.dataValues;
                res.render('profile');
        	}
            
        }).catch(console.log)
    });




app.get('/react_profile', (req, res) => {
        res.render('react_profile');
});


app.get('/mentor_signup', (req, res) => {
	console.log('checking in from mentor home!')
	res.render('mentor_signup');
})
app.get('/signup', (req, res) => {
	console.log('checking in from signup!')
	res.render('mentee_signup');
})
app.get('/edit/:id', (req, res) => {
	queries.getOnementee(req.params.id)
	.then( mentee => {
		res.render('mentee_edit', {mentee})
	})
})
app.post('/delete/:id', (req, res) => {
	queries.delete(req.params.id)
	.then( edits => {
		res.render('home', {edits})
	})
})


app.post('/signup', (req, res) =>{
	console.log('req.body:' , req.body);
	queries.create(req.body)
	 .then(mentee => {
		console.log('this is the req.body', req.body)
		res.render('profile')
	 }).catch('error')
})


const port = process.env.PORT || 3000;
app.listen( port, () => {
  console.log( 'the server is now running on port: ' + port );
} );

module.exports = app;
