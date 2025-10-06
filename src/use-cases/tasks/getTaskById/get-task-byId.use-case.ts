import { TasksRepository } from "../../../repositories/tasks.repository.ts";
import { Tasks } from "../../../generated/prisma/index.js";
export class GetTaskByIdUseCase {
    constructor(private readonly tasksRepository: typeof TasksRepository) { }

    async exec(userId: string): Promise<Tasks | null> {
        const tasks = await this.tasksRepository.getTaskById(userId);
        return tasks
    }

}