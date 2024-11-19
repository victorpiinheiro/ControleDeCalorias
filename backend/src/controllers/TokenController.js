import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userModel';

const userModel = new UserModel();

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        errors: ['credenciais invalidas'],
      });
    }
    try {
      const verificaEmailExiste = await userModel.userExists(email);
      if (!verificaEmailExiste) {
        return res.status(400).json({
          errors: ['Email nao existe'],
        });
      }

      const confirmaSenha = await bcrypt.compare(password, verificaEmailExiste.passwordHash);
      if (!confirmaSenha) {
        return res.status(400).json({
          errors: ['Senha invalida'],
        });
      }

      const { id } = verificaEmailExiste;
      const token = await jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({
        token,
      });
    } catch (error) {
      return res.status(400).json({
        errors: ['Erro ao gerar o token'],
      });
    }
  }
}

export default new TokenController();
