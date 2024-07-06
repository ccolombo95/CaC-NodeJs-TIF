import jwt from "jsonwebtoken";
import { config } from "./index.js";

function authJWT(req, res, next) {
  const token = req.signedCookies.token;

  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      req.isAuthenticated = false;
      return next();
    }

    req.user = decoded;
    req.isAuthenticated = true;
    next();
  });
}

export const middlewares = { authJWT };
