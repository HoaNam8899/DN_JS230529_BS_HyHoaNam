import { Request, Response } from "express";
import TaskService from "../services/task.service";

const taskService = new TaskService;
class TaskController {
    async getAll(req: Request, res: Response) {
        const data = await taskService.getAll();
        res.json(data);
    };
    async getById(req: Request, res: Response) {
        const data = await taskService.getById(req.params.id);
        res.send(data);
    };
    async create(req: Request, res: Response) {
        const data = await taskService.create(req.body);
        res.send(data);
    };
    async update(req: Request, res: Response) {
        const data = await taskService.update(req.params.id, req.body);
        res.send(data);
    };
    async delete(req: Request, res: Response) {
        const data = await taskService.delete(req.params.id);
        res.send(data);
    }
}

export default TaskController;