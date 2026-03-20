import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

export async function getCached<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  const r = getRedis();

  if (!r) {
    return fetcher();
  }

  try {
    const cached = await r.get<T>(key);
    if (cached !== null && cached !== undefined) {
      return cached;
    }
  } catch {
    // Redis down, fallback to DB
  }

  const data = await fetcher();

  try {
    await r.set(key, JSON.stringify(data), { ex: ttlSeconds });
  } catch {
    // Silently fail cache write
  }

  return data;
}

export async function invalidateCache(pattern: string): Promise<void> {
  const r = getRedis();
  if (!r) return;

  try {
    const keys = await r.keys(pattern);
    if (keys.length > 0) {
      await Promise.all(keys.map((k) => r.del(k)));
    }
  } catch {
    // Silently fail
  }
}
