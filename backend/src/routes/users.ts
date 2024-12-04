require("dotenv").config();
import { Express, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
import { verifyToken } from "../middleware/verifyToken";

const prisma = new PrismaClient();
export const usersRouter = express.Router();

export interface IUser {
  name: string;
  email: string;
}

type UserRequest = {
  user: IUser;
};

usersRouter.post(
  "/register",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      // Check if the email already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      console.log(req.body)
      console.log(req.body.password)

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          password: hashedPassword,
          email: req.body.email,
        },
      });

      res.status(201).json({message: "User created"});
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route to authenticate and log in a user
usersRouter.post("/login", async function (req: Request, res: Response) {
  try {
    // Check if the email exists
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get(
  "/",
  verifyToken,
  async function (req: UserRequest, res: Response) {
    try {
      // Fetch user details using decoded token
      const user = await prisma.user.findFirst({
        where: { email: req.user.email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ username: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
