import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.prod.website-files.com/**")],
  },
};

export default nextConfig;
