import { ListUsersService } from "../services/ListUsersService";
import {FastifyRequest, FastifyReply } from "fastify";


class ListUsersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute();

        return reply.send(users);
    }
}

export { ListUsersController }