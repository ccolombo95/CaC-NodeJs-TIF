import { Router } from "express";
import { controllers, middlewares } from "./index.js";

export const routes = Router();

routes
  .post("/register", controllers.register)
  .post("/login", controllers.login)
  .get("/logout", controllers.logout)
  .get("/checkCookie", middlewares.authJWT, (req, res) => {
    res.json({ tokenValid: req.isAuthenticated });
  });
