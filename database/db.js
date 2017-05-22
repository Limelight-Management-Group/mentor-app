const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();

if(process.env.NODE_ENV === 'production'){
  pgp.pg.defaults.ssl = true;
};

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mentor_app';
const db = pgp(connectionString);

const queries = {
  getAll() {
    return db.any('SELECT * FROM mentees');
  },
  create(mentee) {
    console.log('this is the mentee', mentee)
    return db.any(`
      INSERT INTO mentees(username, password, f_name, l_name, email, education, career_path, mos, image, location, branch, age, personal_interest, bio) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `, [mentee.username, mentee.password, mentee.f_name, mentee.l_name, mentee.email, mentee.education, mentee.career_path, mentee.mos, mentee.image, mentee.location, mentee.branch, mentee.age, mentee.personal_interest, mentee.bio])
    .catch(console.log)
  },
  delete(id) {
    return db.none('DELETE from mentees WHERE id = $1', [id]);
  },
  edited(id, mentee) {
    return db.any('UPDATE mentees SET mentee=$1 WHERE id = $2 RETURNING mentee', [mentee.title, mentee.id]);
  },
  getOnementee(mentee) {
    console.log(' this is the mentee from getOnementee, before the query', mentee)
    let user = db.one('SELECT * FROM mentees WHERE username = $1 AND password = $2', [mentee.login_username, mentee.login_password]);
    return user
  },
    getOnePhoto(photos) {
    console.log('photo from photos', photo)
    const result = db.one('SELECT * FROM mentees WHERE image = $1', [mentee.image]);
    console.log("this is the result: ", result)
    return result
  }
};

module.exports = queries;
