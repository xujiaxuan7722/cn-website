// 产品图到位前的色块占位（沿用原型的 6 幅），按序号循环取用
const ARTS = [
  <>
    <rect width="429" height="530" fill="#cfc5b6" />
    <rect y="372" width="429" height="158" fill="#bdb2a1" /> <rect x="62" y="112" width="196" height="260" fill="#8f8577" />
    <circle cx="318" cy="214" r="66" fill="#e3dbd0" />
  </>,
  <>
    <rect width="429" height="530" fill="#dcc84e" />
    <rect x="246" width="183" height="530" fill="#e8d874" /> <rect x="58" y="196" width="140" height="334" fill="#b9a533" />
    <circle cx="330" cy="150" r="52" fill="#fff5c9" />
  </>,
  <>
    <rect width="429" height="530" fill="#c3cad2" />
    <path d="M0 530 168 244l128 286z" fill="#98a4b0" /> <path d="M206 530 342 300l87 230z" fill="#7d8b99" />
    <circle cx="342" cy="104" r="44" fill="#e6ebf0" />
  </>,
  <>
    <rect width="429" height="530" fill="#b6c2b0" />
    <rect width="429" height="168" fill="#9fae98" /> <circle cx="150" cy="352" r="86" fill="#dfe6db" />
    <rect x="264" y="252" width="130" height="160" fill="#87957f" />
  </>,
  <>
    <rect width="429" height="530" fill="#d4bcab" />
    <rect x="142" width="146" height="530" fill="#c0a692" /> <circle cx="350" cy="390" r="56" fill="#eadfd4" />
    <rect x="34" y="80" width="76" height="76" fill="#b09a86" />
  </>,
  <>
    <rect width="429" height="530" fill="#aab8c2" />
    <path d="M0 530V282l214 74 215-74v248z" fill="#8b9ba8" /> <rect x="176" y="62" width="78" height="78" fill="#dce4ea" />
  </>,
];

export default function PlaceholderArt({ index = 0 }) {
  return (
    <svg viewBox="0 0 429 530" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {ARTS[index % ARTS.length]}
    </svg>
  );
}
