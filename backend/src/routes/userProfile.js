import { Router } from 'express';
import userProfile from '../controllers/UserProfileController';

const route = Router();

route.delete('/', userProfile.delete);
route.post('/', userProfile.store);

export default route;
