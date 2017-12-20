const fs = require('fs');
const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();

if(process.env.NODE_ENV === 'production'){
  pgp.pg.defaults.ssl = true;
};

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mentor_app';
const db = pgp(connectionString);

const queries = {
  getAll() {
    return db.any('SELECT * FROM users');
  },
  create(user) {
    // console.log('this is the user-->', user)
    return db.any(`
      INSERT INTO users(username, password, f_name, l_name, email, education, career_path, mos, image, location, branch, age, personal_interest, bio, mentee, mentor_id) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `, [user.username, user.password, user.f_name, user.l_name, user.email, user.education, user.career_path, user.mos, user.image, user.location, user.branch, user.age, user.personal_interest, user.bio, user.mentee, user.mentor_id])
    .catch(console.log)
  },
  delete(id) {
    return db.none('DELETE from users WHERE id = $1', [id]);
  },
  edited(id, user) {
    return db.any('UPDATE users SET user=$1 WHERE id = $2 RETURNING user', [user.title, user.id]);
  },
  getOneuser(user) {
    // console.log(' this is the user from getOneuser, before the query', user)
    let result = db.one('SELECT * FROM users WHERE username = $1 AND password = $2', [user.login_username, user.login_password]);
    return result
  },
    getOnePhoto(photos) {
    console.log('photo from photos', photo)
    const result = db.one('SELECT * FROM users WHERE image = $1', [user.image]);
    console.log("this is the result: ", result)
    return result
  },
    sendMessage(message) {
    console.log('this is the message', message)
    return db.any(`
      INSERT INTO messages(title, message) 
      VALUES($1, $2)
    `, [message.title, message.message])
    .catch(console.log)
  }
  // },
  // storeImage(image){
  //     // read in image in raw format (as type Buffer):
  //     fs.readFile('image.jpg', (err, imgData) => {
  //       console.log('imageData', imgData)
  //         // inserting data into column 'img' of type 'bytea':
  //         return db.none(`INSERT INTO images(img) VALUES($1)`, [imgData])
  //             .then(() => {
  //                 // success;
  //             })
  //             .catch(error => {
  //                 // error;
  //             });
  //     });
  //     }  
  // }
}


module.exports = queries;
