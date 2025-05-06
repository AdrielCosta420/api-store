import { ProductService } from "../services/ProductService";
import { FastifyRequest, FastifyReply } from "fastify";

interface CreateProductBody {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;

  }
  


export class ProductController {

    async createProduct(request: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) {
        try {
            const { model, price, color, size, quantity } = request.body ;

            const service = new ProductService();


            const createdProduct = await service.createProduct({
                model,
                price,
                color,
                size,
                quantity,
            
            });

            if (!createdProduct) {
                return reply.status(400).send({ error: 'Não foi possível criar o produto.' });
            }

            return reply.status(201).send(createdProduct);


        } catch (error) {

            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }

    }

    async statusProduct(request: FastifyRequest, reply: FastifyReply) {
        try {

            const { id, active } = request.body as any;

            if (!id) {
                return reply.status(400).send({ error: 'ID do produto desconhecido.' });
            }

            const service = new ProductService();

            const findProduct = await service.getProductById(id);
            if (!findProduct) {
                return reply.status(400).send({ error: 'Produto não encontrado.' });
            }   

            
            const deletedProduct = await service.statusProduct(id, active);
  

            if (!deletedProduct) {
                return reply.status(400).send({ error: 'Não foi possível alterar o status do Produto.' });
            }

            const message = active ? 'Produto ativado com sucesso.' : 'Produto desativado com sucesso.';
            return reply.status(200).send({ message });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
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