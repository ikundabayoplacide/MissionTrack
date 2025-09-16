const dotenv = require('dotenv');
dotenv.config();

const databaseConfig = () => {
  const env = process.env.NODE_ENV || 'DEV';  
  
  // Use DATABASE_URL only in PRODUCTION environment
  if (env.toUpperCase() === 'PROD' && process.env.DATABASE_URL) {
    console.log('Using DATABASE_URL for production connection');
    return {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  }

  // For DEVELOPMENT or when DATABASE_URL is not available in production
  const prefix = env.toUpperCase();
  console.log(`Using ${prefix}_* environment variables for connection`);
  
  return {
    username: process.env[`${prefix}_USERNAME`],
    database: process.env[`${prefix}_DATABASE`],
    password: process.env[`${prefix}_PASSWORD`],
    host: process.env[`${prefix}_HOST`],
    port: parseInt(process.env[`${prefix}_PORT`]) || 5432,
    dialect: 'postgres',
    ...(env.toUpperCase() === 'PROD' && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
  };
};

module.exports = databaseConfig;