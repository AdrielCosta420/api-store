import { ReportController } from "../controllers/ReportController";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "../../../middlewares/authenticate"; 

export async function ReportRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/reports/summary', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSummaryReport(reply);
    });

    fastify.get('/reports/sales-by-month', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSalesByMonth(reply);
    });

    fastify.get('/reports/sales-by-product', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSalesByProduct(reply);
    });

    fastify.get('/reports/sales-by-seller', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSalesBySeller(reply);
    });

    fastify.get('/reports/sales-growth', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSalesGrowth(reply);
    });

    fastify.get('/reports/sales-by-payment-method', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReportController().getSalesByPaymentMethods(reply);
    });
}