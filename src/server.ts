import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from 'fastify-jwt';
import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
import { UserRoutes } from './modules/users/routes/routes';
import { ProductRoutes } from './modules/products/routes/ProductRoutes';
import { SaleRoutes } from './modules/sales/routers/SaleRoutes';

const app = Fastify({ logger: true })

const jwtSecret = process.env.TOKEN_SECRET;

if (!jwtSecret) {
    throw new Error('TOKEN_SECRET não está definido.');
}

// Registre o plugin fastify-jwt
app.register(fastifyJwt, {
    secret: jwtSecret,
});


app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
})

export const start = async () => {
    await app.register(cors);
    await app.register(UserRoutes);
    await app.register(AuthRoutes);
    await app.register(ProductRoutes);
    await app.register(SaleRoutes);
    try {
        await app.listen({ port: 3333 , host: '0.0.0.0'});
        console.log('Server Started!');
    } catch (error) {
        process.exit(1);
    }
}

start();

