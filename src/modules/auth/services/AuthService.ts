import prisma from "../../../prisma";
import bcrypt from 'bcrypt';

interface CredentialsProps {
    email: string;
    password: string;
}

class AuthService {

    // Função de autenticação
    async execute({ email, password }: CredentialsProps) {

        if (!email || !password) {
            throw new Error('Preencha todos os campos.')
        }

        // Buscar usuário por email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Usuário não encontrado.')
        }
        
        console.log(password)
        console.log(user.password)
        // Comparar a senha
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new Error('E-mail ou senha inválido.');
        }

        // Retornar o usuário autenticado
        return user;
    }



}

export { AuthService };
