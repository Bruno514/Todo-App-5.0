require("dotenv").config();

import { Express, Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
  user: JwtPayload | string | undefined;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token)
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
