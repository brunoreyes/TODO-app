const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/', (req, res) => {});

/**
 * POST route template
 */
// router.post('/', (req, res) => {
//   console.log('req.body:', req.body);
//   console.log('req.body.imageUrl:', req.body.imageUrl);
//   const imageUrl = req.body.imageUrl;
//   const queryString = 'INSERT INTO "ideas" ("image_url") VALUES ($1) WHERE ';

//   pool.query(queryString, [imageUrl]);
//   res.sendStatus(200);
// });

module.exports = router;
