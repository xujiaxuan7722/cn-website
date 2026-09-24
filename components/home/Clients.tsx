// 8 · 合作品牌(由原型原样迁移,服务端组件)
export default function Clients() {
  return (
    <section className="slab paper clients" data-label="合作品牌">
      <div className="stack" data-reveal="">
        <p className="eyebrow">合作品牌</p>
        <h2 className="display">长期为这些品牌做 ODM</h2>
        <p className="lede">自 2011 年起，我们为美国、欧洲和日本的数十个宠物零售品牌供货，靠的是一批一批稳定的品质和交期。</p>
      </div>
      <ul className="client-grid" data-reveal="2">
        <li>K&amp;H</li><li>PETCO</li><li>PETMATE</li><li>TRIXIE</li>
        <li>IRIS</li><li>ZOOPLUS</li><li>RURAL KING</li><li>以及更多</li>
      </ul>
    </section>
  );
}
