import prisma from "../../../prisma";


interface CreateProductProps {
    model: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    collectionName: string;
    collectionId: string; 


}

export class ProductService {

    async createProduct({ model, price, color, size, quantity, collectionName, collectionId }: CreateProductProps) {
        if (!model || price === undefined || !color || !size || !quantity || !collectionName || !collectionId) {
            throw new Error('Preencha todos os campos.')
        }

        if (quantity < 0 ) {
            throw new Error('Quantidade não pode ser negativa.')
        }

        if (price < 0) {
            throw new Error('Preço não pode ser negativo.')
        }

        const product = await prisma.product.create({
            data: {
            model: model,
            price: price,
            color: color,
            size: size,
            quantity: quantity,
            active: true,
            collectionId: collectionId,
            collectionName: collectionName
            }
        });

        await prisma.collection.update({
            where: { id: collectionId },
            data: {
            products: {
                push: product.id
            }
            }
        });

        return product;
    }

    async statusProduct(id: string, active: boolean) {
        console.log('delete product id SERVICE: ', id);
        if (!id) {
            throw new Error("Id do produto não informado ou inválido.");
        }
       
        await prisma.product.update({
            where: { id },
            data: { active: active }
          });

      
        return { message: 'Produto Desativado com sucesso!' };
    }

    async getAllProducts() {
        console.log('get all products');
        const products = await prisma.product.findMany({ where: { active: true } });

        
        return products;
    }

    async getProductById(id: string) {
        console.log('get product id: ', id);
        
        if (!id) {
            throw new Error("Solicitação Inválida");
        }
        const product = await prisma.product.findFirst({
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

    async getProductsByCollectionId(collectionId: string) {
        if (!collectionId) {
            throw new Error("Solicitação Inválida");
        }

        const products = await prisma.product.findMany({
            where: {
                collectionId: collectionId
            }
        });

        if (!products) {
            throw new Error("Produto não encontrado.");
        }

        return products;
    }

    async getTopProducts() {
        const products = await prisma.product.findMany({
            where: {
                active: true
            },
            orderBy: {
                totalSold: 'desc'
            },
            take: 3
        });

        if (!products) {
            throw new Error("Produto não encontrado.");
        }

        return products;
    }
}
