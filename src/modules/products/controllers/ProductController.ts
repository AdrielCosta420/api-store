import { ProductService } from "../services/ProductService";
import { FastifyRequest, FastifyReply } from "fastify";

export class ProductController {

    async createProduct(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { model, price, color, size, quantity, quantityByModel, quantityByColor } = request.body as any;

            const service = new ProductService();


            const createdProduct = await service.createProduct({
                model,
                price,
                color,
                size,
                quantity,
                quantityByModel,
                quantityByColor
            });

            if (!createdProduct) {
                return reply.status(400).send({ error: 'Não foi possível criar o produto.' });
            }

            return reply.status(201).send(createdProduct);


        } catch (error) {

            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }

    }

    async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
        try {

            const { id } = request.body as any;

            if (!id) {
                return reply.status(400).send({ error: 'ID do produto desconhecido.' });
            }

            const service = new ProductService();

            const findProduct = await service.getProductById(id);

            if (!findProduct) {
                return reply.status(400).send({ error: 'Produto não encontrado.' });
            }

            const deletedProduct = await service.deleteProduct(id);


            if (!deletedProduct) {
                return reply.status(400).send({ error: 'Não foi possível deletar o produto.' });
            }
        } catch (error) {

        }
    }

    async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new ProductService();
            const products = await service.getAllProducts();

            if (!products) {
                return reply.status(400).send({ error: 'Nenhum produto encontrado.' });
            }

            return reply.status(200).send(products);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }


    }

    async getProductById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.query as any;
         
            if (!id) {
                return reply.status(400).send({ error: 'ID do produto desconhecido.' });
            }

            const service = new ProductService();
            const product = await service.getProductById(id);

            if (!product) {
                return reply.status(400).send({ error: 'Produto não encontrado.' });
            }

            return reply.status(200).send(product);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }


}