import express from 'express';
import dotenv from 'dotenv';
import tokenRoutes from './src/routes/tokenRoutes';
import userRoute from './src/routes/userRoutes';
import userProfile from './src/routes/userProfile';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', userRoute);
    this.app.use('/token', tokenRoutes);
    this.app.use('/user-profile', userProfile);
  }
}

export default new App().app;
