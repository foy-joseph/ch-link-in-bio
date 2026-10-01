import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.prod.website-files.com/**"), new URL("https://*.public.blob.vercel-storage.com/**")],
  },
};

export default nextConfig;
