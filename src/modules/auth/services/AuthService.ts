import prisma from "../../../prisma";
import bcrypt from 'bcrypt';

interface CredentialsProps {
    email: string;
    password: string;
}

class AuthService {

  
    async execute({ email, password }: CredentialsProps) {

        if (!email || !password) {
            throw { statusCode: 401, message: 'Usuário não encontrado.' }
        }

        
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw { statusCode: 401, message: 'Usuário não encontrado.' }
        }
        

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw { statusCode: 404, message: 'Usuário não encontrado.' }
        }

      
        return user;
    }



}

export { AuthService };
