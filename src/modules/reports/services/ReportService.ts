import prisma from "../../../prisma";
import { subMonths } from 'date-fns';


export class ReportService {
    async getSummaryReport() {
        const totalSales = await prisma.sale.count();
        const totalRevenue = await prisma.sale.aggregate({
            _sum: {
                totalPrice: true,
            }
        });
        return {
            totalSales: totalSales,
            totalRevenue: totalRevenue._sum.totalPrice || 0,

        };
    }


    async getSalesByMonth() {
        const oneYearAgo = subMonths(new Date(), 12);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: oneYearAgo,
                },
            },
            select: {
                totalPrice: true,
                createdAt: true,
            },
        });

        const grouped: Record<string, number> = {};

        for (const sale of sales) {
            const monthKey = `${sale.createdAt.getFullYear()}-${(sale.createdAt.getMonth() + 1).toString().padStart(2, '0')}`;
            grouped[monthKey] = (grouped[monthKey] || 0) + Number(sale.totalPrice);
        }

        const sorted = Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, total]) => ({ month, total }));

        return sorted;
    }

    async getSalesByProduct() {
        const salesByProduct = await prisma.sale.groupBy({
            by: ['productId'],
            _sum: { quantity: true, totalPrice: true },
        });

        const products = await prisma.product.findMany({
            where: { id: { in: salesByProduct.map(p => p.productId) } },
        });

        const result = salesByProduct.map(sale => {
            const product = products.find(p => p.id === sale.productId);
            return {
                productName: product?.model,
                totalSold: sale._sum.quantity,
                totalRevenue: sale._sum.totalPrice,
            };
        });

        return result;
    }

    async getSalesBySeller() {
        const sellers = await prisma.sale.groupBy({
            by: ['sellerId', 'sellerName'],
            _sum: { totalPrice: true },
            _count: { _all: true },
        });

        return sellers;
    }

    //Crescimento % = ((Valor Atual - Valor Anterior) / Valor Anterior) * 100
    async getSalesGrowth() {
        const oneYearAgo = subMonths(new Date(), 12);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: oneYearAgo,
                },
            },
            select: {
                totalPrice: true,
                createdAt: true,
            },
        });

        // Agrupar por mês
        const monthlyTotals: Record<string, number> = {};

        for (const sale of sales) {
            const monthKey = `${sale.createdAt.getFullYear()}-${(sale.createdAt.getMonth() + 1)
                .toString()
                .padStart(2, '0')}`;
            monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + Number(sale.totalPrice);
        }

        // Ordenar os meses
        const sortedMonths = Object.entries(monthlyTotals)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, total]) => ({ month, total }));

        // Calcular crescimento percentual
        const growthData = sortedMonths.map((entry, index, array) => {
            if (index === 0) return { ...entry, growth: null }; // primeiro mês, sem comparação
            const previous = array[index - 1].total;
            const growth = previous === 0 ? null : ((entry.total - previous) / previous) * 100;
            return {
                ...entry,
                growth: parseFloat(growth?.toFixed(2) || '0'),
            };
        });

        return growthData;

    }

    async getSalesByPaymentMethods() {
        const paymentMethods = await prisma.sale.groupBy({
            by: ['paymentMethod'],
            _sum: { totalPrice: true },
        });

        return paymentMethods.map(method => ({
            method: method.paymentMethod,
            totalRevenue: method._sum.totalPrice,
        }));
    }
}