import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ListProductController } from "../controllers/ListProductController";
import { CreateProductController } from "../controllers/CreateProductController";
import { DeleteProductController } from "../controllers/DeleteProductController";



export async function ProductRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Middleware para proteger a rota
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: 'Token inválido ou não fornecido' });
        }
    });

    fastify.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListProductController().handle(request, reply);
    })

    fastify.post('/product', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateProductController().handle(request, reply);
    })

    fastify.delete('/product', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteProductController().handle(request, reply);
    }     )
}
