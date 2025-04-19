import prisma from '../../../prisma';

export class SingleUserService {
    async execute(id: string) {

        if (!id) {
            throw new Error("Id não informado.");
        }
        const user = await prisma.user.findFirst({
            where: { id: id },
        });


        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return user;
    }
}