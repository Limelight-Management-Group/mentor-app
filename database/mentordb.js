const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();

if(process.env.NODE_ENV === 'production'){
  pgp.pg.defaults.ssl = true;
};

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mentor_app';
const db = pgp(connectionString);


const mqueries = {
  getAll() {
    return db.any('SELECT * FROM mentors');
  },
  create(mentor) {
    console.log('this is the mentor', mentor)
    return db.any(`
      INSERT INTO mentors(username, password, f_name, l_name, email, education, career_path, mos, image, location, branch, age, bio) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `, [mentor.username, mentor.password, mentor.f_name, mentor.l_name, mentor.email, mentor.education, mentor.career_path, mentor.mos, mentor.image, mentor.location, mentor.branch, mentor.age, mentor.bio])
    .catch(console.log)
  },
  delete(id) {
    return db.none('DELETE from mentors WHERE id = $1', [id]);
  },
  edited(id, mentor) {
    return db.any('UPDATE mentors SET mentor=$1 WHERE id = $2 RETURNING mentor', [mentor.title, mentor.id]);
  },
  getOnementor(mentor) {
    console.log('mentor from getOnementor', mentor)
    const result = db.one('SELECT * FROM mentors WHERE username = $1', [mentor.username]);
    console.log("this is the result: ", result)
    return result
  },
    getOnePhoto(photos) {
    console.log('photo from photos', photo)
    const result = db.one('SELECT * FROM mentors WHERE image = $1', [mentor.image]);
    console.log("this is the result: ", result)
    return result
  }
};

module.exports = mqueries;