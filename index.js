const express = require("express");
const bodyParser = require("body-parser");
const dbProfessors = require("./components/professors");
const dbReviews = require("./components/reviews");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres Rate My Professor clone.",
  });
});

app.get("/api/professors", dbProfessors.getProfessors);
app.get("/api/professors/:id", dbProfessors.getProfessorById);
app.post("/api/professors", dbProfessors.createProfessor);
app.put("/api/professors/:id", dbProfessors.updateProfessor);
app.delete("/api/professors/:id", dbProfessors.deleteProfessor);

app.get("/api/reviews", dbReviews.getReviews);
app.get("/api/reviews/:id", dbReviews.getReviewById);
app.post("/api/reviews", dbReviews.createReview);
app.put("/api/reviews/:id", dbReviews.updateReview);
app.delete("/api/reviews/:id", dbReviews.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
