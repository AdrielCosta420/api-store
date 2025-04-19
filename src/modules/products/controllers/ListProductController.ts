import { ListProductsService } from "../services/ListProductService";
import { FastifyRequest, FastifyReply } from "fastify";

export class ListProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        console.log('BUSCANDO POR PRODUTOS...')
        const listProductsService = new ListProductsService();
        const products = await listProductsService.execute();

        if (!products) {
            throw new Error('Não foi possível listar os produtos.');
        }

        if (products.length === 0) {
            throw new Error("Nenhum produto encontrado.");

        }

        console.log('PRODUTOS ENCONTRADOS:', products.length);
        return reply.send(products);
    }
}