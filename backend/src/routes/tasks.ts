import { Express, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/verifyToken";
import { IUserRequest } from "./users";

const express = require("express");
const prisma = new PrismaClient();

export const tasksRouter = express.Router();

tasksRouter.get(
  "/",
  verifyToken,
  async function (req: IUserRequest, res: Response, next: NextFunction) {
    const email = req.user.email;

    const tasks = await prisma.user.findMany({
      where: {
        email: email,
      },
      select: {
        tasks: {
          select: {
            title: true,
            description: true,
            completed: true,
            createdAt: true,
            dueDate: true,
          },
        },
      },
    });

    res.json(tasks);
  }
);

tasksRouter.post(
  "/",
  verifyToken,
  async function (req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const email = req.user.email;
      const { title, description, dueDate } = req.body;

      const tasks = await prisma.user.update({
        where: { email: email },
        data: {
          tasks: {
            create: {
              title: title,
              description: description,
              dueDate: dueDate,
            },
          },
        },
      });

      res.status(201).json({ message: "Task created." });
    } catch (error) {
      console.error(error);

      res.status(403).json({ error: "Could not create task" });
    }
  }
);
