/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  }
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'canvas']
  //   return config
  // }
}

module.exports = nextConfig
