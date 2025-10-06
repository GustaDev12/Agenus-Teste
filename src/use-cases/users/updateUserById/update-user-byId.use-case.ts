import { UsersRepository } from "../../../repositories/users.repository.ts";
import { Users } from "../../../generated/prisma/index.js";
import { updateUserDTO } from "./update-user.schema.ts";
export class updateUserByIdUseCase {
    constructor(private readonly usersRepository: typeof UsersRepository) { }

    async exec(id: string, input: updateUserDTO): Promise<Users | null> {
        const user = await this.usersRepository.getUserById(id)
        if (!user) {
            throw new Error("User not found")
        }
        const newUserData = {
            name: input.name || user.name,
            email: input.email || user.email,
        }
        const updateUser = await this.usersRepository.updateUserById(id, newUserData)
        return updateUser
    }

}