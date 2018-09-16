const db = require('../config/connection');

module.exports =  {

  findAll() {
    return db.many(`
      SELECT *
        FROM entries;
    `);
  },

  findByID(id) {
    return db.one(`
      SELECT *
        FROM entries
       WHERE id = $1;
    `, id);
  },

  findEntriesByUserID(id) {
    // console.log('entriesModel triggered!', id)
    return db.many(`
      SELECT *
        FROM entries
       WHERE entries.user_id = $1;
    `, id);
  },

  findEntriesByUsername(username) {
    // console.log('entriesModel triggered!', username)
    return db.many(`
         SELECT *
           FROM entries
           JOIN users ON entries.user_id = users.id
          WHERE users.username = $1
      RETURNING entries.*;
    `, username);
  },

  createEntry(entry) {
    // console.log('entriesModel says: save(entry) = ', entry);
    return db.one(`
      INSERT INTO entries (
                  date_created,
                  location,
                  title,
                  content,
                  user_id
                  )
           VALUES (
                  $/date_created/,
                  $/location/,
                  $/title/,
                  $/content/,
                  $/user_id/
                  )
        RETURNING *;
    `, entry);
  // console.log('entriesDB save(entry) says: server-dive sucessful!');
  },

  updateEntry(entry, id) {
    // console.log(`reached models, args = entry: ${entry.title} id: ${id}`);
    entry.id = id
    return db.one(`
         UPDATE entries
            SET date_created = $/date_created/,
                location     = $/location/,
                title        = $/title/,
                content      = $/content/
          WHERE id = $/id/
      RETURNING *;
    `, entry);
  },

  deleteEntryByID(id) {
    return db.none(`
      DELETE FROM entries
            WHERE id = $1;
    `, id)
  },

};
