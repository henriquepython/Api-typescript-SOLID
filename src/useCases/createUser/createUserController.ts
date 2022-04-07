import { Request, Response } from "express";
import { CreateUserUserCase } from "./createUserUserCase";

export class CreateUserController {
    constructor(
        private createUserUserCase: CreateUserUserCase,
    ){}
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try{
            await this.createUserUserCase.execute({
                name,
                email,
                password
            })

            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }
}