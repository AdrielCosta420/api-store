import prisma from "../../../prisma";


interface CreateProductProps {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    quantityByModel: number;
    quantityByColor: number;

}

export class ProductService {

    async createProduct({ model, price, color, size, quantity, quantityByModel, quantityByColor }: CreateProductProps) {
        if (!model || price === undefined || !color || !size || !quantity ) {
            throw new Error('Preencha todos os campos.')
        }

        if (quantity < 0 || quantityByModel < 0 || quantityByColor < 0) {
            throw new Error('Quantidade não pode ser negativa.')
        }

        if (price < 0) {
            throw new Error('Preço não pode ser negativo.')
        }

        return await prisma.product.create({
            data: {
                model: model,
                price: price,
                color: color,
                size: size,
                quantity: quantity,
        
            }
        });
    }

    async deleteProduct(id: string) {
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

    async getAllProducts() {
        const products = await prisma.product.findMany();
        if (!products || products.length === 0) {
            throw new Error("Nenhum produto encontrado.");
        }
        return products;
    }

    async getProductById(id: string) {
        if (!id) {
            throw new Error("Solicitação Inválida");
        }
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        return product;
    }

    async updateProduct(id: string, data: Partial<CreateProductProps>) {
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

        return await prisma.product.update({
            where: { id: findProduct.id },
            data: data
        });
    }
    
    async getLastProduct() {
        try {
            const lastProduct = await prisma.product.findFirst({
                orderBy: { createdAt: "desc" },
            });
            return lastProduct;
        } catch (error) {
            throw new Error("Erro ao buscar o último produto.");
        }
    }

}
