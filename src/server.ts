import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import config from "./config";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.route";
import { todoRouter } from "./modules/todo/todo.router";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

// this is get is for localhost:5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World, i am learning express.js on details !");
});

app.use("/users", userRouter);

// Todos crud
app.use("/todos", todoRouter);

// auth
app.use("/auth");

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route is not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
