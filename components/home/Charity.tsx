// 10 · 公益(由原型原样迁移,服务端组件)
export default function Charity() {
  return (
    <section className="slab flush" data-label="公益">
      <div className="imgaside slab dark" style={{ padding: 0 }}>
        <div className="pic">
          <svg viewBox="0 0 660 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="660" height="560" fill="#744467" />
            <circle cx="250" cy="238" r="146" fill="#8b5580" />
            <rect x="356" y="330" width="230" height="230" fill="#5e3554" />
            <path d="M0 448h660" stroke="#9a6490" strokeWidth="1" />
          </svg>
        </div>
        <div className="copy" data-reveal="">
          <p className="eyebrow">公益 · 宠适之家</p>
          <h2 className="display">给校园里的流浪猫<br className="pc" />一个屋檐</h2>
          <p className="lede">2024 年，20 名同事走访了 60 多所高校，装下 200 多个猫屋；项目支持范围扩展到 318 所校园，并设立了校园基金。2025 年洛杉矶山火期间，我们优先发出 1,000 多个宠物背包和航空箱——每一个里面都附了一张纸条：给小幸存者的新家。</p>
          <div className="stats">
            <div><b className="num">8,500+</b><span>件产品捐出</span></div>
            <div><b className="num">200 万</b><span>美元产品与资金</span></div>
            <div><b className="num">318</b><span>所校园覆盖</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
