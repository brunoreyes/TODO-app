const express = require('express');
const pool = require('../modules/pool');
// const { default: Axios } = require('axios');
// const { query } = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
require('dotenv').config();

// // This route *should* READ a memory for the logged in user
// MAKE SURE TO IMPLEMENT THIS WITH ALL ROUTES
router.get('/', rejectUnauthenticated, (req, res) => {
  const displayQuery = `SELECT * FROM "memories"
WHERE user_id=$1
 ORDER BY "date" DESC;`;
  const queryValues = [req.user.id];
  console.log(`req.user.id:`, req.user.id);

  //Pool is our connection to the database
  //we are going to query a queryString command to pool (database)
  pool
    .query(displayQuery, queryValues)
    .then((response) => {
      // console.log('Sending response:', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error in get:', error);
      res.sendStatus(500);
    });
});

// WORK ON THIS
// This route *should* CREATE a memory for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);
  // console.log('req.user', req.user);

  const queryValues = [
    req.body.name,
    req.body.description,
    req.body.date,
    req.body.favorited,
    req.user.id,
  ];
  // ^^^ Here notice we used req.user.id, because of line 17: `WHERE user_id=${req.user.id};`;

  // Pool Query to insert an entry into the table
  pool
    .query(
      `INSERT INTO "memories" ("name","description", "date","favorited", "user_id")
              VALUES ( $1, $2, $3, $4, $5 );`,
      queryValues
    )
    .then((results) => res.sendStatus(201))
    .catch((err) => {
      console.log('Error adding new memory:', err);
      res.sendStatus(500);
    });
});

//WORK ON THIS
// This route *should* DELETE a memory for the logged in user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryValues = [req.user.id, req.params.id];
  pool
    .query(
      `DELETE FROM "memories" WHERE $1 = memories.user_id AND memories.id = $2`,
      queryValues
    )
    .then((results) => res.sendStatus(200))
    .catch((err) => {
      console.log('error deleting item: ', err);
      console.log('req.user.id and req.params.id', req.user.id, req.params.id);

      res.sendStatus(500);
    });
});

//WORK ON THIS
// This route *should* UPDATE a memory for the logged in user

// ALWAYS CHECK IN SQL PROGRAM if the query is correctly formatted

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body is', req.body);
  const queryText = `UPDATE memories SET name=$1, description=$2, favorited=$3, date=$4 WHERE id=$5;`;
  const queryValues = [
    req.body.name,
    req.body.description,
    req.body.favorited,
    req.body.date,
    req.params.id,
  ];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log('in /api/memories/edit PUT');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`PUT error:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
