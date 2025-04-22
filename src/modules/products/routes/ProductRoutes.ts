import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ProductController } from "../controllers/ProductController";
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
        return new ProductController().getAllProducts(request, reply);
    })

    fastify.post('/product', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().createProduct(request, reply);
    })

    fastify.delete('/product', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().deleteProduct(request, reply);
    })

    fastify.get('/product', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().getProductById(request, reply);
    })
}
