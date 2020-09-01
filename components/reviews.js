const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'ratemyprofessor',
  password: 'password',
  port: 5432,
});

const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReviewById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getReviews,
  getReviewById,
  // createReview,
  // updateReview,
  // deleteReview,
}