import Fastify, { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
import { UserRoutes } from './modules/users/routes/routes';
import { ProductRoutes } from './modules/products/routes/ProductRoutes';
import { SaleRoutes } from './modules/sales/routers/SaleRoutes';

const app = Fastify({ logger: true });

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido.');
}

// Registra o plugin fastify-jwt com a chave secreta do .env
app.register(fastifyJwt, { secret: jwtSecret });

// Middleware global reutilizável para autenticação
app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: 'Não autorizado' });
  }
});

// Handler de erro global
app.setErrorHandler((
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  app.log.error(error);
  reply.status(error.statusCode || 500).send({
    message: error.message || 'Erro interno no servidor.',
  });
});

export const start = async () => {
  try {
    await app.register(cors);
    await app.register(UserRoutes);
    await app.register(AuthRoutes);
    await app.register(ProductRoutes);
    await app.register(SaleRoutes);

    await app.listen({ port: 3333, host: '0.0.0.0' });
    console.log('Server Started!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();


// import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
// import cors from '@fastify/cors';
// import fastifyJwt from '@fastify/jwt';
// import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
// import { UserRoutes } from './modules/users/routes/routes';
// import { ProductRoutes } from './modules/products/routes/ProductRoutes';
// import { SaleRoutes } from './modules/sales/routers/SaleRoutes';

// const app = Fastify({ logger: true });

// // Certifique-se de definir a variável de ambiente JWT_SECRET no seu arquivo .env
// const jwtSecret = process.env.JWT_SECRET;

// if (!jwtSecret) {
//   throw new Error('JWT_SECRET não está definido.');
// }

// // Registra o plugin fastify-jwtprocess.env.JWT_SECRET
// app.register(fastifyJwt, { secret: jwtSecret });


// app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     await request.jwtVerify();
//   } catch (err) {
//     reply.send(new Error('Não autorizado'));
//   }
// });

// // Configura o handler de erro personalizado
// app.setErrorHandler((
//   error: any, // Tipagem genérica para erro, podemos melhorar se necessário
//   request: any,
//   reply: any
// ) => {
//   app.log.error(error); // Log do erro para acompanhamento
//   reply.status(error.statusCode || 500).send({
//     message: error.message || 'Erro interno no servidor.',
//   });
// });

// // Registra os plugins e rotas
// export const start = async () => {
//   try {
//     // Registra o plugin CORS
//     await app.register(cors);

//     // Registra as rotas
//     await app.register(UserRoutes);
//     await app.register(AuthRoutes);
//     await app.register(ProductRoutes);
//     await app.register(SaleRoutes);

//     // Inicia o servidor
//     await app.listen({ port: 3333, host: '0.0.0.0' });
//     console.log('Server Started!');
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// // Inicia o servidor
// start();


// import Fastify from 'fastify';
// import cors from '@fastify/cors';
// import fastifyJwt from '@fastify/jwt';
// import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

// // import fastifyJwt from 'fastify-jwt';
// import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
// import { UserRoutes } from './modules/users/routes/routes';
// import { ProductRoutes } from './modules/products/routes/ProductRoutes';
// import { SaleRoutes } from './modules/sales/routers/SaleRoutes';

// const app = Fastify({ logger: true })

// const jwtSecret = process.env.TOKEN_SECRET;

// if (!jwtSecret) {
//     throw new Error('TOKEN_SECRET não está definido.');
// }

// // Registre o plugin fastify-jwt

// app. register(fastifyJwt, {
//   secret: jwtSecret,
// });


// // app.setErrorHandler((error: { message: any; }, request: any, reply: { code: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
// //     reply.code(400).send({ message: error.message });
// // })

// app.setErrorHandler((
//     error: FastifyError,
//     request: FastifyRequest,
//     reply: FastifyReply
//   ) => {
//     app.log.error(error); // loga o erro no logger do Fastify
//     reply.status(error.statusCode || 500).send({
//       message: error.message || 'Erro interno no servidor.',
//     });
//   });

// export const start = async () => {
//     await app.register(cors);
//     await app.register(UserRoutes);
//     await app.register(AuthRoutes);
//     await app.register(ProductRoutes);
//     await app.register(SaleRoutes);
//     try {
//         await app.listen({ port: 3333 , host: '0.0.0.0'});
//         console.log('Server Started!');
//     } catch (error) {
//         process.exit(1);
//     }
// }

// start();

