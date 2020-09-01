const express = require("express");
const bodyParser = require("body-parser");
const dbProfessors = require("./components/professors");
const dbReviews = require("./components/reviews");
const app = express();
const port = 3000;

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

app.get("/professors", dbProfessors.getProfessors);
app.get("/professors/:id", dbProfessors.getProfessorById);
app.post("/professors", dbProfessors.createProfessor);
app.put("/professors/:id", dbProfessors.updateProfessor);
app.delete("/professors/:id", dbProfessors.deleteProfessor);

app.get("/reviews", dbReviews.getReviews);
app.get("/reviews/:id", dbReviews.getReviewsById);
app.post("/reviews", dbReviews.createReviews);
app.put("/reviews/:id", dbReviews.updateReviews);
app.delete("/reviews/:id", dbReviews.deleteReviews);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
