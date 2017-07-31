const express = require( 'express' );
const app = express();
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var morgan = require( 'morgan' );
// var User = require('./models/user');
var LocalStrategy = require('passport-local'),Strategy;
const bodyParser = require( 'body-parser' );
const ejs = require( 'ejs' );
const router = express.Router()
const fs = require( 'fs' );
const queries = require('./database/db')
const mqueries = require('./database/mentordb')
const path = require("path");
const upload = require('express-fileupload');
const sockCookie = require('socket.io-cookie-parser');
var passport = require('passport');
const flash = require('connect-flash')
/*

<------BCRYPT BEGIN------->

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB. 
});
*/

//Properties of a component
//state
// lifecycle event
// UI associated with render



// const menteeController = require('/public/../contollers/mentee_controller.js');
// set morgan to log info about our requests for development use.
app.use( morgan( 'dev' ) );

// initialize cookie-parser to allow us access to the cookies stored in the browser.
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
app.use(session( {
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
} ) );

//This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

app.use((req, res, next) => {
    
    if (req.cookies.user_sid && req.session) {
        console.log('id check')
        next();        
    } else {
    console.log('id else condition')
    next();
    }
});

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
 // use connect-flash for flash messages stored in session


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.cookies.user_sid) {
        
        res.redirect('/profile');
    } else {
        next();
    }    
};

app.get('/home', (req, res) => {
	// console.log('checking in from home! I should have title')
	res.render('home');
})
app.get('/', (req, res) => {
    console.log('checking in from home!', req.cookies)
    console.log('session check!', req.session)

    res.render('home');
})

app.post('/profile', sessionChecker, (req, res) => {
    queries.getOneuser(req.body)

    .then( user => {
    // console.log('this is the value of user: ', user)
    res.render('profile', {user});
    })
})
app.get('/profile', (req, res) => {
    // console.log('these are the req.params: ', req.params)
    // console.log('this is the session user!!: ', req.session)
    // console.log('this is the cookie!!!!!! ', req.cookies.user_id)
    var user_id = 1
    res.render('profile', {userId: user_id});
    console.log('this is the value of user: ', req.session)   
})

app.get('/edit/:id', function(req, res){
        queries.getOneuser(req.params.id)   
        .then(user => {
            // console.log('this is the session user!!: ', req.session.user)
            res.render('user_edit', {user});             
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
    res.redirect('/login', {user});
})
.catch(error => {
    console.log(error)
    res.redirect('/')
})

});
// route for user Login
app.get('/login', (req, res) => {
    // console.log('this is the session Checker', sessionChecker)
        res.render(__dirname + '/views/login.ejs');
});
app.post('/login', (req, res) => {
        console.log('sent the post')
        // console.log(mentee)
       //  console.log('username', mentee.username)
       console.log('this is req.body from login: ', req.body)
       // console.log('this is the req.body: ', req.body)
       var username = req.body.login_username;
       var password = req.body.login_password;
       queries.getOneuser(username, password)
        .then(user => {
             // console.log('this si the user: ', user)
             
                // console.log(mentee.menteename)
            if (( user.username === username && user.password === password)){
                // document.cookie = `username = ${user.username}`
                console.log("yo! You're logged-in!!!!")
                console.log('this is the user object', req.session)
                var image = user.image
                req.session.user_id = user.id;
                // if(req.files){
                //     // console.log('these is the req.files', req.files)
                // }
                // fs.writeFile('public/images/kanye-west-fan.jpg', image, 'binary', function(err){
                //     if (err) throw err
                //     console.log('File saved.')
                    res.redirect('/profile');
                // })
            } else {
                console.log('I did not login!!!')
                // req.session.mentee = user.dataValues;
                res.render('/');
            }
            
        }).catch(console.log)
    });


app.get('/react_profile', sessionChecker, (req, res) => {
    queries.getOneuser(req.params)
    .then( mentee => {

        res.render('react_profile');
        
    })
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
    queries.getOneuser(req.params.id)
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

// app.post('/socket-chat', (req, res) => {
//     console.log("hit the chat route!")
//     queries.sendMessage(req.body)
//     .then(chat_post =>{
//         console.log('gotteeemmm!', req.body)
//         res.render('profile')
//     }).catch('error')
// })

// app.post('/store_messages', (req, res) => {
//     console.log("hit the messages,!", req.body)
//     queries.sendMessage(req.body)
//     .then(chat_post =>{
//         console.log('gotteeemmm!', req.body)
//         res.render('profile')
//     }).catch('error')
// })

app.post('/signup', (req, res) =>{
    // console.log('req.body:' , req.body);
    queries.create(req.body)
     .then(mentee => {
        // console.log('this is the req.body', req.body)
        res.redirect('/profile')
     }).catch('error')
})

const port = process.env.PORT || 3001;
//  var server = app.listen( port, () => {
//         var io = require('socket.io')(server);
//         io.on('connection', function(){ /* … */ });
//         console.log( 'the server is now running on port: ' + port );
// } );
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
let users = [];
let connections = [];
io.use(sockCookie());
server.listen(port);
console.log('Welcome to Mentor, your server awaits!');

// socket.io middleware, used to get access to the users session and id.

// io.use(function(socket, next) {
//     sessionMiddleware(socket.request, socket.request.res, next);
// });

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length)
    // console.log('this is the socket!!!!: ', socket)
    // console.log('these are the connections: ', connections)
    // console.log('this is the user cookie: ', socket.handshake.headers.cookie)
    console.log('this is the message', socket.request )
    //disconnect

    // console.log('socket', socket)
    // console.log('socket user_id', connections)
    socket.on('disconnect', (data) => {
        if(!socket.username) return;
    connections.splice(connections.indexOf(socket), user_sid)
    console.log("Disconnected: %s sockets connected", connections.length)        
    });

    //Send Message
    socket.on('send message', (data) => {
        console.log('this is the request: ', socket.request);
        console.log('this is the user sockcookie: ', socket.request.cookies.user_sid)

        io.sockets.emit('new message', {msg: data});
        var messageObj = {sender: socket.request.cookies.user_sid, message: data }
        queries.sendMessage(messageObj)

    });
    // // New User
    // socket.on('new user', (data, callback) => {
    //     callback(true);
    //     queries.getOneuser(req.params)
    //     .then(data => {
    //         console.log('this is the req from the socket: ', req)
    //         // console.log('this si the data object: ', data);
    //     data = req.params.username    
    //     socket.username = data;
    //     users.push(data)
    //     updateUsernames()
    //     console.log('this is the updated user names: ', updateUsernames())
    //     console.log('this is the data: ', data)
    //     console.log('these are the users: ', users)
    //     })
    // })

});



// require('./public/config/passport.js')(app); // load our routes and pass in our app and fully configured passport
module.exports = app;
