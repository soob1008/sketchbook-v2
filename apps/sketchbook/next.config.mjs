/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  basePath: '/sketchbook',
  output: 'export',
};

export default nextConfig;