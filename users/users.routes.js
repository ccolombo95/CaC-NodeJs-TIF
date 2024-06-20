import { Router } from "express";
import { controllers } from "../users/users.controllers.js";

const router = Router();

router
  .get("/", controllers.getUsers)
  .post("/", controllers.createUser)
  .post("/login", controllers.verifyUser)
  .put("/:id", controllers.updateUser)
  .delete("/:id", controllers.deleteUser);

export default router;
