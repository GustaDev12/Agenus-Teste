import { Request, Response } from "express";
import { z } from 'zod'

import { CreateUserUseCase } from "../use-cases/users/createUser/create-user.use-case.ts";
import { createUserSchema } from "../use-cases/users/createUser/create-user.schema.ts";
import { UsersRepository } from "../repositories/users.repository.ts";
import { GetUsersUseCase } from "../use-cases/users/getUsers/get-user.use-case.ts";
import { getUserByIdUseCase } from "../use-cases/users/getUserById/get-user-byId.use-case.ts";
import { updateUserByIdUseCase } from "../use-cases/users/updateUserById/update-user-byId.use-case.ts";
import { updateUserSchema } from "../use-cases/users/updateUserById/update-user.schema.ts";
import { DeleteUserUseCase } from "../use-cases/users/deleteUser/delete-user.use-case.ts";

const createUserUseCase = new CreateUserUseCase(UsersRepository);
const getUserUseCase = new GetUsersUseCase(UsersRepository);
const getUserByIdCase = new getUserByIdUseCase(UsersRepository);
const updateUserByIdCase = new updateUserByIdUseCase(UsersRepository);
const deleteUserByIdCase = new DeleteUserUseCase(UsersRepository);

export class UsersControllers {
    async createUser(req: Request, res: Response) {
        try {
            const validateData = z.parse(createUserSchema, req.body)
            const user = await createUserUseCase.exec(validateData)
            return res.status(201).json({
                message: "User created successfully!",
                user
            })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    error: error.issues
                })
            }
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            })
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await getUserUseCase.exec();
            return res.status(200).json({
                message: "Successfully obtained users!",
                users
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const user = await getUserByIdCase.exec(id);
            return res.status(200).json({
                message: "Successfully obtained user!",
                user
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    }

    async updateUserById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const parseData = z.parse(updateUserSchema, req.body)
            const user = await updateUserByIdCase.exec(id, parseData);
            return res.status(200).json({
                message: "Successfully updated user!",
                user
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.issues
            })
        }
    }

    async deleteUserById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const deleteUser = await deleteUserByIdCase.exec(id)
            return res.status(200).json({
                message: "Successfully deleted user!",
                deleteUser
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

}