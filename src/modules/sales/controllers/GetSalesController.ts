import {FastifyRequest, FastifyReply} from "fastify";

import {GetSalesService} from "../services/GetSalesService";

export class GetSalesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const getSalesService = new GetSalesService();

        try {
            const sales = await getSalesService.execute();
            return reply.status(200).send(sales);
        } catch (error) {
            return reply.status(400).send({message: 'Não foi possível buscar as vendas.'});
        }
    }
}