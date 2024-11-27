import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/LoginRequired';

const route = Router();

route.post('/', loginRequired, userController.store);
route.get('/', userController.index);
route.get('/:id', userController.show);
route.put('/:id', userController.update);
route.delete('/:id', userController.deleteUser);

export default route;
