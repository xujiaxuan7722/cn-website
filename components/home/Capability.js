// 7 · 能力(由原型原样迁移,服务端组件)
export default function Capability() {
  return (
    <section className="slab dark grid" id="capability" data-label="能力">
      <div className="c-head stack" data-reveal="">
        <p className="eyebrow">能力</p>
        <h2 className="display">从研发到出货，<br className="pc" />全程在自己手里</h2>
      </div>
      <div className="c-aside" data-reveal="2">
        <p className="lede">我们不是设计公司外包给工厂，也不是工厂顺带做设计。一支团队把产品从第一块泡沫模型带到第一个整柜——所以图纸在模具车间站得住，排期在港口也站得住。</p>
        <p style={{ marginTop: 28 }}>
          <a className="tlink" href="#contact">谈谈你的项目
            <i className="arrow sm" aria-hidden="true"></i>
          </a>
        </p>
      </div>
      <div className="services">
        <div data-reveal="">
          <h3>研发与设计</h3>
          <p>结构设计、外观与 CMF、打样、定制开发</p>
        </div>
        <div data-reveal="2">
          <h3>自有制造</h3>
          <p>木作、缝制、金属三类工厂，一体化生产</p>
        </div>
        <div data-reveal="3">
          <h3>交付与服务</h3>
          <p>十个海外仓发货，3–7 个工作日送达，30 天试用</p>
        </div>
      </div>
    </section>
  );
}
