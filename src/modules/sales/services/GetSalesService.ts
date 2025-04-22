import prisma from "../../../prisma";

export class GetSalesService {
    async execute() {
        try {
            const sales = await prisma.sale.findMany({
                include: {
                    product: true,
                },
            });
            return sales;
        } catch (error) {
            throw new Error("Erro ao buscar vendas.");
        }
    }
}
