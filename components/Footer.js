// 12 · 页脚(由原型原样迁移,服务端组件)
export default function Footer() {
  return (
    <footer className="slab dark grid" data-label="联系我们">
      <div className="foot-grid">
        <div>
          <h2 className="foot-big">日常的舒适，<br className="pc" />才是宠物的刚需</h2>
          <p className="foot-en">从一间小作坊开始 · 2001</p>
        </div>
        <div className="foot-cols">
          <div>
            <p className="tbd">中国区地址 · 待补</p>
            <p className="tbd">中国区电话 · 待补</p>
            <p className="tbd">微信公众号 · 待补</p>
          </div>
          <div>
            <span className="tbd">中国区邮箱 · 待补</span><br />
            <a href="#products">产品线</a><br />
            <a href="#capability">能力</a><br />
            <a href="#about">关于我们</a><br />
            <a href="#story">品牌历程</a>
          </div>
        </div>
      </div>
      <div className="foot-rule"></div>
      <div className="foot-legal">
        <span>© 2026 宠适</span>
        <span>隐私政策</span>
        <span>服务条款</span>
        <span>加入我们</span>
      </div>
    </footer>
  );
}
