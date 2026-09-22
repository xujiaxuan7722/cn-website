/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发服务默认只认 localhost；用 127.0.0.1 打开时热更新通道会被拦，这里放行
  allowedDevOrigins: ['127.0.0.1'],
  // 开发工具图标默认在左下角，正好压住书脊上的菜单按钮；右下角现在是「顶部」按钮，所以放右上
  devIndicators: { position: 'top-right' },
};

export default nextConfig;
