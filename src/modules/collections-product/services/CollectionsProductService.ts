import prisma from "../../../prisma";

export class CollectionsProductService {
    async getAllCollections() {
        return await prisma.collection.findMany();
    }

    async createCollection(name: string) {
        return await prisma.collection.create({
            data: {
                name: name,
            },
        });
    }

    async getCollectionById(id: string) {
        return await prisma.collection.findUnique({
            where: {
                id: id,
            },
        });
    }
    async updateCollection(id: string, name: string) {
        if (!id) {
            throw { statusCode: 404, message: 'Coleção não encontrada.' }
        }

        if(!name) {
            throw { statusCode: 404, message: 'Informe um nome para Coleção.' }
        }

        return await prisma.collection.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
    }
}