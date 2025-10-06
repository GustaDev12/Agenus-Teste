import { TasksRepository } from "../../../repositories/tasks.repository.ts";
import { Tasks } from "../../../generated/prisma/index.js";
export class GetUserTaskUseCase {
    constructor(private readonly tasksRepository: typeof TasksRepository) { }

    async exec(userId: string): Promise<Tasks[]> {
        const tasks = await this.tasksRepository.getUserTasksById (userId);
        return tasks
    }

}