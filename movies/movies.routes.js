import { Router } from "express";
import { middlewares } from "../middlewares/index.js";
import { controllers } from "../movies/movies.controllers.js";

const router = Router();

router
  .use(middlewares.routes.checkRoute)

  .get("/", controllers.getMovies)
  .get("/movie/:id", controllers.getMovie)

  .post(
    "/",
    middlewares.files.uploadImage.single("image"),
    controllers.createMovie
  )

  .put("/", controllers.incomplete)
  .put(
    "/:id",
    middlewares.routes.checkParams,
    middlewares.files.uploadImage.single("image"),
    controllers.updateMovie
  )

  .delete("/:id", middlewares.routes.checkParams, controllers.deleteMovie);

export default router;
