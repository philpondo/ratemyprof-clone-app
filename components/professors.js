const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "ratemyprofessor",
  password: "password",
  port: 5432,
  multipleStatements: true,
});

const getProfessors = (request, response) => {
  pool.query("SELECT * FROM professors ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// async needed before request, resoinse if we use try/catch method
const getProfessorById = (request, response) => {
  const id = parseInt(request.params.id);

  const professorPromise = pool.query(
    "SELECT * FROM professors WHERE professors.id = $1",
    [id]
  );

  const reviewPromise = pool.query(
    "SELECT * FROM reviews WHERE reviews.professor_id = $1",
    [id]
  );

  Promise.all([professorPromise, reviewPromise])
    .then((values) => {
      const professor = values[0].rows[0];
      const reviews = values[1].rows;
      response.json({ professor, reviews });
    })
    .catch((error) => {
      response.status(500).json(error);
    });
  // try {
  //   const professorData = await pool.query(
  //     "SELECT * FROM professors WHERE professors.id = $1",
  //     [id]
  //   );
  //   const reviewData = await pool.query(
  //     "SELECT * FROM reviews WHERE reviews.professor_id = $1",
  //     [id]
  //   );
  //   const reviews = reviewData.rows;
  //   const professor = professorData.rows[0];
  //   response.json({ professor, reviews });
  // } catch (error) {
  //   response.status(500).json(error);
  // }
};

const createProfessor = (request, response) => {
  const { name, title, school, department } = request.body;

  pool.query(
    "INSERT INTO professors (name, title, school, department) VALUES ($1, $2, $3, $4)",
    [name, title, school, department],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Professor added with ID: ${results.insertId}`);
    }
  );
};

const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, title, school, department } = request.body;

  pool.query(
    "UPDATE professors SET name = $1, title = $2, school = $3, department = $4 WHERE id = $5",
    [name, title, school, department, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM professors WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professor deleted with ID: ${id}`);
  });
};

module.exports = {
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};
