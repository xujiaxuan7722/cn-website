// 11 · 历程(由原型原样迁移,服务端组件)
export default function Story() {
  return (
    <section className="slab paper grid" id="story" data-label="品牌历程">
      <div className="c-head stack" data-reveal="">
        <p className="eyebrow">品牌历程</p>
        <h2 className="display">二十余年，<br className="pc" />我们把路走成了什么样</h2>
      </div>
      <div className="cards">
        <a className="card" href="#story" data-reveal="">
          <span className="meta num">2026</span>
          <h4>厦门、福州机场的公益广告上线</h4>
          <span className="small">把校园关怀计划放进高曝光、低打扰的场所，让更多人看见。</span>
        </a>
        <a className="card" href="#story" data-reveal="2">
          <span className="meta num">2016</span>
          <h4>三千封没人要求写的感谢信</h4>
          <span className="small">没有活动也没有奖励，社群成员自发写来 3,000 多封手写和电子信件。</span>
        </a>
        <a className="card" href="#story" data-reveal="3">
          <span className="meta num">2013</span>
          <h4>宠适品牌诞生</h4>
          <span className="small">从 2001 年的一间小作坊，到自有品牌走向全球市场。</span>
        </a>
      </div>
    </section>
  );
}
