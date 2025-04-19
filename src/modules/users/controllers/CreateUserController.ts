import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, role, password } = request.body as { name: string, email: string, role: string, password: string };

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, role, password });

        return reply.send(user);
    }
}

export { CreateUserController }