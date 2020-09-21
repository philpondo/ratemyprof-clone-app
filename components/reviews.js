const { response, request } = require("express");
// var mysql = require('mysql');
const { pool } = require("../config");

const getReviews = (request, response) => {
  pool.query("SELECT * FROM reviews ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReviewById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM reviews WHERE reviews.id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );

  // const reviewPromise = pool.query(
  //   "SELECT * FROM reviews WHERE reviews.id = $1",
  //   [id]
  // );

  // const professorPromise = pool.query(
  //   "SELECT * FROM professors WHERE professors.id = reviews.professors_id",
  //   []
  // );

  // Promise.all([reviewPromise])
  //   .then((values) => {
  //     const reviews = values[0].rows[0];
  //     const professor = values[1].rows;
  //     response.json({ reviews, professor });
  //   })
  //   .catch((error) => {
  //     response.status(500).json(error);
  //   });
};

const createReview = (request, response) => {
  const { professor_id, rating, text } = request.body;

  pool.query(
    "INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3)",
    [professor_id, rating, text],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added with ID: #{result.insertID}`);
    }
  );
};

const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professor_id, rating, text } = request.body;

  pool.query(
    "UPDATE reviews SET professor_id = $1, rating = $2, text = $3 WHERE id = $4",
    [professor_id, rating, text, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID ${id}`);
    }
  );
};

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
