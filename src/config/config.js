const dotenv = require('dotenv');
dotenv.config();

const getPrefix = () => {
  let env = process.env.NODE_ENV;

  console.log('🔍 NODE_ENV:', env);

  if (!env) {
    env = 'DEV'; // default if nothing is set
  }

  // ✅ Explicit check for production
  if (env.toLowerCase() === 'production') {
    console.log('🚀 Running in PRODUCTION mode');
    return 'PROD';
  }

  console.log('🔍 Using prefix:', env.toUpperCase());
  return env.toUpperCase();
};

const databaseConfig = () => {
  const env = getPrefix();

  // ✅ If production, use DATABASE_URL directly
  if (env === 'PROD' && process.env.DATABASE_URL) {
    return {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // most providers need SSL in production
          rejectUnauthorized: false,
        },
      },
    };
  }

  // ✅ Otherwise use per-env credentials
  return {
    username: process.env[`${env}_USERNAME`],
    database: process.env[`${env}_DATABASE`],
    password: process.env[`${env}_PASSWORD`],
    host: process.env[`${env}_HOST`],
    port: parseInt(process.env[`${env}_PORT`]) || 5432,
    dialect: 'postgres',
  };
};

module.exports = databaseConfig;
