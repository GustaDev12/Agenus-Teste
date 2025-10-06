import { createUserDTO } from "./create-user.schema.ts";
import { UsersRepository } from "../../../repositories/users.repository.ts";
export class CreateUserUseCase {
    constructor(private readonly usersRepository: typeof UsersRepository) { }

    async exec(input: createUserDTO): Promise<createUserDTO> {
        const userAlreadyExists = await this.usersRepository.getUserByEmail(input.email)
        if (userAlreadyExists) {
            throw new Error("Email already exists")
        }
        const newUser = await this.usersRepository.createUser(input)
        return newUser
    }

}