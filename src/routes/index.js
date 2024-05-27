const { Router } = require("express");

const userRouter = require("./users.routes");
const moviesNotesRouter = require("./moviesNotes.routes");
const moviesTagsRoutes = require("./moviesTags.routes");

const routes = Router();
routes.use("/users", userRouter);
routes.use("/moviesNotes", moviesNotesRouter);
routes.use("/moviesTags", moviesTagsRoutes)

module.exports = routes;