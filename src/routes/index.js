const { Router } = require("express");

const usersRouter = require("./users.routes");
const moviesNotesRoutes = require("./moviesNotes.routes");
const moviesTagsRoutes = require('./moviesTags.routes');

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/movies_notes", moviesNotesRoutes);
routes.use('/movies_tags', moviesTagsRoutes);

module.exports = routes;