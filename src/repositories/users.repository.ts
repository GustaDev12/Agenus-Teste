import database from '../database/prisma.ts'
import { createUserDTO } from '../use-cases/users/createUser/create-user.schema.ts'
import { updateUserDTO } from '../use-cases/users/updateUserById/update-user.schema.ts'

export const UsersRepository = {

    async createUser(input: createUserDTO) {
        const newUser = await database.users.create({
            data: input
        })
        return newUser
    },


    async getUserById(id: string) {
        const user = await database.users.findUnique({
            where: {
                id
            }
        })
        return user
    },

    async getUserByEmail(email: string) {
        const user = await database.users.findUnique({
            where: {
                email
            }
        })
        return user
    },

    async updateUserById(id: string, input: { name: string, email: string }) {
        const updateUser = await database.users.update({
            where: {
                id
            },
            data: input
        })
        return updateUser
    },

    async getUsers() {
        const users = await database.users.findMany({})
        return users
    },

    async deleteUserById(id: string) {
        const deletUser = await database.users.delete({
            where: {
                id
            }
        })
        return deletUser
    }

}

