/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DBHOST: process.env.DBHOST,
  },
};

export default nextConfig;
