import express from "express";
import TodoController from "../controllers/todoController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();
// Route Level Middleware - To Protect Route
router.get("/todoslist",checkUserAuth, TodoController.Todolist);
router.post("/createtodo",checkUserAuth, TodoController.CreateTodo);
router.put("/updatetodo",checkUserAuth, TodoController.UpdateTodo);
router.delete("/deletetodo",checkUserAuth, TodoController.DeleteTodo);

export default router;
