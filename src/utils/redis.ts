import { createClient } from 'redis';
import { config } from 'dotenv';
import { logger } from './logger';

config();

const redisUrl = process.env.REDIS_URL || 
  'redis://default:VmEgzwJ2LZeg02ytx6upTqquPcBdiU14@redis-18217.c8.us-east-1-3.ec2.redns.redis-cloud.com:18217';

logger.info(`Using Redis URL: ${redisUrl}`);

export const redis = createClient({
  url: redisUrl,
});

redis.on('connect', () => {
  logger.info('Connected to Redis');
});

redis.on('error', (err) => {
  logger.error(`Redis connection error: ${err.message}`, { stack: err.stack });
});

redis.on('ready', () => {
  logger.info('Redis client ready');
});

export default redis;

// Connect automatically if needed
(async () => {
  try {
    await redis.connect();
    logger.info("Redis connected successfully via URL");
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
  }
})();
