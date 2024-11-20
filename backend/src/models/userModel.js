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

  async updateUser(id, data) {
    try {
      const userEditado = await prisma.user.update({
        where: {
          id: parseInt(id, 10),
        },
        data,

      });
      return userEditado;
    } catch (err) {
      return err;
    }
  }

  async userExistsByEmail(email) {
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

  async userExistsById(id) {
    try {
      const verificaUser = await prisma.user.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
      return verificaUser;
    } catch (error) {
      return error;
    }
  }

  async getOneUser(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
      return user;
    } catch (err) {
      return console.error('Seu erro foi:', err);
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
