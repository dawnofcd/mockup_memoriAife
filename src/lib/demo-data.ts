/**
 * Mock data for the UI demo. Replace with real API calls in production.
 */

export type Plan = {
  id: string;
  name: string;
  priceVnd: number;
  creditUsd: number;
  durationDays: number;
  rpmLimit: number;
  description: string | null;
};

export type ModelData = {
  id: string;
  name: string;
  provider: string;
  inputPrice: number;
  outputPrice: number;
  cacheReadPrice: number;
  cacheWritePrice: number;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceVnd: 99000,
    creditUsd: 1.5,
    durationDays: 28,
    rpmLimit: 30,
    description:
      "- Truy cập Sonnet 4.6\n- Cache hit tối ưu\n- Hỗ trợ qua chat",
  },
  {
    id: "pro",
    name: "Pro",
    priceVnd: 299000,
    creditUsd: 6,
    durationDays: 28,
    rpmLimit: 60,
    description:
      "- Truy cập tất cả model có trên service\n- 99.9% Uptime SLA\n- Bảng Điều Khiển Phân Tích Nâng Cao\n- Support 24/7",
  },
  {
    id: "max",
    name: "Max",
    priceVnd: 799000,
    creditUsd: 18,
    durationDays: 28,
    rpmLimit: 120,
    description:
      "- Quota Opus rộng rãi\n- Endpoint dành riêng\n- SLA 99.95%\n- Invoice VAT",
  },
];

export const MODELS: ModelData[] = [
  { id: "sonnet-4-6", name: "Sonnet 4.6", provider: "anthropic", inputPrice: 3, outputPrice: 15, cacheReadPrice: 0.3, cacheWritePrice: 3.75 },
  { id: "opus-4-6", name: "Opus 4.6", provider: "anthropic", inputPrice: 5, outputPrice: 25, cacheReadPrice: 0.5, cacheWritePrice: 6.25 },
  { id: "opus-4-7", name: "Opus 4.7", provider: "anthropic", inputPrice: 5, outputPrice: 25, cacheReadPrice: 0.5, cacheWritePrice: 6.25 },
  { id: "haiku-4-5", name: "Haiku 4.5", provider: "anthropic", inputPrice: 0.8, outputPrice: 4, cacheReadPrice: 0.08, cacheWritePrice: 1 },
];

export const VND_PER_USD = 25000;

export const DEMO_USAGE = {
  userName: "demo-user",
  totalTokens: 1_245_300,
  inputTokens: 832_100,
  outputTokens: 413_200,
  totalRequests: 482,
  totalCost: 2.74,
  poolUsedBilled: 2.74,
  credit: 12,
  rpmLimit: 60,
  expiresAt: new Date(Date.now() + 21 * 86400000).toISOString(),
  billingPriority: "plan" as "plan" | "pool",
  plan: {
    id: "pro",
    name: "Pro",
    dailyLimit: 6,
    dailyUsed: 1.82,
    planExpiresAt: new Date(Date.now() + 21 * 86400000).toISOString(),
  },
  cache: { cachedTokens: 612_000, cacheCreationTokens: 88_400, savingsPercent: 73 },
};

export const DEMO_LOGS = Array.from({ length: 32 }).map((_, i) => {
  const modelOptions = ["sonnet-4-6", "opus-4-6", "haiku-4-5"];
  const model = modelOptions[i % modelOptions.length];
  const promptTokens = 1200 + ((i * 137) % 4000);
  const completionTokens = 300 + ((i * 91) % 1500);
  const cachedTokens = i % 3 === 0 ? Math.round(promptTokens * 0.4) : 0;
  const cost =
    (promptTokens * 3 + completionTokens * 15) / 1_000_000 +
    (cachedTokens * 0.3) / 1_000_000;
  return {
    id: i + 1,
    timestamp: new Date(Date.now() - i * 4 * 60000).toISOString(),
    model,
    promptTokens,
    completionTokens,
    cachedTokens,
    cost,
    status: i % 17 === 0 ? "500" : "success",
    endpoint: "/v1/messages",
  };
});

export const DEMO_SUBKEYS = [
  { id: "k1", key: "sk-demo-aaaa-bbbb", name: "laptop", isActive: 1, createdAt: new Date(Date.now() - 8 * 86400000).toISOString(), usage: 0.84, requests: 142 },
  { id: "k2", key: "sk-demo-cccc-dddd", name: "ci-bot", isActive: 1, createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), usage: 0.31, requests: 58 },
];

export const DEMO_HISTORY = [
  { id: 1, type: "topup", amount: 6, note: "Plan Pro · 28d", createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: 2, type: "topup", amount: 4, note: "Pool credit", createdAt: new Date(Date.now() - 14 * 86400000).toISOString() },
];

export const DEMO_CONVERSATIONS = [
  { id: 1, title: "Refactor auth middleware", model: "sonnet-4-6", updatedAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 2, title: "Explain JWT verification", model: "opus-4-7", updatedAt: new Date(Date.now() - 26 * 3600000).toISOString() },
];

export const BASE_URL = "https://api.example.com";
export const SUPPORT_LABEL = "Support";
export const BANK_PLACEHOLDER = {
  bankName: "Bank Name",
  accountNumber: "0000000000",
  accountName: "Account Holder",
};
