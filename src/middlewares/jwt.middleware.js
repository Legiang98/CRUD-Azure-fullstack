import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config.js";
import { MIDDLEWARE_MESSAGES } from "../constants/messages.js";

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: MIDDLEWARE_MESSAGES.NO_TOKEN_PROVIDED });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: MIDDLEWARE_MESSAGES.UNAUTHORIZED });
    }
    req.userId = decoded.userId;
    next();
  });
}
