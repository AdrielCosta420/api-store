import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUsersController } from "../controllers/ListUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { SingleUserController } from "../controllers/SingleUserController";
import { authenticate } from "../../../middlewares/authenticate";
export async function UserRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    

    fastify.get('/users/protected', {
        preValidation: [authenticate], 
    }, async () => {
        return { message: 'Você está autenticado!' };
    });

    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return { active: 'on-line!!!!' };
    });


    fastify.post('/user', {
        preValidation: [authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply);
    });

    fastify.get('/users', {
        preValidation: [authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => { 
        return new ListUsersController().handle(request, reply);
    })

    fastify.delete('/user', {
        preValidation: [authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply);
    })

    fastify.get('/user/single', {
        preValidation: [authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new SingleUserController().handle(request, reply);
    })

  
}