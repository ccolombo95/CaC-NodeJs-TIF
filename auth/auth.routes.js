import { Router } from "express";
import { controllers, middlewares } from "./index.js";

export const routes = Router();

routes
  .post("/register", controllers.register)
  .post("/login", controllers.login)
  .get("/checkcookie", controllers.checkCookie)
  .get("/logout", controllers.logout);
