import { CollectionsProductService } from "../../collections-product/services/CollectionsProductService";
import { ProductService } from "../services/ProductService";

import { FastifyRequest, FastifyReply } from "fastify";

interface CreateProductBody {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    collectionName: string;
    collectionId: string;

}



export class ProductController {

    async createProduct(request: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) {
        try {
            const { model, price, color, size, quantity, collectionId, collectionName } = request.body;

            const service = new ProductService();


            const createdProduct = await service.createProduct({
                model,
                price,
                color,
                size,
                quantity,
                collectionId,
                collectionName

            });

            if (!createdProduct) {
                return reply.status(400).send({ error: 'Não foi possível criar o produto.' });
            }

            return reply.status(201).send(createdProduct);


        } catch (error) {

            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }

    }

    async updateProduct(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id, model, price, color, size, quantity, collectionId, collectionName } = request.body as any;

            if (!id) {
                return reply.status(400).send({ error: 'ID do produto desconhecido.' });
            }

            if (!model || price === undefined || !color || !size || !quantity || !collectionId || !collectionName) {
                return reply.status(400).send({ error: 'Preencha todos os campos.' });
            }

            const service = new ProductService();

            const findProduct = await service.getProductById(id);
            if (!findProduct) {
                return reply.status(400).send({ error: 'Produto não encontrado.' });
            }


            const updatedProduct = await service.updateProduct(id, {
                model,
                price,
                color,
                size,
                quantity,
                collectionId: collectionId,
                collectionName: collectionName,
            })

            if (!updatedProduct) {
                return reply.status(400).send({ error: 'Não foi possível atualizar o produto.' });
            }

            return reply.status(200).send(updatedProduct);
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


            const status = await service.statusProduct(id, active);


            if (!status) {
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

    async getProductsByCollectionId(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.query as any;
            const service = new ProductService();
            const collectionService = new CollectionsProductService();
            if (!id) {
                return reply.status(400).send({ error: 'ID da coleção desconhecido.' });
            }

            const findCollection = await collectionService.getCollectionById(id);
            if (!findCollection) {
                return reply.status(400).send({ error: 'Coleção não encontrada.' });
            }
           const findProducts = await service.getProductsByCollectionId(id)
            return reply.status(200).send(findProducts);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }

    async getTopProducts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new ProductService();
            const products = await service.getTopProducts();

            return reply.status(200).send(products);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }


}