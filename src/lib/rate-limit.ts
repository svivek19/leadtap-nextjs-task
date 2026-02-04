import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isKvConfigured =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

// Create redis only if env exists
const redis = isKvConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// Fallback dummy limiter (no blocking)
const noLimit = {
  limit: async () => ({
    success: true,
    limit: 0,
    remaining: 0,
    reset: 0,
  }),
};

export const authRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "ratelimit:auth",
    })
  : noLimit;

export const signUpRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(1, "15 m"),
      analytics: true,
      prefix: "ratelimit:signup",
    })
  : noLimit;
