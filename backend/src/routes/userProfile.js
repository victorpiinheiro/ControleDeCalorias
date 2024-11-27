import { Router } from 'express';
import userProfile from '../controllers/UserProfileController';

const route = Router();

route.post('/', userProfile.store);

export default route;
