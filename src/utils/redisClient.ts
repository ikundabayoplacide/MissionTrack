import { createClient } from "redis";
import { config } from 'dotenv';

config();

const redisUrl = process.env.REDIS_URL || 
  'redis://default:VmEgzwJ2LZeg02ytx6upTqquPcBdiU14@redis-18217.c8.us-east-1-3.ec2.redns.redis-cloud.com:18217';

export const redisClient = createClient({
  url: redisUrl
});

redisClient.on('connect', () => {
  console.log('✅ RedisClient connected');
});

redisClient.on('error', (err: unknown) => {
  console.log("Redis Client Error", err);
});

redisClient.on('ready', () => {
  console.log('✅ RedisClient ready');
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully via URL");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();
