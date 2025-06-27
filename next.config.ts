import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alibackend.duckdns.org",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
