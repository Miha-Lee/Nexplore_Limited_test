import express, { Router } from "express";
import { getAllTodos, createTodo, updateTodo,deleteTodo } from "../controllers/todos";

const router: Router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;
