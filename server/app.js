const express = require('express');
const { Pool } = require('pg');

const db = new Pool({ database: 'trailblazers_reviews' });

const app = express();

// Helpers
const send404 = function(req, res) {
  res.send('No data found', 404);
};

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/reviews/:productId', (req, res) => {
  db.query(`SELECT * FROM reviews WHERE product_id=${req.params.productId}`)
    .then(queryResponse => {
      db.end();
      if (queryResponse.rowCount === 0) {
        send404(req, res);
      }
      res.send(queryResponse.rows);
    })
    .catch(() => send404(req, res));
});

module.exports = app;
