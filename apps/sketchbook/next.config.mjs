/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  basePath: '/sketchbook-v2',
  output: 'export',
  assetPrefix: '/sketchbook-v2'
};

export default nextConfig;