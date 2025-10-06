import { Tasks } from "../../../generated/prisma/index.js"
import { TasksRepository } from "../../../repositories/tasks.repository.ts"
export class DeleteTaskUseCase {
    constructor(private readonly tasksRepository: typeof TasksRepository) { }

    async exec(taskId: string): Promise<Tasks> {
        const taskAlreadyExists = await this.tasksRepository.getTaskById(taskId)

        if (!taskAlreadyExists) {
            throw new Error("Task not found", {
                cause: "Task Id invalid"
            })
        }

        const deleteTask = await this.tasksRepository.deleteTask(taskId)
        return deleteTask
    }
}