import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterSalesService } from "../services/RegisterSalesService";


export class RegisterSalesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { productId, quantity, totalPrice, paymentMethod, clientName } = request.body as any;
        const registerSalesService = new RegisterSalesService();

        console.log({
            productId,
            quantity,
            totalPrice,
            paymentMethod,
            clientName,
           
        });

        try {
            const sale = await registerSalesService.execute({
                productId,
                quantity,
                totalPrice,
                paymentMethod,
                clientName,
            
            });
            return reply.status(201).send(sale);
        } catch (error) {
            return reply.status(400).send({ message: 'Não foi possível Registrar Venda.' });
        }



    }
}
