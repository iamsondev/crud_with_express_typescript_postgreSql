import { Router } from "express";
import { todoController } from "./todo.controller";
import { userControllers } from "../user/user.controller";

const router = Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodos);

router.get("/:id", todoController.getSingleTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

export const todoRouter = router;
