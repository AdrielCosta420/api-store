import { authenticate } from "../../../middlewares/authenticate";
import { CollectionsProductController } from "../controllers/CollectionsProductController";
import { FastifyInstance } from "fastify";

export async function CollectionsProductRoutes(fastify: FastifyInstance) {

    fastify.get('/collections/protected', {
        preValidation: [authenticate],
    }, async () => {
        return { message: 'Você está autenticado!' };
    });

    fastify.get("/collections", {
        preValidation: [authenticate],
    }, async (request, reply) => {
        return new CollectionsProductController().getAllCollections(request, reply);
});

    fastify.post("/collection", {
        preValidation: [authenticate],
    }, async (request, reply) => {
        return new CollectionsProductController().createCollection(request, reply);
    });
    fastify.patch("/collection", {
        preValidation: [authenticate],
    }, async (request, reply) => {
        return new CollectionsProductController().updateCollection(request, reply);
    });
}