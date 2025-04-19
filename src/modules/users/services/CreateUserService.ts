
import bcrypt, { genSalt } from 'bcrypt';
import prisma from '../../../prisma';
interface CreateUserProps {
    name: string;
    email: string;
    role: string;
    password: string;
}

class CreateUserService {

    async execute({ name, email, role, password }: CreateUserProps) {

        if (!name || !email || !role || !password) {
            throw new Error('Preencha todos os campos.')
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                role: role,
                password: hash,
            },
        });

        return user;
    }

}
export { CreateUserService }