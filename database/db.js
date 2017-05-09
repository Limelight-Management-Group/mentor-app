const pgp = require('pg-promise')();

if(process.env.NODE_ENV === 'production'){
  pgp.pg.defaults.ssl = true;
};

const connectionString = process.env.DATABASE_URL || 'menteegres://localhost:5432/mentor_app';
const db = pgp(connectionString);


const queries = {
  getAll() {
    return db.any('SELECT * FROM mentees');
  },
  create(mentee) {
    console.log('this is the mentee', mentee)
    return db.any(`
      INSERT INTO mentees(username, f_name, l_name, email, education, career_path, mos, image, location, branch, age, bio) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `, [mentee.username, mentee.f_name, mentee.l_name, mentee.email, mentee.education, mentee.career_path, mentee.mos, mentee.image, mentee.location, mentee.branch, mentee.age, mentee.bio])
    .catch(console.log)
  },
  delete(id) {
    return db.none('DELETE from mentees WHERE id = $1', [id]);
  },
  edited(id, mentee) {
    return db.any('UPDATE mentees SET mentee=$1 WHERE id = $2 RETURNING mentee', [mentee.title, mentee.id]);
  },
  getOnementee(id) {
    return db.one('SELECT * FROM mentees WHERE id = $1', [id]);
  },
};

module.exports = queries;
