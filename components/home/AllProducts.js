import Link from 'next/link';

// 6 · 查看全部(由原型原样迁移,服务端组件)
export default function AllProducts() {
  return (
    <section className="slab ground grid center" data-label="产品">
      <div className="inner">
        <h2 className="display">查看全部产品线</h2>
        <Link className="btn" href="/#air-carrier">全部产品
          <i className="arrow sm" aria-hidden="true"></i>
        </Link>
      </div>
    </section>
  );
}
