import { Request, Response } from "express";
import { TasksRepository } from "../repositories/tasks.repository.ts";
import { CreateUserTaskUseCase } from "../use-cases/tasks/createUserTask/create-user-task.use-case.ts";
import { createUserTaskSchema } from "../use-cases/tasks/createUserTask/create-user-task.schema.ts";
import { GetUserTaskUseCase } from "../use-cases/tasks/getUserTasks/get-user-tasks.use-case.ts";
import { GetTaskByIdUseCase } from "../use-cases/tasks/getTaskById/get-task-byId.use-case.ts";
import { updateTaskSchema } from "../use-cases/tasks/updateTaskById/update-task.schema.ts";

import { z } from 'zod'
import { updateTaskByIdUseCase } from "../use-cases/tasks/updateTaskById/update-task-byId.use-case.ts";
import { DeleteTaskUseCase } from "../use-cases/tasks/deleteTaskById/delete-task.use-case.ts";

const createUserTask = new CreateUserTaskUseCase(TasksRepository)
const getUserTasks = new GetUserTaskUseCase(TasksRepository)
const getTasksById = new GetTaskByIdUseCase(TasksRepository)
const updateTask = new updateTaskByIdUseCase(TasksRepository)
const deleteTaskById = new DeleteTaskUseCase(TasksRepository)

export class TasksControllers {
    constructor() { }

    async createUserTask(req: Request, res: Response) {
        try {
            const userId = (req as any).userId as string;
            const parse = z.parse(createUserTaskSchema, req.body)
            const newTask = await createUserTask.exec(userId, parse)

            return res.status(201).json({ message: 'Task created', data: newTask })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    error: error.issues
                })
            }
            if (error.cause === "title") {
                return res.status(400).json({
                    message: "Title already exists",
                    error: error.message
                })
            }
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    async getUserTasks(req: Request, res: Response) {
        try {
            const userId = (req as any).userId as string;
            const tasks = await getUserTasks.exec(userId);
            return res.status(200).json({ message: 'Tasks retrieved', data: tasks })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    async getTaskById(req: Request, res: Response) {
        try {
            const taskId = req.params.id as string;
            const task = await getTasksById.exec(taskId);
            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                })
            }
            return res.status(200).json({ message: 'Task retrieved', data: task })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    async updateTaskById(req: Request, res: Response) {
        try {
            const taskId = req.params.id as string;
            const parse = z.parse(updateTaskSchema, req.body)
            const updatedTask = await updateTask.exec(taskId, parse);
            return res.status(200).json({ message: 'Task updated', data: updatedTask })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    error: error.issues
                })
            }
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
    async deleteTaskById(req: Request, res: Response) {
        try {
            const taskId = req.params.id as string;
            const deleteTask = await deleteTaskById.exec(taskId);
            return res.status(200).json({ message: 'Task deleted', data: deleteTask })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    error: error.issues
                })
            }
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}