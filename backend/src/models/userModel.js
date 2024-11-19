import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class User {
  async createUser(data) {
    try {
      const user = await prisma.user.create({
        data,
      });
      return user;
    } catch (error) {
      console.log('erro ao criar usuario', error);
      return error;
    }
  }

  async userExists(email) {
    try {
      const verificaEmailExistente = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return verificaEmailExistente;
    } catch (error) {
      return error;
    }
  }

  async GetUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      return error;
    }
  }
}
