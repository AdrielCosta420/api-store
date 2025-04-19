import { CreateProductService } from "../services/CreateProductService";
import {FastifyRequest, FastifyReply } from "fastify";

interface CreateProductProps {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    quantityByModel: number;
    quantityByColor: number;

}

export class CreateProductController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { model, price, color, size, quantity, quantityByModel, quantityByColor } = request.body as CreateProductProps;
            
            const createProductService = new CreateProductService();
            const product = await createProductService.execute({ model, price, color, size, quantity, quantityByModel, quantityByColor });

            if (!product) {
                return reply.status(400).send({ error: 'Não foi possível criar o produto.' });
            }

            return reply.status(201).send(product);
        } catch (error) {
            console.error('Error creating product:', error);
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }
}