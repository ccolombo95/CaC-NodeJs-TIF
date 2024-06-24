import { Router } from "express";
import { middlewares } from "../middlewares/index.js";
import { controllers } from "../categories/categories.controllers.js";

const router = Router();

router
  .use(middlewares.routes.checkRoute)

  .get("/", controllers.getCategories)

  .post("/", controllers.createCategory)

  .put("/", controllers.incomplete)

  .put("/:id", middlewares.routes.checkParams, controllers.updateCategory)

  .delete("/:id", middlewares.routes.checkParams, controllers.deleteCategory);

export default router;
