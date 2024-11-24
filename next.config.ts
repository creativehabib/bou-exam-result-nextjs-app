import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ...
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'osapsnew.bou.ac.bd',
          port: '',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'result.bou.ac.bd',
          port: '',
          pathname: '/**'
        }
    ]
  }
  // ...
};

export default nextConfig;
