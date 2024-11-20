import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/LoginRequired';

const route = Router();

route.post('/', loginRequired, userController.store);
route.get('/', loginRequired, userController.index);
route.put('/:id', userController.update);

export default route;
