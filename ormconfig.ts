const config = {
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["src/api/models/**/*.ts"],
  migrations: ["src/api/database/migrations/**/*.ts"],
  subscribers: ["src/api/database/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/api/database/models",
    migrationsDir: "src/api/database/migrations",
    subscribersDir: "src/api/database/subscriber",
  },
};

module.exports = config;
