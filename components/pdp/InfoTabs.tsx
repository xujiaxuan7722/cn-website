'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

export interface InfoTab {
  id: string;
  label: string;
  body: ReactNode;
}

// 深色信息区：居中一组胶囊分页（产品详情 / 规格参数），下面切换内容。
// 三页内容都在 HTML 里（隐藏的用 hidden），搜索引擎能读到全部
export default function InfoTabs({ tabs }: { tabs: InfoTab[] }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="pd-info-in">
      <div className="pd-tabs" role="tablist" aria-label="产品信息">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`pdtab-${t.id}`}
            aria-controls={`pdpanel-${t.id}`}
            aria-selected={i === cur}
            tabIndex={i === cur ? 0 : -1}
            className={i === cur ? 'is-on' : undefined}
            onClick={() => setCur(i)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
              const n = (cur + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
              setCur(n);
              document.getElementById(`pdtab-${tabs[n].id}`)?.focus();
            }}
          >{t.label}</button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`pdpanel-${t.id}`} aria-labelledby={`pdtab-${t.id}`} className="pd-panel" hidden={i !== cur}>
          {t.body}
        </div>
      ))}
    </div>
  );
}
