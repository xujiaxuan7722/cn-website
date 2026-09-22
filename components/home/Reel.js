import Link from 'next/link';

// 3 · 品牌片(由原型原样迁移,服务端组件)
export default function Reel() {
  return (
    <section className="slab flush" data-label="品牌">
      <Link className="reel" href="/#air-carrier" aria-label="播放品牌片">
        <svg className="art" viewBox="0 0 1340 712" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="1340" height="712" fill="#121212" />
          <rect x="0" y="470" width="1340" height="242" fill="#1c1c1c" />
          <circle cx="352" cy="300" r="176" fill="#242424" />
          <rect x="838" y="124" width="332" height="332" fill="#1e1e1e" />
          <path d="M838 456h332" stroke="#3a3a3a" strokeWidth="1" />
          <path d="M176 470h1000" stroke="#2e2e2e" strokeWidth="1" />
        </svg>
        <span className="reel-play">
          <span className="ring">
            <svg viewBox="0 0 12 14" width="12" height="14" fill="#fff" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>
          </span>
          观看品牌片
        </span>
      </Link>
    </section>
  );
}
