import { Express, Request, Response, NextFunction } from "express";

import express from "express";
import { tasksRouter } from "./routes/tasks";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

module.exports = app;
