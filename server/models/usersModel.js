const db = require('../config/connection');

module.exports =  {

  findAll() {
    return db.many(`
      SELECT *
        FROM users;
    `);
  },

  findByID(id) {
    return db.one(`
      SELECT *
        FROM users
       WHERE id = $1;
    `, id);
  },

  findByUsername(username) {
    // console.log('hit usersModel findByUsername()')
    return db.one(`
          SELECT *
            FROM users
           WHERE username = $1
    `, username);
  },

  createUser(user) {
    // console.log('usersModel says: save(user) = ', user);
    return db.one(`
      INSERT INTO users (
                  fName,
                  lName,
                  username,
                  email,
                  password,
                  avatar_url
                  )
           VALUES (
                  $/fName/,
                  $/lName/,
                  $/username/,
                  $/email/,
                  $/password/,
                  $/avatar_url/
                  )
        RETURNING *;
    `, user);
  // console.log('userDB save(user) says: server-dive sucessful!');
  },

  updateUser(user, id) {
    // console.log(`reached models, args = user: ${user.name} id: ${id}`);
    return db.one(`
         UPDATE users
            SET fName      = $/fName/,
                lName      = $/lName/
                username   = $/username/,
                email      = $/email/,
                password   = $/password/,
                avatar_url = $/avatar_url/
          WHERE id = ${id}
      RETURNING *;
    `, user, id);
  },

  deleteUserByID(id) {
    return db.none(`
      DELETE FROM users
            WHERE id = $1;
    `, id)
  },

  deleteUserByUsername(username) {
    return db.none(`
      DELETE FROM users
            WHERE username = $1;
    `, username)
  },

};
