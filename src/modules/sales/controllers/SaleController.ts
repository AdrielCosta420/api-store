import { SalesService } from "../services/SaleService";
import { FastifyRequest, FastifyReply } from "fastify";

export class SaleController {
    async registerSale(request: FastifyRequest, reply: FastifyReply) {
        const { productId, quantity, totalPrice, paymentMethod, clientName } = request.body as any;
        const salesService = new SalesService();

        try {
            const sale = await salesService.registerSale({
                productId,
                quantity,
                totalPrice,
                paymentMethod,
                clientName,
            
            });
            return reply.status(201).send(sale);
        } catch (error) {
            return reply.status(400).send({ message: 'Não foi possível Registrar Venda.' });
        }

    }


    async getSales(request: FastifyRequest, reply: FastifyReply) {
        const salesService = new SalesService();

        try {
            const sales = await salesService.getSales();
            return reply.status(200).send(sales);
        } catch (error) {
            return reply.status(400).send({message: 'Não foi possível buscar as vendas.'});
        }
    }

    async getLastSales(_: FastifyRequest, reply: FastifyReply) {
        const salesService = new SalesService();

        try {
            const lastSale = await salesService.getLastSales();
            return reply.status(200).send(lastSale);
        } catch (error) {
            return reply.status(400).send({message: 'Não foi possível buscar a última venda.'});
        }
    }

}