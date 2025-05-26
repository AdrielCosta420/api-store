import { ReportService } from "../services/ReportService";
import { FastifyRequest, FastifyReply } from "fastify";



export class ReportController {


    async getSummaryReport(reply: FastifyReply) {
        try {
            const reportService = new ReportService();
            const summary = await reportService.getSummaryReport();
            console.log(summary);
            return reply.status(200).send(summary);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar resumo." });
        }
    }

    async getSalesByMonth(reply: FastifyReply) {
        try {
            const reportService = new ReportService();

            const salesByMonth = await reportService.getSalesByMonth();
            return reply.status(200).send(salesByMonth);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar vendas por mês" });
        }
    }

    async getSalesByProduct(reply: FastifyReply) {
        try {
            const reportService = new ReportService();

            const salesByProduct = await reportService.getSalesByProduct();
            return reply.status(200).send(salesByProduct);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar vendas por produto" });
        }
    }

    async getSalesBySeller(reply: FastifyReply) {
        try {
            const reportService = new ReportService();
            const salesBySeller = await reportService.getSalesBySeller();
            return reply.status(200).send(salesBySeller);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar vendas por vendedor" });
        }
    }

    async getSalesGrowth(reply: FastifyReply) {
        try {
            const reportService = new ReportService();
            const salesGrowth = await reportService.getSalesGrowth();
            return reply.status(200).send(salesGrowth);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar crescimento de vendas" });
        }
    }

    async getSalesByPaymentMethods(reply: FastifyReply) {
        try {
            const reportService = new ReportService();
            const salesByPaymentMethod = await reportService.getSalesByPaymentMethods();
            return reply.status(200).send(salesByPaymentMethod);
        } catch (error) {
            return reply.status(500).send({ error: "Erro desconhecido ao buscar vendas por método de pagamento" });
        }
    }
}