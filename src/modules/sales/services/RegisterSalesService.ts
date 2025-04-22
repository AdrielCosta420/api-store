import prisma from "../../../prisma";

interface RegisterSalesProps {
    productId: string;
    quantity: number;
    totalPrice: number;
    paymentMethod?: string;
    clientName?: string;
}

export class RegisterSalesService {
    async execute({
        productId,
        quantity,
        totalPrice,
        paymentMethod,
        clientName,
    }: RegisterSalesProps) {
        try {
            if (!productId || quantity === undefined || totalPrice === undefined) {
                throw new Error("Preencha todos os campos.");
            }

            if (quantity <= 0) {
                throw new Error("Quantidade deve ser maior que zero.");
            }

            if (totalPrice < 0) {
                throw new Error("Preço não pode ser negativo.");
            }

            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                throw new Error("Produto não encontrado.");
            }

            if (product.quantity < quantity) {
                throw new Error("Quantidade maior que a disponível no estoque.");
            }

            await prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    quantity: product.quantity - quantity,
                },
            });

            return await prisma.sale.create({
                data: {
                    productId,
                    quantity,
                    totalPrice,
                    paymentMethod: paymentMethod || "",
                    clientName: clientName || "",
                    
                },
            });
        } catch (error: any) {
            throw new Error(`Erro ao registrar venda: ${error.message}`);
        }
    }
}
