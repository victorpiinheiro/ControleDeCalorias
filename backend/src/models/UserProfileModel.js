import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserProfile {
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
}
