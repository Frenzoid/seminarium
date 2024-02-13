/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    APIURL: process.env.APIURL ?? 'http://localhost:3001/api',
  },
};

export default nextConfig;
