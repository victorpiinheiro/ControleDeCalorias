import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserProfile {
  async getAllUsers() {
    try {
      const usersProfile = await prisma.userProfile.findMany({
        orderBy: {
          id: 'desc',
        },
      });

      return usersProfile;
    } catch (err) {
      console.log('erro:', err);
      return err;
    }
  }

  async createUser(data) {
    try {
      const userProfile = await prisma.userProfile.create({
        data,
      });
      return userProfile;
    } catch (error) {
      return console.log('Erro ao criar perfil', error);
    }
  }

  async deleteUser(id) {
    try {
      const userDeletado = await prisma.userProfile.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return userDeletado;
    } catch (error) {
      return console.log('Erro ao deletar perfil', error);
    }
  }

  async getUserById(id) {
    try {
      const getUser = await prisma.userProfile.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
      return getUser;
    } catch (error) {
      return console.log('Erro ao procurar perfil', error);
    }
  }
}
