/** @type {import('next').NextConfig} */
const nextConfig = { distDir: process.env.PORTFOLIO_BUILD_DIR || '.next' };
export default nextConfig;
