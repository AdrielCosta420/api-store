import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
// import { RegisterSalesController } from '../controllers/RegisterSalesController';
// import { GetSalesController } from "../controllers/GetSalesController";
import { SaleController } from "../controllers/SaleController";
export async function SaleRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.addHook('onRequest', async (request, reply) => {
        try {

            await request.jwtVerify();

        } catch (err) {
            reply.code(401).send({ error: 'Token inválido ou não fornecido' });
        }
    });

    fastify.post('/sales', async (request: FastifyRequest, reply: FastifyReply) => {

        return new SaleController().registerSale(request, reply);
    });

    fastify.get('/sales', async (request: FastifyRequest, reply: FastifyReply) => {
        return new SaleController().getSales(request, reply);
    });

} 