import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tmgpqpvbjvrppwpnumcs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "postfiles.pstatic.net",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
