import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AuthController } from "../controllers/AuthController";


export async function AuthRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post('/auth', async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handle(request, reply);
    })

}

