import { createClient } from 'redis';
import { config } from 'dotenv';
import { logger } from './logger';

config();

const host = process.env.REDIS_HOST || 'redis-18217.c8.us-east-1-3.ec2.redns.redis-cloud.com';
const port = parseInt(process.env.REDIS_PORT || '18217');
const password = process.env.REDIS_PASSWORD || 'VmEgzwJ2LZeg02ytx6upTqqUPcBdiU14';

logger.info(`Redis configuration: ${host}:${port}`);

export const redis = createClient({
  socket: {
    host: host,
    port: port
  },
  password: password
});

redis.on('connect', () => {
  logger.info('✅ Connected to Redis');
});

redis.on('error', (err) => {
  logger.error(`❌ Redis error: ${err.message}`);
});

redis.on('ready', () => {
  logger.info('✅ Redis ready');
});

export default redis;