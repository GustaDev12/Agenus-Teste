import { UsersRepository } from "../../../repositories/users.repository.ts";
import { Users } from "../../../generated/prisma/index.js";
export class getUserByIdUseCase {
    constructor(private readonly usersRepository: typeof UsersRepository) { }

    async exec(id: string): Promise<Users | null> {
        const user = await this.usersRepository.getUserById(id)
        return user
    }

}