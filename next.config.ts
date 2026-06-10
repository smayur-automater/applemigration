import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow Server Actions when the site is reached via apex or www
      // (covers host-rewriting proxies/redirects between the two).
      allowedOrigins: ["applemigration.com.au", "www.applemigration.com.au"],
    },
  },
};

export default nextConfig;
