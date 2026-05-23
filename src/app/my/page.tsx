"use client";

import { useState } from "react";
import {
  DEMO_USAGE,
  DEMO_LOGS,
  DEMO_SUBKEYS,
  DEMO_HISTORY,
  DEMO_CONVERSATIONS,
  MODELS,
  PLANS,
  VND_PER_USD,
} from "@/lib/demo-data";

type Page = "overview" | "keys" | "playground" | "billing" | "docs";

const fmt = (n: number) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
};

export default function DashboardPage() {
  const [page, setPage] = useState<Page>("overview");
  const [sideOpen, setSideOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(true);
  const [apiKey, setApiKey] = useState("");

  const usage = DEMO_USAGE;

  if (!signedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>dashboard</div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
              <span data-vi>Đăng nhập</span><span data-en>Sign in</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>
              <span data-vi>Demo · nhập bất kỳ giá trị nào để vào dashboard.</span>
              <span data-en>Demo · enter any value to access the dashboard.</span>
            </p>
          </div>
          <div className="card sticker">
            <div className="card-h"><span className="accent-dot" /><span>API Key</span></div>
            <div className="card-b" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} onKeyDown={e => e.key === "Enter" && setSignedIn(true)} placeholder="sk-..." className="field field-mono" />
              <button onClick={() => setSignedIn(true)} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <span data-vi>Đăng nhập</span><span data-en>Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const navGroups = [
    { label: { vi: "Workspace", en: "Workspace" }, items: [
      { id: "overview" as Page, vi: "Tổng quan", en: "Overview", icon: "M2 6l5-4 5 4v6H2V6z|M5.5 12V8.5h3V12" },
      { id: "keys" as Page, vi: "API Keys", en: "API Keys", icon: "M4 9a2.4 2.4 0 1 0 0-0.01|M6.3 8L12 2.5M9.5 4.5l1.5 1.5M11 3l1.5 1.5" },
      { id: "playground" as Page, vi: "Playground", en: "Playground", icon: "M4 3l7 4-7 4V3z" },
    ]},
    { label: { vi: "Tài khoản", en: "Account" }, items: [
      { id: "billing" as Page, vi: "Nạp tiền & Hoá đơn", en: "Billing & Invoices", icon: "M7 7a5 5 0 1 0 0-0.01|M7 4v6M5 6h3.5a1 1 0 010 2H5" },
    ]},
    { label: { vi: "Hỗ trợ", en: "Support" }, items: [
      { id: "docs" as Page, vi: "Tài liệu", en: "Docs", icon: "M7 7a5 5 0 1 0 0-0.01|M5.5 5.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5c0 1-1.5 1.2-1.5 2" },
    ]},
  ];

  const balance = usage.credit - usage.totalCost;

  return (
    <div className="app">
      <div className={`side-overlay${sideOpen ? " open" : ""}`} onClick={() => setSideOpen(false)} />
      <aside className={`side${sideOpen ? " open" : ""}`}>
        <div className="side-brand">
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "inherit" }}>
            <svg className="mark" viewBox="0 0 100 100">
              <rect x="10" y="10" width="80" height="80" rx="16" fill="none" stroke="currentColor" strokeWidth="5" />
              <path d="M28 72V36l22 22 22-22v36" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="28" r="4" fill="var(--accent)" />
            </svg>
            <span className="word"><span className="lead">Memor</span><span className="tail">IAI</span></span>
          </a>
        </div>

        <nav className="side-nav">
          {navGroups.map((group, gi) => (
            <div className="nav-group" key={gi}>
              <div className="nav-group-h"><span data-vi>{group.label.vi}</span><span data-en>{group.label.en}</span></div>
              {group.items.map(item => (
                <button key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => { setPage(item.id); setSideOpen(false); }}>
                  <svg className="ic" viewBox="0 0 14 14">
                    <path d={item.icon.split("|")[0]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    {item.icon.split("|")[1] && <path d={item.icon.split("|")[1]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                  <span data-vi>{item.vi}</span><span data-en>{item.en}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="side-foot">
          <div className="credit-pill">
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <div className="av" style={{ width: 26, height: 26, borderRadius: 5, background: "var(--bg-4)", border: "1.5px solid var(--ink)", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700 }}>{usage.userName?.slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{usage.userName}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>{usage.plan.name}</span> · ${Math.max(0, usage.plan.dailyLimit - usage.plan.dailyUsed).toFixed(2)}/<span data-vi>ngày</span><span data-en>day</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
              <span><span data-vi>Pool còn</span><span data-en>Pool left</span></span>
              <span>${balance.toFixed(2)} / ${usage.credit.toFixed(2)}</span>
            </div>
            <div className="pbar"><div className="fill" style={{ width: `${Math.min((balance / Math.max(usage.credit, 1)) * 100, 100)}%` }} /></div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button onClick={() => setPage("billing")} className="topup" style={{ flex: 1 }}>
                <span data-vi>Nạp thêm</span><span data-en>Top up</span>
              </button>
              <button onClick={() => setSignedIn(false)} className="topup" style={{ flex: 1, background: "var(--bg-2)", color: "var(--ink-2)", border: "1.5px solid var(--rule-2)", boxShadow: "none" }}>
                <span data-vi>Đăng xuất</span><span data-en>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="hamburger-btn" onClick={() => setSideOpen(true)}><span></span></button>
          <span className="crumb">
            <span>Dashboard</span>
            <span className="sep">/</span>
            <span className="here">{navGroups.flatMap(g => g.items).find(n => n.id === page)?.en}</span>
          </span>
        </header>

        <div className="scroller">
          <div className="page">
            {page === "overview" && <OverviewTab />}
            {page === "keys" && <KeysTab />}
            {page === "playground" && <PlaygroundTab />}
            {page === "billing" && <BillingTab />}
            {page === "docs" && <DocsTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

function OverviewTab() {
  const usage = DEMO_USAGE;
  const logs = DEMO_LOGS;

  const totalCachedFromLogs = logs.reduce((sum, log) => sum + (log.cachedTokens || 0), 0);
  const totalInputFromLogs = logs.reduce((sum, log) => sum + (log.promptTokens || 0), 0);
  const cachePct = totalInputFromLogs > 0 ? Math.round((totalCachedFromLogs / totalInputFromLogs) * 1000) / 10 : 0;

  const oneMinAgo = new Date(Date.now() - 60000).toISOString();
  const currentRpm = logs.filter(log => log.timestamp >= oneMinAgo).length;

  const modelUsage = logs.reduce((acc, log) => {
    const m = log.model || "unknown";
    if (!acc[m]) acc[m] = { tokens: 0, cost: 0, count: 0 };
    acc[m].tokens += (log.promptTokens || 0) + (log.completionTokens || 0);
    acc[m].cost += log.cost || 0;
    acc[m].count += 1;
    return acc;
  }, {} as Record<string, { tokens: number; cost: number; count: number }>);
  const totalLogTokens = Object.values(modelUsage).reduce((s, v) => s + v.tokens, 0);

  return (
    <>
      <div className="page-head">
        <div className="lhs">
          <h2><span data-vi>Xin chào, {usage.userName}.</span><span data-en>Hello, {usage.userName}.</span></h2>
          <div className="desc">{fmt(usage.totalRequests)} requests · ${usage.totalCost.toFixed(2)} spent · {usage.cache.savingsPercent}% cached</div>
        </div>
      </div>

      <div className="row row-4">
        <div className="kpi">
          <div className="lab"><span data-vi>Requests</span><span data-en>Requests</span></div>
          <div className="val">{fmt(usage.totalRequests)}</div>
          <div className="sub">RPM: {currentRpm}/{usage.rpmLimit}</div>
          <svg className="spark" width="80" height="28" viewBox="0 0 80 28">
            <polyline fill="none" stroke="var(--accent)" strokeWidth="1.4" points="0,22 9,18 18,20 27,14 36,16 45,10 54,12 63,7 72,9 80,4" />
          </svg>
        </div>
        <div className="kpi">
          <div className="lab"><span data-vi>Token đã dùng</span><span data-en>Tokens used</span></div>
          <div className="val">{fmt(usage.totalTokens)}</div>
          <div className="sub"><span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>↓{fmt(usage.inputTokens)} in · ↑{fmt(usage.outputTokens)} out</span></div>
        </div>
        <div className="kpi">
          <div className="lab">⚡ Cache Hit</div>
          <div className="val">{cachePct}<span className="unit">%</span></div>
          <div className="sub">⚡ {fmt(totalCachedFromLogs)} tokens cached</div>
        </div>
        <div className="kpi">
          <div className="lab"><span data-vi>Số dư</span><span data-en>Balance</span></div>
          <div className="val" style={{ fontSize: 20 }}>
            <span style={{ color: "var(--accent)" }}>${Math.max(0, usage.plan.dailyLimit - usage.plan.dailyUsed).toFixed(2)}</span>
            <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}> / ${usage.plan.dailyLimit.toFixed(2)}</span>
          </div>
          <div className="sub" style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
            <span style={{ color: "var(--accent)", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 10 }}>{usage.plan.name} · <span data-vi>hôm nay</span><span data-en>today</span></span>
            <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)", fontSize: 10 }}>+ pool ${(usage.credit - usage.totalCost).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="row row-2" style={{ marginTop: 12 }}>
        <div className="card">
          <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Usage theo model</span><span data-en>Usage by model</span></span></div>
          <div className="card-b flush" style={{ padding: 0 }}>
            <div className="bar-list">
              {Object.entries(modelUsage).sort((a, b) => b[1].tokens - a[1].tokens).map(([model, data]) => {
                const pct = totalLogTokens > 0 ? Math.max(3, (data.tokens / totalLogTokens) * 100) : 0;
                const color = model.includes("opus") ? "var(--pur)" : model.includes("haiku") ? "var(--green)" : "var(--accent)";
                return (
                  <div className="bar-row" key={model}>
                    <div className="nm"><span className="d" style={{ background: color }}></span> {model}</div>
                    <div className="bar"><div className="fill" style={{ width: `${pct}%`, background: color }}></div></div>
                    <div className="v">{data.count} req · ${data.cost.toFixed(3)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Thông tin tài khoản</span><span data-en>Account info</span></span></div>
          <div className="card-b" style={{ padding: 0 }}>
            <div style={{ padding: "6px 14px", background: "var(--bg-3)", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Plan · {usage.plan.name}</span>
            </div>
            <InfoRow label={<><span data-vi>Daily limit</span><span data-en>Daily limit</span></>} value={`$${usage.plan.dailyLimit.toFixed(2)}/day`} />
            <InfoRow label={<><span data-vi>Đã dùng hôm nay</span><span data-en>Used today</span></>} value={`$${usage.plan.dailyUsed.toFixed(2)}`} accent />
            <InfoRow label={<><span data-vi>Plan hết hạn</span><span data-en>Plan expires</span></>} value={new Date(usage.plan.planExpiresAt).toLocaleDateString()} />
            <div style={{ padding: "6px 14px", background: "var(--bg-3)", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-3)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <span data-vi>Pool credit</span><span data-en>Pool credit</span>
              </span>
            </div>
            <InfoRow label={<><span data-vi>Tổng nạp</span><span data-en>Total topped up</span></>} value={`$${usage.credit.toFixed(2)}`} />
            <InfoRow label={<><span data-vi>Đã dùng (pool)</span><span data-en>Used (pool)</span></>} value={`$${usage.totalCost.toFixed(2)}`} accent />
            <InfoRow label="RPM Limit" value={String(usage.rpmLimit)} />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="card">
          <div className="card-h">
            <span className="accent-dot"></span>
            <span className="title"><span data-vi>Request logs</span><span data-en>Request logs</span></span>
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>
              <span data-vi>{logs.length} gần nhất</span><span data-en>Last {logs.length}</span>
            </span>
          </div>
          <div className="card-b flush" style={{ padding: 0, overflowX: "auto", maxHeight: "calc(100vh - 480px)", overflowY: "auto" }}>
            <table className="tbl log-table">
              <thead>
                <tr>
                  <th><span data-vi>Thời gian</span><span data-en>Time</span></th>
                  <th>Model</th>
                  <th className="num">Input</th>
                  <th className="num">Output</th>
                  <th className="num">⚡ Cache</th>
                  <th className="num">Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const isOk = log.status === "success";
                  return (
                    <tr key={log.id}>
                      <td className="mut">{new Date(log.timestamp).toLocaleString()}</td>
                      <td><span className="mchip"><span className="d" style={{ background: log.model.includes("opus") ? "var(--pur)" : log.model.includes("haiku") ? "var(--green)" : "var(--accent)" }}></span> {log.model}</span></td>
                      <td className="num">{log.promptTokens.toLocaleString()}</td>
                      <td className="num">{log.completionTokens.toLocaleString()}</td>
                      <td className="num">{log.cachedTokens ? <span style={{ color: "var(--green)" }}>⚡ {log.cachedTokens.toLocaleString()}</span> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                      <td className="num">{isOk ? `$${log.cost.toFixed(4)}` : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                      <td>{isOk ? <span className="stchip ok">OK</span> : <span className="stchip err">{log.status}</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value, accent }: { label: React.ReactNode; value: string; accent?: boolean }) {
  return (
    <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ? "var(--accent)" : undefined }}>{value}</span>
    </div>
  );
}

function KeysTab() {
  const usage = DEMO_USAGE;
  const subkeys = DEMO_SUBKEYS;
  const maxKeys = 5;
  const [showSubkeys, setShowSubkeys] = useState(true);

  return (
    <>
      <div className="page-head">
        <div className="lhs">
          <h2>API Keys</h2>
          <div className="desc"><span data-vi>Key của bạn để kết nối với API</span><span data-en>Your keys for API access</span></div>
        </div>
      </div>
      <div className="card">
        <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Key chính</span><span data-en>Primary key</span></span></div>
        <div className="card-b" style={{ padding: 0 }}>
          <div className="key-row">
            <div className="lhs">
              <div className="nm">{usage.userName}</div>
              <div className="secret"><code>sk-••••••••••••</code></div>
            </div>
            <div className="meta"><span className="v">{usage.rpmLimit}</span>RPM</div>
            <div className="meta"><span className="v">${usage.credit.toFixed(2)}</span>Credit</div>
            <div className="meta"><span className="v" style={{ color: "var(--accent)" }}>${usage.totalCost.toFixed(2)}</span>Usage</div>
            <div className="meta"><span className="stchip ok">Active</span></div>
          </div>
          <div style={{ padding: "8px 14px", borderTop: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => setShowSubkeys(!showSubkeys)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", transform: showSubkeys ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▶</span>
              <span data-vi>Sub-keys ({subkeys.length})</span><span data-en>Sub-keys ({subkeys.length})</span>
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>{subkeys.length}/{maxKeys}</span>
          </div>
          {showSubkeys && (
            <div style={{ borderTop: "1px solid var(--rule)" }}>
              {subkeys.map(sk => (
                <div className="key-row" key={sk.id} style={{ paddingLeft: 28 }}>
                  <div className="lhs">
                    <div className="nm">{sk.name}</div>
                    <div className="secret"><code>{sk.key.slice(0, 12)}••••••</code></div>
                  </div>
                  <div className="meta"><span className="v" style={{ color: "var(--accent)" }}>${sk.usage.toFixed(4)}</span>Usage</div>
                  <div className="meta"><span className="v">{sk.requests}</span>Reqs</div>
                  <div className="meta"><span className="v">{new Date(sk.createdAt).toLocaleDateString()}</span>Created</div>
                  <div className="meta"><span className="stchip ok">Active</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PlaygroundTab() {
  const [model, setModel] = useState(MODELS[0].id);
  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [maxTokens, setMaxTokens] = useState(1024);
  const [temperature, setTemperature] = useState(0.7);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "user", content: "Demo: Hello, what can you do?" },
    { role: "assistant", content: "(Demo response) This is a static UI demo. The playground is wired up but does not call any real API." },
  ]);

  const send = () => {
    if (!prompt.trim()) return;
    const next = [...messages, { role: "user", content: prompt }, { role: "assistant", content: "(Demo) This is a placeholder response. No API call was made." }];
    setMessages(next);
    setPrompt("");
  };

  const inputTokens = prompt.length / 4 + messages.reduce((s, m) => s + m.content.length / 4, 0);
  const modelData = MODELS.find(m => m.id === model) ?? MODELS[0];
  const estCost = (inputTokens * modelData.inputPrice + maxTokens * modelData.outputPrice) / 1e6;

  return (
    <>
      <div className="page-head">
        <div className="lhs">
          <h2>Playground</h2>
          <div className="desc"><span data-vi>Demo · không gọi API thật</span><span data-en>Demo · no real API calls</span></div>
        </div>
      </div>
      <div className="play-grid">
        <div className="pg-side">
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-h">
              <span className="accent-dot"></span>
              <span className="title"><span data-vi>Hội thoại</span><span data-en>Conversations</span></span>
            </div>
            <div className="card-b" style={{ padding: 0, maxHeight: 132, overflowY: "auto" }}>
              {DEMO_CONVERSATIONS.map(c => (
                <div key={c.id} className="key-row" style={{ padding: "8px 12px", borderBottom: "1px solid var(--rule)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{c.model}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Tham số</span><span data-en>Parameters</span></span></div>
            <div className="card-b" style={{ padding: 0 }}>
              <div className="pg-field">
                <div className="lab"><span data-vi>Mô hình</span><span data-en>Model</span></div>
                <select value={model} onChange={e => setModel(e.target.value)}>
                  {MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="pg-field">
                <div className="lab">temperature</div>
                <div className="slider-row">
                  <input type="range" min="0" max="100" value={Math.round(temperature * 100)} onChange={e => setTemperature(Number(e.target.value) / 100)} />
                  <span className="v">{temperature.toFixed(1)}</span>
                </div>
              </div>
              <div className="pg-field">
                <div className="lab">max_tokens</div>
                <input type="number" value={maxTokens} onChange={e => setMaxTokens(Number(e.target.value) || 1024)} />
              </div>
              <div className="pg-field">
                <div className="lab">System prompt</div>
                <input type="text" value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} placeholder="Optional..." />
              </div>
              <div className="pg-field" style={{ background: "var(--bg-3)" }}>
                <div className="lab"><span data-vi>Chi phí ước tính</span><span data-en>Estimated cost</span></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>${estCost.toFixed(4)}</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", marginTop: 4 }}>in ~{Math.round(inputTokens)} · out ≤ {maxTokens}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pg-main">
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, maxHeight: "calc(100vh - 200px)" }}>
            <div className="card-h">
              <span className="accent-dot"></span>
              <span className="title"><span data-vi>Hội thoại</span><span data-en>Conversation</span></span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, padding: "2px 6px", background: "var(--bg-3)", borderRadius: 3, color: "var(--ink-3)" }}>{model}</span>
            </div>
            <div className="pg-chat">
              {messages.map((msg, i) => (
                <div className={`pg-msg ${msg.role}`} key={i}>
                  <div className="role">{msg.role === "user" ? "User" : `Assistant · ${modelData.name}`}</div>
                  <div className="body">{msg.content}</div>
                </div>
              ))}
            </div>
            <div className="pg-composer">
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Enter to send..." style={{ width: "100%", minHeight: 56, padding: 10, background: "var(--bg-2)", border: "1.5px solid var(--rule-2)", borderRadius: 7, fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink)", resize: "vertical" }} />
              <div className="ctrls">
                <span>{Math.round(inputTokens)} / 200k</span>
                <span className="right">
                  <span data-vi>Enter để gửi</span><span data-en>Enter to send</span>
                  <button className="send" onClick={send} disabled={!prompt.trim()}>↑</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BillingTab() {
  const usage = DEMO_USAGE;
  const history = DEMO_HISTORY;
  const [mode, setMode] = useState<"plan" | "credit">("plan");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(PLANS[1]?.id ?? null);
  const [topupAmount, setTopupAmount] = useState("");

  return (
    <>
      <div className="page-head">
        <div className="lhs">
          <h2><span data-vi>Nạp tiền & Hoá đơn</span><span data-en>Billing & Invoices</span></h2>
        </div>
      </div>
      <div className="row row-split">
        <div className="card">
          <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Số dư</span><span data-en>Balance</span></span></div>
          <div className="card-b" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: "10px 12px", background: "var(--bg-3)", borderRadius: 6 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Plan · {usage.plan.name}
                </span>
                <span style={{ fontSize: 10, color: "var(--ink-3)" }}>
                  {Math.max(0, Math.ceil((new Date(usage.plan.planExpiresAt).getTime() - Date.now()) / 86400000))} <span data-vi>ngày</span><span data-en>days</span>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18 }}>
                  ${Math.max(0, usage.plan.dailyLimit - usage.plan.dailyUsed).toFixed(2)}
                </span>
                <span style={{ fontSize: 11, color: "var(--ink-2)" }}>
                  / ${usage.plan.dailyLimit.toFixed(2)} <span data-vi>hôm nay</span><span data-en>today</span>
                </span>
              </div>
              <div className="pbar" style={{ marginTop: 6, height: 4, background: "var(--bg-2)", borderRadius: 100, overflow: "hidden" }}>
                <div className="fill" style={{ height: "100%", background: "linear-gradient(90deg,var(--green),var(--accent))", width: `${Math.min((usage.plan.dailyUsed / Math.max(usage.plan.dailyLimit, 0.01)) * 100, 100)}%` }} />
              </div>
            </div>
            <div className="kpi" style={{ border: "none", padding: 0, background: "none" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                <span data-vi>Pool credit</span><span data-en>Pool credit</span>
              </div>
              <div className="val">${(usage.credit - usage.totalCost).toFixed(2)}</div>
              <div className="sub">Used: ${usage.totalCost.toFixed(2)} / ${usage.credit.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Mua thêm</span><span data-en>Buy more</span></span></div>
          <div className="card-b" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 4, padding: 3, background: "var(--bg-2)", border: "1.5px solid var(--rule-2)", borderRadius: 6 }}>
              <button type="button" onClick={() => setMode("plan")} className={`btn ${mode === "plan" ? "btn-primary" : "btn-secondary"}`} style={{ flex: 1, justifyContent: "center", padding: "6px", fontSize: 11, border: "none", boxShadow: "none" }}>
                <span data-vi>Mua gói</span><span data-en>Buy plan</span>
              </button>
              <button type="button" onClick={() => setMode("credit")} className={`btn ${mode === "credit" ? "btn-primary" : "btn-secondary"}`} style={{ flex: 1, justifyContent: "center", padding: "6px", fontSize: 11, border: "none", boxShadow: "none" }}>
                <span data-vi>Nạp credit</span><span data-en>Top up</span>
              </button>
            </div>

            {mode === "plan" && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(PLANS.length, 3)}, 1fr)`, gap: 8 }}>
                {PLANS.map((p, idx) => {
                  const active = selectedPlanId === p.id;
                  return (
                    <div key={p.id} role="button" tabIndex={0} onClick={() => setSelectedPlanId(p.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPlanId(p.id); } }} style={{ position: "relative", cursor: "pointer", padding: "10px 8px", borderRadius: 6, background: "var(--bg-2)", border: active ? "2px solid var(--accent)" : "1.5px solid var(--rule-2)", color: "var(--ink)", display: "flex", flexDirection: "column", gap: 4, textAlign: "center", boxShadow: active ? "2px 2px 0 0 var(--ink)" : "none", transform: active ? "translate(-1px,-1px)" : undefined }}>
                      {idx === 1 && (
                        <span style={{ position: "absolute", top: -7, right: 6, fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 700, background: "var(--accent)", color: "var(--accent-ink)", padding: "1px 5px", borderRadius: 2, letterSpacing: "0.05em" }}>HOT</span>
                      )}
                      <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: "var(--ink-2)", fontFamily: "var(--font-mono)" }}>
                        {(p.priceVnd / 1000).toLocaleString("vi-VN")}K · <strong style={{ color: "var(--accent)" }}>${p.creditUsd}/d</strong>
                      </span>
                      <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{p.durationDays}d · {p.rpmLimit}rpm</span>
                      {p.description && (
                        <span style={{ fontSize: 11, color: "var(--ink-2)", lineHeight: 1.4, whiteSpace: "pre-wrap", textAlign: "left", marginTop: 2 }}>{p.description}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {mode === "credit" && (
              <>
                <input type="number" value={topupAmount} onChange={e => setTopupAmount(e.target.value)} placeholder="Tối thiểu 10,000 VNĐ" className="field field-mono" style={{ width: "100%", height: 34, fontSize: 12 }} />
                {Number(topupAmount) >= 10000 && (
                  <div style={{ fontSize: 12, color: "var(--ink-2)", display: "flex", justifyContent: "space-between" }}>
                    <span>Credit:</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent)" }}>${(Number(topupAmount) / VND_PER_USD).toFixed(2)}</span>
                  </div>
                )}
                <p style={{ fontSize: 10, color: "var(--ink-3)", margin: 0, textAlign: "center" }}>
                  <span data-vi>1 USD = {VND_PER_USD.toLocaleString("vi-VN")}₫ · Hạn 7 ngày</span>
                  <span data-en>$1 = {VND_PER_USD.toLocaleString("en-US")}₫ · 7-day expiry</span>
                </p>
              </>
            )}

            <button className="btn btn-primary" style={{ justifyContent: "center", width: "100%" }}>
              <span data-vi>Tạo QR (demo)</span><span data-en>Generate QR (demo)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-h">
          <span className="accent-dot"></span>
          <span className="title"><span data-vi>Lịch sử giao dịch</span><span data-en>Transaction history</span></span>
        </div>
        <div className="card-b flush" style={{ padding: 0 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th><span data-vi>Thời gian</span><span data-en>Time</span></th>
                <th><span data-vi>Loại</span><span data-en>Type</span></th>
                <th className="num"><span data-vi>Số tiền</span><span data-en>Amount</span></th>
                <th><span data-vi>Ghi chú</span><span data-en>Note</span></th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.id}>
                  <td className="mut">{new Date(h.createdAt).toLocaleString()}</td>
                  <td><span className="stchip ok">{h.type === "topup" ? "Top up" : h.type}</span></td>
                  <td className="num">+${h.amount}</td>
                  <td style={{ fontSize: 12, color: "var(--ink-2)" }}>{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-h"><span className="accent-dot"></span><span className="title"><span data-vi>Bảng giá</span><span data-en>Pricing</span></span></div>
        <div className="card-b flush" style={{ padding: 0, overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Model</th><th className="num">Input/MTok</th><th className="num">Output/MTok</th><th className="num">Cache Write/MTok</th><th className="num">Cache Read/MTok</th></tr></thead>
            <tbody>
              {MODELS.map(m => (
                <tr key={m.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{m.name}</td>
                  <td className="num">${m.inputPrice}</td>
                  <td className="num">${m.outputPrice}</td>
                  <td className="num">${m.cacheWritePrice}</td>
                  <td className="num">${m.cacheReadPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function DocsTab() {
  return (
    <>
      <div className="page-head">
        <div className="lhs">
          <h2><span data-vi>Tài liệu</span><span data-en>Documentation</span></h2>
        </div>
      </div>
      <div className="card">
        <div className="card-b" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 32, gap: 12 }}>
          <p style={{ fontSize: 14, color: "var(--ink-2)", textAlign: "center" }}>
            <span data-vi>Xem hướng dẫn chi tiết tại trang tài liệu.</span>
            <span data-en>See detailed setup guides on the docs page.</span>
          </p>
          <a href="/docs" className="btn btn-primary" style={{ justifyContent: "center" }}>
            <span data-vi>Mở trang tài liệu →</span><span data-en>Open docs page →</span>
          </a>
        </div>
      </div>
    </>
  );
}
