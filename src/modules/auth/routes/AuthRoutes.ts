import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "../controllers/AuthController";

interface AuthBody {
  email: string;
  password: string;
}

export async function AuthRoutes(fastify: FastifyInstance) {

    fastify.post<{ Body: AuthBody }>('/auth', async (request: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply) => {
        return new AuthController().handle(request, reply);
    });
}
