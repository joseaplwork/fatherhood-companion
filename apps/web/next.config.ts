import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@fatherhood-companion/ui",
    "@fatherhood-companion/domain",
    "@fatherhood-companion/ai",
  ],
};

export default nextConfig;
