const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

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
app.use(express.static(`${__dirname}./../client/dist`));
app.use(bodyParser.json());

app.get('/product/:productId', (req, res) => {
  if (req.params.productId === 'random') {
    res.redirect(`/product/${Math.floor(Math.random() * 100) + 1}`);
  } else {
    const options = { headers: { 'Content-Type': 'text/html' } };
    const file = path.join(`${__dirname}./../client/public/index.html`);
    res.sendFile(file, options);
  }
});

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

app.put('/reviews/:productId', (req, res) => {
  const { reviewId, updatedCol, newValue } = req.body;
  db.query(
    `UPDATE reviews
     SET ${updatedCol} = ${newValue}
     WHERE id = ${reviewId}`,
  ).then(() => {
    res.send('Update saved');
  });
});

module.exports = { app, db };
