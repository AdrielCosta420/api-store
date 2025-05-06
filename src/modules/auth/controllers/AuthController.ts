import { AuthService } from "../services/AuthService";
import { FastifyRequest, FastifyReply } from 'fastify';

// Definição da interface para o corpo da requisição
interface AuthBody {
  email: string;
  password: string;
}

// Definindo o tipo correto para a requisição e resposta
class AuthController {

  async handle(request: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply) {
    // Agora, TypeScript sabe que o corpo da requisição tem as propriedades `email` e `password`
    const { email, password } = request.body;

    const authService = new AuthService();

    try {
      const user = await authService.execute({ email, password });

      if (!user) {
        return reply.code(401).send({ error: 'Usuário não encontrado.' });
      }

      // Gerar o token JWT
      const token = request.server.jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        { expiresIn: '7d', sub: user.id }
      );

      return { token: token };
    } catch (error) {
      return reply.code(401).send({ error: (error as Error).message });
    }
  }
}

export { AuthController };


// import { AuthService } from "../services/AuthService";

// import { FastifyRequest, FastifyReply } from 'fastify';

// interface AuthBody {
//     email: string;
//     password: string;
//   }

// class AuthController {

//     async handle(request: FastifyRequest, reply: FastifyReply) {
//         const { email, password } = request.body as { email: string, password: string };
//         const authService = new AuthService();

//         try {
//             const user = await authService.execute({ email, password });

//             if (!user) {
//                 return reply.code(401).send({ error: 'Usuário não encontrado.' });
//             }



//             const token = request.server.jwt.sign(
//                 { id: user.id, role: user.role, email: user.email },
//                 { expiresIn: '7d', sub: user.id }

//             );

//             return { token: token };
//         } catch (error) {
//             return reply.code(401).send({ error: (error as Error).message });

//         }
//     }
// }

// export { AuthController };