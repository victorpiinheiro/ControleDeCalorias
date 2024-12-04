import UserProfile from '../models/UserProfileModel';
import UserModel from '../models/userModel';

const userProfile = new UserProfile();
const userModel = new UserModel();

class UserProfileController {
  async index(req, res) {
    const users = await userProfile.getAllUsers();

    if (!users) return res.status(400).json({ message: 'Sem usuarios para mostrar' });

    return res.status(200).json({ usersProfile: users });
  }

  async store(req, res) {
    const {
      userId, peso, altura, dataNasc, genero,
    } = req.body;
    if (!peso) return res.status(200).json({ message: ['Peso é um campo obrigartorio'] });
    if (!altura) return res.status(200).json({ message: ['Altura é um campo obrigartorio'] });
    if (!dataNasc) return res.status(200).json({ message: ['Data de nascimento é um campo obrigartorio'] });

    const [dia, mes, ano] = dataNasc.split('/');
    const formataData = new Date(`${ano}-${mes}-${dia}`);

    try {
      const verificaUserIdExiste = await userModel.userExistsById(userId);

      if (!verificaUserIdExiste) return res.status(400).json({ message: ['User Id invalido'] });

      const user = await userProfile.createUser({
        userId, peso, altura, dataNasc: formataData, genero,
      });

      if (!user) return res.status(401).json({ message: ['Não foi possivel cadastrar usuario'] });

      return res.status(200).json({ message: ['Perfil inicial cadastrado com sucesso'], user });
    } catch (error) {
      console.log('seu erro foi:', error);
      return res.status(400).json({ Error: ['erro ao cadastrar usuario'], error });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(200).json({ message: ['Id nao informado'] });

      const userById = await userProfile.getUserById(id);

      if (!userById) return res.status(401).json({ message: ['Perfil nao encontrado'] });

      await userProfile.deleteUser(id);

      return res.status(200).json({ message: ['Usuario deletado com sucesso'] });
    } catch (error) {
      console.log('seu erro foi:', error);
      return res.status(400).json({ Error: ['erro ao excluir usuario'], error });
    }
  }
}

export default new UserProfileController();
