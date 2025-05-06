import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { authenticate } from "../../../middlewares/authenticate"; 

interface CreateProductBody {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;

}

export async function ProductRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/products/protected', {
        preValidation: [authenticate], 
    }, async () => {
        return { message: 'Você está autenticado!' };
    });

    fastify.get('/products', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().getAllProducts(request, reply);
    });

    fastify.post<{ Body: CreateProductBody }>('/product', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) => {
        return new ProductController().createProduct(request, reply);
    });

    fastify.patch('/product-status', {
        preValidation: [authenticate], 
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().statusProduct(request, reply);
    });

    fastify.get('/product', {
        preValidation: [authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new ProductController().getProductById(request, reply);
    });
}
