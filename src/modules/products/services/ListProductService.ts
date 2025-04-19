import prisma from "../../../prisma";

export class ListProductsService {
    async execute() {
        const products = await prisma.product.findMany();
        return products;
    }
}