import { CollectionsProductService } from "../services/CollectionsProductService";
import { FastifyRequest, FastifyReply } from "fastify";
export class CollectionsProductController {

    async getAllCollections(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new CollectionsProductService();

            const collections = await service.getAllCollections();
            return reply.status(200).send(collections);
        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }

    async createCollection(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name } = request.body as any;
            if (!name) {
                return reply.status(400).send({ error: 'Informe um nome para a coleção.' });
            }
            const service = new CollectionsProductService();
            const createdCollection = await service.createCollection(name);
            if (!createdCollection) {
                return reply.status(400).send({ error: 'Não foi possível criar a coleção.' });
            }
            return reply.status(201).send(createdCollection);


        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }

    async updateCollection(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id, name } = request.body as any;
            if (!id) {
                return reply.status(400).send({ error: 'ID da coleção desconhecido.' });
            }
            if (!name) {
                return reply.status(400).send({ error: 'Informe um nome para a coleção.' });
            }
            const service = new CollectionsProductService();
            const updatedCollection = await service.updateCollection(id, name);
            if (!updatedCollection) {
                return reply.status(400).send({ error: 'Não foi possível atualizar a coleção.' });
            }
            return reply.status(200).send(updatedCollection);


        } catch (error) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' });
        }
    }


}