import { AuthService } from "../services/AuthService";
import { FastifyRequest, FastifyReply, fastify } from "fastify";


class AuthController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string };
        console.log('entrou no auth')
        const authService = new AuthService();

        try {
            console.log('tentando autenticar', email, password)
            const user = await authService.execute({ email, password });

            if(!user) { 
                return reply.code(401).send({ error: 'Usuário não encontrado.' });
            }

        
            const payload = { id: user.id, role: user.role, email: user.email };
            console.log('gerou o payload', payload.email, payload.id, payload.role)

            const token = request.server.jwt.sign({ payload }, { expiresIn: '7d' }, );
            console.log('encerrou o auth com sucesso, token: ', token)
            return { token: token };
        } catch (error) {
            console.error('Error during authentication:', error);
            return reply.code(401).send({ error: error });
        }
    }
}

export { AuthController };