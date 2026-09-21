// 4 · 我们做什么(由原型原样迁移,服务端组件)
export default function About() {
  return (
    <section className="slab paper grid" id="about" data-label="我们做什么">
      <div className="c-left stack" data-reveal="">
        <p className="eyebrow">我们做什么</p>
        <h2 className="display">把工厂开在<br className="pc" />设计室隔壁</h2>
        <p className="lede">宠物用品最容易出问题的地方，从来不是长得好不好看，而是图纸到模具之间那一段。我们的做法是把这一段收回自己手里：2005 年起自建木作、缝制、金属三类工厂，从单一贸易转为研发、制造、销售一体。</p>
        <a className="tlink" href="#capability">了解我们的能力
          <i className="arrow sm" aria-hidden="true"></i>
        </a>
      </div>

      <div className="c-rows">
        <div className="iconlist">
          <div className="iconrow" data-reveal="2">
            <svg className="ico" viewBox="0 0 72 72" aria-hidden="true">
              <path d="M10 22h52M10 22v28M62 22v28M10 50h52M22 22v10M36 22v14M50 22v10" />
            </svg>
            <div className="item">
              <h3 className="display-sm">从源头造</h3>
              <p className="lede">木作、缝制、金属三类工厂都是自有的。控住生产的起点，质量标准才能在每一道工序上都成立，而不是到验货那天才发现。</p>
            </div>
          </div>
          <div className="iconrow" data-reveal="3">
            <svg className="ico" viewBox="0 0 72 72" aria-hidden="true">
              <ellipse cx="36" cy="36" rx="26" ry="17" />
              <circle cx="36" cy="36" r="17" />
              <circle cx="36" cy="36" r="2.2" fill="currentColor" stroke="none" />
            </svg>
            <div className="item">
              <h3 className="display-sm">被二十年验证过的标准</h3>
              <p className="lede">自 2011 年起，我们为美国、欧洲和日本的数十个宠物零售品牌做 ODM。别人的品控标准，我们一条一条走过来。</p>
            </div>
          </div>
          <div className="iconrow" data-reveal="4">
            <svg className="ico" viewBox="0 0 72 72" aria-hidden="true">
              <path d="M36 9 61 23v28L36 65 11 51V23z" />
              <path d="M36 37 61 23M36 37v28M36 37 11 23" />
            </svg>
            <div className="item">
              <h3 className="display-sm">室内和户外是两套标准</h3>
              <p className="lede">一张猫爬架和一只徒步背包，受的力完全不是一回事。我们按宠物真实待着的场景分开定标准，不拿一套规范套到底。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
