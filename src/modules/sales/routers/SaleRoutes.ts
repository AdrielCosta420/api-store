import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

import { SaleController } from "../controllers/SaleController";
import { authenticate } from "../../../middlewares/authenticate"; // Importando o middleware de autenticação
export async function SaleRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/sales/protected', {
        preValidation: [authenticate], 
    }, async () => {
        return { message: 'Você está autenticado!' };
    });

    fastify.post('/sales',{
        preValidation: [authenticate],
    },async (request: FastifyRequest, reply: FastifyReply) => {

        return new SaleController().registerSale(request, reply);
    });

    fastify.get('/sales',{
        preValidation: [authenticate],
    },async (request: FastifyRequest, reply: FastifyReply) => {
        return new SaleController().getSales(request, reply);
    });

    fastify.get('/sales-last',{
        preValidation: [authenticate],
    },async (request: FastifyRequest, reply: FastifyReply) => {
        return new SaleController().getLastSales(request, reply);
    })

} 