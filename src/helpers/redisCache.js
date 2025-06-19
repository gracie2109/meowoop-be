import redisClient from "../database/redis";


export async function getOrSetCache(key, ttlSeconds, fetchFunction) {
  if (!key || typeof fetchFunction !== 'function') {
    throw new Error('Invalid parameters for getOrSetCache');
  }

  try {
    const cached = await redisClient.get(key);
    if (cached) {
      console.log(`[REDIS] HIT: ${key}`);
      return JSON.parse(cached);
    }

    console.log(`[REDIS] MISS: ${key} → fetching and caching`);
    const freshData = await fetchFunction();
    
    if (ttlSeconds == null || ttlSeconds < 0) {
      await redisClient.set(key, JSON.stringify(freshData));
    } else {
      await redisClient.setEx(key, ttlSeconds, JSON.stringify(freshData));
    }
    
    return freshData;
  } catch (error) {
    console.error('Redis operation failed:', error);
    return await fetchFunction();
  }
}