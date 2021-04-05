const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Get all exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error" + err));
});

// Create exercise
router.route("/add").post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({ username, description, duration, date });
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error" + err));
});

// Get exercise by ID
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

// Delete exercise by ID
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted!"))
    .catch((err) => res.status(400).json("Error" + err));
});

// Update exercise by ID
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      const { username, description } = req.body;
      const duration = Number(req.body.duration);
      const date = Date.parse(req.body.date);

      exercise.username = username || exercise.username;
      exercise.description = description || exercise.description;
      exercise.duration = duration || exercise.duration;
      exercise.date = date || exercise.date;

      exercise
        .save()
        .then(() => res.json("Excercise updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
