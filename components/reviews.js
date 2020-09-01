const { response, request } = require('express');

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

const createReview = (request, response) => {
  const { professor_id, rating, text } = request.body;

  pool.query('INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3)', [professor_id, rating, text], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: #{result.insertID}`);
  });
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  // updateReview,
  // deleteReview,
};