const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
require('dotenv').config();

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body is', req.body.complete);
  const queryText = `UPDATE tasks SET complete=$1 WHERE id=$2;`;
  const queryValues = [req.body.complete, req.params.id];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log('in /api/complete/:id edit PUT');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`PUT error:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
