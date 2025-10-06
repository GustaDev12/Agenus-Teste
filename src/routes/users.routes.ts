import express from 'express'

import { UsersControllers } from '../controllers/users.controller.ts';

const routes = express.Router();
const usersControllers = new UsersControllers();

routes.post('/', usersControllers.createUser)
routes.get('/', usersControllers.getUsers)
routes.get('/:id', usersControllers.getUserById)
routes.put('/:id', usersControllers.updateUserById)
routes.delete('/:id', usersControllers.deleteUserById)

export default routes;