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

export class CreateProductService {
    async execute({ model, price, color, size, quantity, quantityByModel, quantityByColor }: CreateProductProps) {
        if (!model || price === undefined || !color || !size || !quantity || !quantityByModel || !quantityByColor) {
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
                quantityByModel: quantityByModel,
                quantityByColor: quantityByColor
            }
        });
    }
}