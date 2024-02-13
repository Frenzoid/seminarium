/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    APIURL: process.env.APIURL ?? 'https://semiunarium.frenzoid.dev/api',
  },
};

export default nextConfig;
