/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HUGGINGFACE_API_TOKEN: process.env.HUGGINGFACE_API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     HUGGINGFACE_API_TOKEN: process.env.HUGGINGFACE_API_TOKEN
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'fonts.gstatic.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   domains: ['fonts.googleapis.com'],
// };

// export default nextConfig;
