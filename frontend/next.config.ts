import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "NEXT_PUBLIC_API_URL is not defined. Falling back to default value: /api"
  );
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
  },
  // more config
};

export default nextConfig;
