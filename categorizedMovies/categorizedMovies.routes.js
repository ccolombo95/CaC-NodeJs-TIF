import { Router } from "express";
import { middlewares } from "./../middlewares/index.js";
import { controllers } from "./categorizedMovies.controllers.js";

const router = Router();

router
  .use(middlewares.routes.checkRoute)

  .get("/", controllers.getCategorizedMovies);

export default router;
