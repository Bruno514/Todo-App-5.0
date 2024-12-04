import express from "express";
import { tasksRouter } from "./routes/tasks";
import { usersRouter } from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

module.exports = app;
