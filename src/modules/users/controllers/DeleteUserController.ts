import { DeleteUserService } from "../services/DeleteUserService";
import { FastifyRequest, FastifyReply } from "fastify";

class DeleteUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute(id);
        return reply.send(user);
        
    }
}

export { DeleteUserController };