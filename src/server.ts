import 'reflect-metadata';

import app from './app';
import './database/connection';

const PORT = process.env.PORT || 3333;

class BootStrap {
  constructor() {
    this.boot();
  }

  public boot() {
    app.server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  }
}

new BootStrap();
