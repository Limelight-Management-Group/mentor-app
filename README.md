# Mentor App
***
## Welcome to the Mentor App.
### We're creating a mentorship platform for veterans.  
#### Built for veterans by veterans.
#### We would like to help veterans to find and connect to those with tools to help them build a path to their next career path.
---
# Motivation
### This project is a cool way for the Mentor team to help our fellow veterans, while we do what we enjoy doing. There are other really great mentorship application available, but we would like to help to create even more opportunities, because why not? Veterans give a lot. This is our attempt to pay it forward. Do you want to help out? Keep reading!
---
# Link to Gist
   [link to gist](https://gist.github.com/Limelight-Management-Group/1fb9e4500060bca8093c84568777ea5b)
   [link to sprint 2 gist](https://gist.github.com/Limelight-Management-Group/429ceee47dbd5f5645e869d3d2250c7e)
---
# Teachnology Used
## Built with:
+ NodeJs
+ ExpressJS
+ PostgreSQL
+ BootStrap
+ ReactJS
---
# Installation Instructions
### To run this app successfully, you must have PostgreSQL installed. You can run the brew installation command:
    $ brew install postgresql
### If this is your first time installing Postgres with Homebrew, you'll need to create a database with the following command in your terminal/ commandline:
    $ initdb /usr/local/var/postgres -E utf8
    
### If you have never set up and run a server with PostgreSQL, you may get this error:
    psql: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
### Don't panic. Run this line, and you should not have any issues, going forward:
    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
### If you're in your project directory, you can run postgres and create the project database:
    $ psql
### You will then see your username set equal to the poundsign. It should look like the following:
    waynebanks=#
### You, then need to run the following to create your 'waynes_world' database:
    CREATE DATABASE dbname;
### At this point, you should have already done a pull from the master branch and done an NPM install with the following:
    $ git pull
### then...
    $ npm install
### You then can create the webpack with the following command:
    $ npm run create
### You can now use the command to start-react:
    $ npm run start-react
### You can now run your server with:
#### If you have nodemon installed you can:
    $ nodemon app 
#### If you do not, you can install or just use our start script:
    $ npm run start-dev
### If this worked correctly, you should see:
    > mentor-app@1.0.0 start-dev /Users/waynebanks/Desktop/dev/mentor-app
    > nodemon app
    [nodemon] 1.11.0
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app app.js`
    the server is now running on port: 3000
***
# Good luck, and thank you for join us with Mentor!
