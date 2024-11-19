import bcrypt from 'bcryptjs';
import validator from 'validator';

import UserModel from '../models/userModel';

const userModel = new UserModel();

class UserController {
  async store(req, res) {
    const { name = '', email = '', password = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'o campo name é obrigatorio' });
    if (!email) return res.status(400).json({ error: 'o campo email é obrigatorio' });
    if (!password) return res.status(400).json({ error: 'o campo password é obrigatorio' });

    if (password.length < 6 || password.length > 20) {
      return res.status(400).json('A senha deve ter entre 6 e 20 caractares');
    }
    if (!validator.isEmail(email)) return res.status(400).json('Email invalido');

    const emailExists = await userModel.userExists(email);
    if (emailExists) return res.status(409).json('Email ja existente');

    const hashPass = await bcrypt.hash(password, 8);
    try {
      const user = await userModel.createUser({
        name,
        email,
        passwordHash: hashPass,
      });

      if (!user) return res.status(400).json('Nao foi possivel cadastrar usuario');

      return res.status(200).json({ message: 'Usuario cadastrado com sucesso', user });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar usuario', error });
    }
  }

  async index(req, res) {
    try {
      const users = await userModel.GetUsers();
      if (!users) {
        return res.status(204).json({
          errors: ['Nao há dados cadastrados'],
        });
      }

      return res.status(200).json({
        users,
      });
    } catch (error) {
      return res.status(400).json({
        errors: ['Erro ao buscar usuarios'],
      });
    }
  }
}

export default new UserController();
