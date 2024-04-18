const { Router } = require("express");

const MoviesTagsController = require("../controllers/MoviesTagsController");

const moviesTagsRoutes = Router();

const moviesTagsController = new MoviesTagsController;

moviesTagsRoutes.post("/:user_id", moviesTagsController.create);

module.exports = moviesTagsRoutes;