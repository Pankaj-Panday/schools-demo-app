/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://upload.wikimedia.org/**")],
  },
};

export default nextConfig;
