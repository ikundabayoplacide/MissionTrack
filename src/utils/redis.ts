import { config } from 'dotenv';
import {createClient} from 'redis';
import { logger } from './logger';


config();

const host = process.env.REDIS_HOST || "127.0.0.1";
const port = parseInt(process.env.REDIS_PORT || "6379", 10);
const password = process.env.REDIS_PASSWORD || "";
const database = parseInt(process.env.REDIS_DB || "0", 10);

// Log config without password
logger.info(`Redis configuration: ${host}:${port}, DB: ${database}`);

export const redis = createClient({
  socket: { host, port },
  password: password || undefined,
  database,
});

// Events
redis.on("connect", () => logger.info("✅ Connected to Redis successfully"));
redis.on("error", (error: Error) =>
  logger.error("❌ Redis connection failed: " + error.message)
);
redis.on("reconnecting", () => logger.info("🔄 Reconnecting to Redis..."));

// Safe connect wrapper
export const connectRedis = async () => {
  if (!redis.isOpen) {
    try {
      await redis.connect();
    } catch (err: any) {
      logger.error("❌ Redis initial connection error: " + err.message);
    }
  }
};

export default redis;
