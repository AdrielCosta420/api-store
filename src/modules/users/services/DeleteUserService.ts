import prisma from '../../../prisma';



class DeleteUserService {
    async execute(id: string) {
       
        if (!id) {
            throw new Error("Solicitação Inválida");
        }
        const findUser = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!findUser) {
            throw new Error("Usuário não encontrado.");

        }

        await prisma.user.delete({ where: { id: findUser.id } });
        return { message: 'Deletado com succeso!' };
    }
}

export { DeleteUserService };