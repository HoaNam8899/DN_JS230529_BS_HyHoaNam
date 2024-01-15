import { Router } from "express";
import TaskController from "../controllers/task.controller";

const taskController = new TaskController();
const router = Router();

router.get("/tasks", taskController.getAll);
router.get("/tasks/:id", taskController.getById);
router.post("/tasks", taskController.create);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete)


export default router;