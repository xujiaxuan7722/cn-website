import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 开发服务默认只认 localhost；用 127.0.0.1 打开时热更新通道会被拦，这里放行
  // 局域网内其他机器用 192.168.66.112:3200 打开时，热更新通道也要放行
  // 本机是 DHCP，IP 会变（09-22 是 192.168.66.112，09-23 有线 192.168.88.97、无线 sunnypet 192.168.88.186），变了就把新地址加进来
  allowedDevOrigins: ['127.0.0.1', '192.168.66.112', '192.168.88.97', '192.168.88.186'],
  // 开发工具图标默认在左下角，正好压住书脊上的菜单按钮；右下角现在是「顶部」按钮，所以放右上
  devIndicators: { position: 'top-right' },
};

export default nextConfig;
