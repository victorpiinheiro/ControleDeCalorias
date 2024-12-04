import { Router } from 'express';
import userProfile from '../controllers/UserProfileController';

const route = Router();

route.delete('/', userProfile.deleteUser);
route.post('/', userProfile.store);
route.get('/', userProfile.index);

export default route;
