import { Sequelize } from "sequelize";

const nodeEnv = process.env.NODE_ENV || "DEV";
const env = nodeEnv.toUpperCase();

// Log current environment
console.log(`Current environment: ${env}`);

let sequelize: Sequelize;

if (env === "PRODUCTION" && process.env.DATABASE_URL) {
  // ✅ Use hosted DB connection
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // needed for Heroku/Railway/Render
      },
    },
  });
} else {
  // ✅ Use local/dev/test connection
  sequelize = new Sequelize({
    username: process.env[`${env}_USERNAME`],
    password: process.env[`${env}_PASSWORD`],
    database: process.env[`${env}_DATABASE`],
    host: process.env[`${env}_HOST`],
    port: parseInt(process.env[`${env}_PORT`] || "5432"),
    dialect: "postgres",
    logging: env === "TEST" ? false : console.log,
  });
}

// Initialize models with sequelize instance
import { User } from "./models/users";
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
export { sequelize }; 