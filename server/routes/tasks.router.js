const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
require('dotenv').config();

// // This route *should* READ an task for the logged in user
// MAKE SURE TO IMPLEMENT THIS WITH ALL ROUTES
router.get('/', rejectUnauthenticated, (req, res) => {
  const displayQuery = `SELECT "tasks".*, "category"."name" AS "category" FROM "tasks"
JOIN "category" on "tasks"."category_id" = "category"."id"
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
// This route *should* CREATE a task for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);
  // console.log('req.user', req.user);

  const queryValues = [
    req.body.name,
    req.body.description,
    req.body.link,
    req.body.image_url,
    req.body.priority,
    req.body.duration,
    req.body.complete,
    req.body.repeat,
    req.body.due_date,
    req.body.streak_count,
    req.body.category_id,
    req.body.date,
    req.user.id,
  ];
  // ^^^ Here notice we used req.user.id, because of line 17: `WHERE user_id=${req.user.id};`;

  // Pool Query to insert an entry into the table
  pool
    .query(
      `INSERT INTO "tasks" ("name","description",  "link", "image_url", "priority", "duration", "complete", "repeat", "due_date",
       "streak_count",
       "date", "user_id")
              VALUES ( $1, $2, $3, $4, $5 , $6, $7, $8,$9, $10 , $11, $12, $13 );`,
      queryValues
    )
    .then((results) => res.sendStatus(201))
    .catch((err) => {
      console.log('Error adding new task:', err);
      res.sendStatus(500);
    });
});

//WORK ON THIS
// This route *should* DELETE an task for the logged in user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryValues = [req.user.id, req.params.id];
  pool
    .query(
      `DELETE FROM "tasks" WHERE $1 = tasks.user_id AND tasks.id = $2`,
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
// This route *should* UPDATE an task for the logged in user

// ALWAYS CHECK IN SQL PROGRAM if the query is correctly formatted

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body is', req.body);
  const queryText = `UPDATE tasks SET name=$1, description=$2, link=$3, image_url=$4,priority=$5,duration=$6,complete=$7, repeat=$8, due_date=$9, streak_count=$10, category_id=$11, date=$12 WHERE id=$13;`;
  const queryValues = [
    req.body.name,
    req.body.description,
    req.body.link,
    req.body.image_url,
    req.body.priority,
    req.body.duration,
    req.body.complete,
    req.body.repeat,
    req.body.due_date,
    req.body.streak_count,
    req.body.category_id,
    req.body.date,
    req.user.id,
  ];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log('in /api/tasks/edit PUT');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`PUT error:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
