import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow server actions when running behind a reverse proxy (e.g. code.claude.com preview).
      // Next.js checks Origin vs Host; listing allowed proxy origins prevents the CSRF block.
      allowedOrigins: [
        "*.claude.com",
        "claude.com",
        "applemigration.com.au",
        "www.applemigration.com.au",
        "localhost:3000",
        "localhost:3001",
      ],
    },
  },
};

export default nextConfig;
