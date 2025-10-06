import express, { Request, Response, NextFunction } from 'express'
import { UsersRepository } from '../repositories/users.repository.ts';
import { TasksControllers } from '../controllers/tasks.controller.ts';

const tasksControllers = new TasksControllers()
const routes = express.Router();

const middleware = async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;
    if (!authorization) {
        return response.status(401).json({ message: 'No user id provided' })
    }
    const [_, id] = authorization.split(' ')
    const user = await UsersRepository.getUserById(id as string)
    if (!user) {
        return response.status(401).json({ message: 'User not found' })
    }
    (request as any).userId = user.id as string
    next()
} 

routes.post('/', middleware, tasksControllers.createUserTask)
routes.get('/', middleware, tasksControllers.getUserTasks)
routes.get('/:id', tasksControllers.getTaskById)
routes.put('/:id', tasksControllers.updateTaskById)
routes.delete('/:id', tasksControllers.deleteTaskById)
export default routes