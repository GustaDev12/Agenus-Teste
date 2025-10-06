import { updateTaskDTO } from "./update-task.schema.ts";
import { TasksRepository } from "../../../repositories/tasks.repository.ts";
import { Tasks } from "../../../generated/prisma/index.js";

export class updateTaskByIdUseCase {
    constructor(private readonly tasksRepository: typeof TasksRepository) { }

    async exec(taskId: string, input: updateTaskDTO): Promise<Tasks> {
        const taskAlreadyExists = await this.tasksRepository.getTaskById(taskId)

        if (!taskAlreadyExists) {
            throw new Error("Task not found", {
                cause: "Task Id invalid"
            })
        }

        const updateTask = {
            title: input.title || taskAlreadyExists.title,
            description: input.description || taskAlreadyExists.description,
            status: input.status || taskAlreadyExists.status,
        }

        const newTask = await this.tasksRepository.updateTask(taskId, updateTask)
        return newTask
    }

}