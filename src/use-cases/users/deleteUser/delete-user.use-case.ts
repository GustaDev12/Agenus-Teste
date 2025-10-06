import { UsersRepository } from "../../../repositories/users.repository.ts";
export class DeleteUserUseCase {
    constructor(private readonly usersRepository: typeof UsersRepository) { }

    async exec(id: string): Promise<any> {
        const userAlreadyExists = await this.usersRepository.getUserById(id)
        if (!userAlreadyExists) {
            throw new Error("User not found")
        }
        const deleteUser = await this.usersRepository.deleteUserById(id)
        return deleteUser
    }
}