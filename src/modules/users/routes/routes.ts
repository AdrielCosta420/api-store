import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUsersController } from "../controllers/ListUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { SingleUserController } from "../controllers/SingleUserController";

export async function UserRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/teste', async (request: FastifyRequest, reply: FastifyReply) => {
        return { hello: 'world' };
    });

    fastify.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply);
    });

    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => { 
        return new ListUsersController().handle(request, reply);
    })

    fastify.delete('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply);
    })

    fastify.get('/user/single', async (request: FastifyRequest, reply: FastifyReply) => {
        return new SingleUserController().handle(request, reply);
    })

  
}