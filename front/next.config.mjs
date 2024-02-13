/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    APIURL: process.env.APIURL ?? 'https://api.semiunarium.frenzoid.dev/api',
  },
};

export default nextConfig;
