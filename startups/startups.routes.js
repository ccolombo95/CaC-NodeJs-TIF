import { Router } from "express";
import { middlewares } from "../middlewares/index.js";
import { controllers } from "./startups.controllers.js";

const router = Router();

router
  .use(middlewares.routes.checkRoute)

  .get("/", controllers.getStartups)
  .get("/startup/:id", controllers.getStartup)

  .post("/", middlewares.files.uploadImage, controllers.createStartup)

  .put("/", controllers.incomplete)
  .put(
    "/:id",
    middlewares.routes.checkParams,
    middlewares.files.uploadImage,
    controllers.updateStartup
  )

  .delete("/:id", middlewares.routes.checkParams, controllers.deleteStartup);

export default router;
