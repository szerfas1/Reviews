const express = require('express');
const { Pool } = require('pg');

const db = new Pool({ database: 'trailblazers_reviews' });

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/reviews/:productId', (req, res) => {
  db.query(`SELECT * FROM reviews WHERE product_id=${req.params.productId}`)
    .then(queryResponse => {
      // db.end();
      if (queryResponse.rowCount === 0) {
        res.status(404).send('No data found for that product');
      } else {
        res.send(queryResponse.rows);
      }
    })
    .catch(() => res.status(400).send('Could not process productId'));
});

module.exports = { app, db };
