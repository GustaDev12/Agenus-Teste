import database from '../database/prisma.ts'
import { createUserTaskDTO } from '../use-cases/tasks/createUserTask/create-user-task.schema.ts'
import { updateTaskDTO } from '../use-cases/tasks/updateTaskById/update-task.schema.ts'

export const TasksRepository = {

    async createTask(userId: string, input: createUserTaskDTO) {
        const newTask = await database.tasks.create({
            data: {
                userId,
                ...input,
            }
        })
        return newTask
    },

    async getUserTasksById(userId: string) {
        const tasks = await database.tasks.findMany({
            where: {
                userId
            }
        })
        return tasks
    },


    async getTaskByTitle(title: string) {
        const user = await database.tasks.findUnique({
            where: {
                title
            }
        })
        return user
    },

    async getTaskById(taskId: string) {
        const task = await database.tasks.findUnique({
            where: {
                id: taskId
            }
        })
        return task
    },

    async updateTask(taskId: string, input: createUserTaskDTO) {
        const task = await database.tasks.update({
            where: {
                id: taskId
            },
            data: {
                ...input
            }
        })
        return task
    },

    async deleteTask(taskId: string) {
        const task = await database.tasks.delete({
            where: {
                id: taskId
            }
        })
        return task
    }

}

