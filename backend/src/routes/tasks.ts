import { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tasksRouter = express.Router();

tasksRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  }
);
