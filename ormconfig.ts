require('./src/config/dotenv');

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATA_BASE,
  synchronize: false,
  logging: false,
  entities: ['src/api/models/**/*.ts'],
  migrations: ['src/api/database/migrations/**/*.ts'],
  subscribers: ['src/api/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/api/database/models',
    migrationsDir: 'src/api/database/migrations',
    subscribersDir: 'src/api/database/subscriber',
  },
};

module.exports = config;
