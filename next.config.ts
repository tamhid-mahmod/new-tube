import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pptc0dr4d8.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
