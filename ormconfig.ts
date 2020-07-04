const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'test',
  synchronize: true,
  logging: true,
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
