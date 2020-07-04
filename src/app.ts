import '../src/config/dotenv';
import 'reflect-metadata';

import express, { Express } from 'express';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(cors());

    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler() {}
}

export default new App();
