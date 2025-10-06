import { UsersRepository } from "../../../repositories/users.repository.ts";
import { Users } from "../../../generated/prisma/index.js";
export class GetUsersUseCase {
    constructor(private readonly usersRepository: typeof UsersRepository) { }

    async exec(): Promise<Users[]> {
        const users = await this.usersRepository.getUsers()
        return users
    }

}