import { createUserTaskDTO } from "./create-user-task.schema.ts";
import { TasksRepository } from "../../../repositories/tasks.repository.ts";
import { Tasks } from "../../../generated/prisma/index.js";
export class CreateUserTaskUseCase {
    constructor(private readonly tasksRepository: typeof TasksRepository) { }

    async exec(userId: string, input: createUserTaskDTO): Promise<Tasks> {
        const taskAlreadyExists = await this.tasksRepository.getTaskByTitle(input.title)
        if (taskAlreadyExists) {
            throw new Error("There is already a task created with that name", {
                cause: "title"
            })
        }
        const newTask = await this.tasksRepository.createTask(userId, input)
        return newTask
    }

}