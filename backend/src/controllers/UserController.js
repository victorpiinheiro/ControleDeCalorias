import bcrypt from 'bcryptjs';
import validator from 'validator';

import UserModel from '../models/userModel';

const userModel = new UserModel();

class UserController {
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

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ errors: ['ID do usuário é obrigatório'] });
      }

      const user = await userModel.getOneUser(id);
      if (!user) return res.status(200).json({ message: 'usuario nao encontrado', dados: [] });
      return res.status(200).json({ message: 'Usuario encontrado:', user });
    } catch (error) {
      console.log('erro:', error);
      return res.status(400).json({
        errors: ['Erro ao buscar usuarios'],
      });
    }
  }

  async store(req, res) {
    const { name = '', email = '', password = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'o campo name é obrigatorio' });
    if (!email) return res.status(400).json({ error: 'o campo email é obrigatorio' });
    if (!password) return res.status(400).json({ error: 'o campo password é obrigatorio' });

    if (password.length < 6 || password.length > 20) {
      return res.status(400).json('A senha deve ter entre 6 e 20 caractares');
    }
    if (!validator.isEmail(email)) return res.status(400).json('Email invalido');

    const emailExists = await userModel.userExistsByEmail(email);
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

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['ID do usuário é obrigatório'] });
      }
      const verificaUserExiste = await userModel.userExistsById(id);
      if (!verificaUserExiste) return res.status(404).json({ errors: ['usuario não encontrado'] });

      const { name, email } = req.body;
      if (!name && !email) {
        return res.status(400).json({ errors: ['É necessário informar ao menos um campo para atualização'] });
      }

      const camposAtualizar = {};
      if (name) camposAtualizar.name = name;
      if (email) {
        if (!validator.isEmail(email)) return res.status(400).json({ errors: ['Email invalido'] });
        camposAtualizar.email = email;
      }
      const userEditado = await userModel.updateUser(id, camposAtualizar);
      return res.status(200).json({ message: ['Usuario editado com sucesso'], user: userEditado });
    } catch (error) {
      console.error('erro ao editar usuario:', error);
      return res.status(400).json({ errors: ['Erro ao editar usuario'], error });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ errors: ['ID do usuário é obrigatório'] });
    }

    try {
      const deleteUser = await userModel.deleteUser(id);
      if (!deleteUser) return res.status(200).json({ message: 'Não foi possivel deletar user/ user nao encontrado' });

      return res.status(200).json({ message: 'Usuario deletado com sucesso' });
    } catch (error) {
      console.error('erro ao editar usuario:', error);
      return res.status(400).json({ errors: ['Erro ao deletar usuario'], error });
    }
  }
}

export default new UserController();
