import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "../../repositories/Implementtions/PostgresUserRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserUserCase } from "./createUserUserCase";

const mailtrapMailProvider = new MailtrapMailProvider()
const postgresUserRepository = new PostgresUserRepository()

const createUserUserCase = new CreateUserUserCase(
    postgresUserRepository,
    mailtrapMailProvider,
)

const createUserController = new CreateUserController(
    createUserUserCase
)

export { createUserUserCase, createUserController }