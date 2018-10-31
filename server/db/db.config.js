const { Pool } = require('pg');
const faker = require('faker');

const db = new Pool({ database: 'trailblazers_reviews' });

const createQueryStr = `
  CREATE TABLE reviews (
    id serial, product_id int, rating int,
    reviewer varchar(255), title varchar(255), body text,
    recommend boolean, helpful int, unhelpful int,
    PRIMARY KEY (id)
  );`;
const insertQueryText = `
  INSERT INTO reviews (
    product_id, rating, reviewer, title, body, recommend, helpful, unhelpful
  ) VALUES (
       $1,       $2,      $3,      $4,   $5,    $6,        $7,       $8
  )`;

const insertPlaceholderData = (client, res) => {
  for (let i = 1; i < 100; i++) {
    if (Math.random() < 0.9 && i < 100) {
      i--;
    }
    const insertQueryValues = [
      i,
      faker.random.number({ max: 5, min: 1 }),
      faker.internet.userName(),
      faker.lorem.sentence(),
      faker.lorem.paragraph(5),
      faker.random.boolean(),
      faker.random.number(47),
      faker.random.number(22),
    ];

    client.query(insertQueryText, insertQueryValues, () => {
      if (i === 99) {
        client.query('COMMIT', () => {
          client.end();
          res(true);
        });
      }
    });
  }
};

const initReviewsTable = () => {
  const setupTablePromise = new Promise(res => {
    db.connect((connectionErr, client) => {
      client.query('BEGIN').then(() => {
        client
          .query('DROP TABLE reviews')
          .then(() => client.query(createQueryStr))
          .then(() => insertPlaceholderData(client, res));
      });
    });
  });

  return setupTablePromise;
};

initReviewsTable();

module.exports = initReviewsTable;
