import { DeleteProductService } from "../services/DeleteProductService";
import { FastifyRequest, FastifyReply } from "fastify";


export class DeleteProductController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { id } = request.query as { id: string};
        const deleteProductService = new DeleteProductService();
        const product = await deleteProductService.execute(id);
        return response.send(product);
    }
}