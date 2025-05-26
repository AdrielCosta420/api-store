import { FastifyRequest, FastifyReply } from 'fastify';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = request.headers['authorization']?.split(' ')[1];
    console.log('token', token);
   
    await request.jwtVerify();
  } catch (err) {
    reply.send(new Error('Não autorizado'));
  }
};
