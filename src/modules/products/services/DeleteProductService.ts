import prisma from "../../../prisma";

export class DeleteProductService {
    async execute(id: string) {
        console.log('id', id);
        if (!id) {
            throw new Error("Solicitação Inválida");
        }
        const findProduct = await prisma.product.findFirst({
            where: {
                id: id
            }
        });

        if (!findProduct) {
            throw new Error("Produto não encontrado.");

        }

        await prisma.product.delete({ where: { id: findProduct.id } });
        return { message: 'Deletado com succeso!' };
    }
}