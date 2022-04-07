import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class CreateUserUserCase {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute (data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User Already exists.');
        }

        const user = new User(data);
        await this.userRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem vindo a plataforma',
            body: '<p>Você já pode fazer login em nossa platform</p>'
        })
    }
}