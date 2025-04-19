import { SingleUserService } from "../services/SingleUserService";
import { FastifyRequest, FastifyReply } from "fastify";

export class SingleUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        console.log(id);
        const singleUserService = new SingleUserService();

        const user = await singleUserService.execute(id);
        console.log(user);
        if (!user) {
            return reply.code(404).send({ error: "Usuário não encontrado." });

        }


        return reply.send(user);
    }
}