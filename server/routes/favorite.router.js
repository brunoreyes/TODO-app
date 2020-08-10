const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
require('dotenv').config();

// return all favorite images
// // This route *should* READ an idea for the logged in user
// MAKE SURE TO IMPLEMENT THIS WITH ALL ROUTES

// router.get('/', rejectUnauthenticated, (req, res) => {
//   const displayQuery = `SELECT "favorited" FROM "ideas"
// WHERE id=${req.params.id}
//  ORDER BY "id" ASC;`;
//   console.log(`req.user.id:`, req.user.id);

//   //Pool is our connection to the database
//   //we are going to query a queryString command to pool (database)
//   pool
//     .query(displayQuery)
//     .then((response) => {
//       // console.log('Sending response:', response.rows);
//       res.send(response.rows);
//     })
//     .catch((error) => {
//       console.log('Error in get:', error);
//       res.sendStatus(500);
//     });
// });

router.put('/favorite/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body is', req.body.favorited);
  const queryText = `UPDATE ideas SET favorited=$1 WHERE id=$2;`;
  const queryValues = [req.body.favorited, req.params.id];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log('in /api/favorite/favorite/:id edit PUT');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`PUT error:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
