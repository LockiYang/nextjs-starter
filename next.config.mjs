import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 开启严格模式
  swcMinify: false, // 使用swc进行代码压缩
  images: {
    domains: ["avatars.githubusercontent.com"], // 添加github头像服务的域名
  },
};

export default withContentlayer(nextConfig);
