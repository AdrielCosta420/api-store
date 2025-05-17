import prisma from "../../../prisma";

interface RegisterSalesProps {
    productId: string;
    quantity: number;
    totalPrice: number;
    paymentMethod?: string;
    clientName?: string;
}

export class SalesService {
    async registerSale({
        productId,
        quantity,
        totalPrice,
        paymentMethod,
        clientName,
    }: RegisterSalesProps) {
        try {
      
            if (!productId || quantity == null || totalPrice == null) {
                throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
            }

            if (quantity <= 0) {
                throw new Error("A quantidade deve ser maior que zero.");
            }

            if (totalPrice < 0) {
                throw new Error("O preço total não pode ser negativo.");
            }

            
            const product = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new Error("Produto não encontrado.");
            }

            if (product.quantity < quantity) {
                throw new Error("Quantidade maior que a disponível no estoque.");
            }

            // Transação: Atualiza o produto e cria a venda
            const [updatedProduct, sale] = await prisma.$transaction([
                prisma.product.update({
                    where: { id: productId },
                    data: {
                        quantity: product.quantity - quantity,
                        totalSold: product.totalSold + quantity,
                    },
                }),
                prisma.sale.create({
                    data: {
                        productId,
                        quantity,
                        totalPrice,
                        paymentMethod: paymentMethod || "",
                        clientName: clientName || "",
                    },
                }),
            ]);

            return sale;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao registrar venda: ${error.message}`);
            }
            throw new Error("Erro desconhecido ao registrar venda.");
        }
    }

    async getSales(page: number = 1) {
        try {
            const pageSize = 10;
            const skip = (page - 1) * pageSize;
    
            const [sales, totalCount] = await prisma.$transaction([
                prisma.sale.findMany({
                    skip,
                    take: pageSize,
                    include: { product: true },
                    orderBy: { createdAt: "desc" },
                }),
                prisma.sale.count(),
            ]);
    
            return {
                currentPage: page,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount,
                sales,
            };
        } catch (error: unknown) {
            throw new Error("Erro ao buscar vendas paginadas.");
        }
    }

    async getLastSales() {
        try {
            return await prisma.sale.findMany({
                orderBy: { createdAt: "desc" },
                include: { product: true },
                take: 3,
            });
        } catch (error: unknown) {
            throw new Error("Erro ao buscar as últimas vendas.");
        }
    }
}




