import { AuthService } from "../services/AuthService";
import { FastifyRequest, FastifyReply } from 'fastify';

interface AuthBody {
  email: string;
  password: string;
}

class AuthController {

  async handle(request: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply) {
    const { email, password } = request.body;

    const authService = new AuthService();

    try {
      const user = await authService.execute({ email, password });

      if (!user) {
        return reply.code(401).send({ error: 'Usuário não encontrado.' });
      }

     
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

