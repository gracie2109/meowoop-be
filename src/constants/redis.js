export const TTL_FOREVER =  -1
export const TTL24h = 60 * 60 * 24; // 24h cache
export const TTL1m = 60; // 24h cache




export const REDIS_KEYS = (code = null) => ({
  // ghn
  GHN_PROVIDERS: "ghn:provinces",
  GHN_DISTRICT: `ghn:districts:${code}`,
  GHN_WARDS: `ghn:wards:${code}`,
});
