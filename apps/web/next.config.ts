import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@/grove-companion/ui", "@/grove-companion/domain", "@/grove-companion/ai"],
};

export default nextConfig;
