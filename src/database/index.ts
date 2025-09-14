import { Sequelize } from "sequelize";

import { UserModel } from "./models/Users";

const env = process.env.NODE_ENV?.toUpperCase() || 'DEV';

// Log current environment
console.log(`Current environment: ${env}`);

const config = {
  username: process.env[`${env}_USERNAME`],
  password: process.env[`${env}_PASSWORD`],
  database: process.env[`${env}_DATABASE`],
  host: process.env[`${env}_HOST`],
  port: parseInt(process.env[`${env}_PORT`] || '5432'),
  dialect: 'postgres' as const,
  logging: env === 'TEST' ? false : console.log,
};

// Debug log
console.log('Database configuration:', {
  username: config.username,
  database: config.database,
  host: config.host,
  port: config.port
});

export const sequelize = new Sequelize(config);

// Initialize models with sequelize instance
const User = UserModel(sequelize);

const models = { User };

// Set up associations
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export const database = {
  ...models,
  sequelize,
};