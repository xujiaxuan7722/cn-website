// 结构化数据（JSON-LD）。把 < 转义掉，防止数据里出现 </script> 提前闭合标签
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
