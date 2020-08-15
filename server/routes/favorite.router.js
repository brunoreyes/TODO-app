const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const router = express.Router();
require('dotenv').config();

router.put('/favorite/ideas/:id', rejectUnauthenticated, (req, res) => {
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

router.put('/favorite/memories/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.body is', req.body.favorited);
  const queryText = `UPDATE memories SET favorited=$1 WHERE id=$2;`;
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
