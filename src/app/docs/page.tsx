"use client";

import { SettingsMockup, TerminalMockup } from "@/components/SettingsMockup";
import { useState } from "react";
import { BASE_URL, MODELS } from "@/lib/demo-data";

type Tab = "quickstart" | "claude-code" | "cursor" | "cline" | "kilo" | "openclaw" | "hermes" | "api";

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "quickstart", label: "Quickstart", icon: "M7 1v4M1 7h4M13 7h-4M7 13V9" },
  { id: "claude-code", label: "Claude Code", icon: "M4 3l-3 4 3 4M10 3l3 4-3 4M8 2L6 12" },
  { id: "cursor", label: "Cursor", icon: "M2 2l10 5-4 1.5L6.5 13z" },
  { id: "cline", label: "Cline", icon: "M3 7h8M3 4h5M3 10h6" },
  { id: "kilo", label: "Kilo", icon: "M3 2v10M7 4v8M11 3v7" },
  { id: "openclaw", label: "OpenClaw", icon: "M7 1a6 6 0 100 12A6 6 0 007 1M4.5 7h5M7 4.5v5" },
  { id: "hermes", label: "Hermes", icon: "M2 12l5-10 5 10M3.5 8h7" },
  { id: "api", label: "API Reference", icon: "M1 4h12M1 7h8M1 10h10" },
];

function ModelList() {
  return (
    <div style={{ border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden", marginTop: 8 }}>
      <div style={{ padding: "8px 12px", background: "var(--bg-3)", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
        {MODELS.length} models available
      </div>
      <div>
        {MODELS.map(m => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", padding: "6px 12px", borderBottom: "1px solid var(--rule)", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--ink-1)", gap: 8 }}>
            <span style={{ flex: 1 }}>{m.id}</span>
            <span style={{ fontSize: 10, color: "var(--ink-3)" }}>{m.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [tab, setTab] = useState<Tab>("quickstart");

  return (
    <section className="section docs-page" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="docs-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
            <span data-vi>tài liệu</span><span data-en>documentation</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em" }}>
            <span data-vi>Hướng dẫn cài đặt</span>
            <span data-en>Setup Guide</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>
            <span data-vi>Cấu hình API key cho các công cụ AI phổ biến.</span>
            <span data-en>Configure your API key for popular AI tools.</span>
          </p>
        </div>

        <div className="docs-layout" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <nav className="docs-nav">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className={`docs-nav-item ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}>
                <svg viewBox="0 0 14 14" style={{ width: 14, height: 14, flexShrink: 0 }}>
                  <path d={item.icon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div style={{ flex: 1, minWidth: 0 }}>
            {tab === "quickstart" && <QuickstartTab />}
            {tab === "claude-code" && <ClaudeCodeTab />}
            {tab === "cursor" && <CursorTab />}
            {tab === "cline" && <ClineTab />}
            {tab === "kilo" && <KiloTab />}
            {tab === "openclaw" && <OpenClawTab />}
            {tab === "hermes" && <HermesTab />}
            {tab === "api" && <ApiTab />}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{title}</h2>
      <p style={{ fontSize: 13, color: "var(--ink-3)" }}>{desc}</p>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--ink-2)" }}>
          <span style={{ width: 20, height: 20, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: 4, background: "var(--bg-3)", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>{i + 1}</span>
          <span style={{ paddingTop: 2 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function CopyValue({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
      <span style={{ fontSize: 12, color: "var(--ink-3)", minWidth: 70 }}>{label}:</span>
      <code style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--accent)", background: "var(--bg-3)", padding: "2px 8px", borderRadius: 4 }}>{value}</code>
    </div>
  );
}

function QuickstartTab() {
  return (
    <>
      <SectionTitle title="Quickstart" desc="3 bước để bắt đầu" />
      <div className="sticker" style={{ padding: 20, background: "var(--bg-2)", marginBottom: 24 }}>
        <Steps items={[
          "Mua key tại trang Buy",
          "Nhận API key trên dashboard",
          "Cấu hình tool — chỉ cần đổi Base URL và API Key",
        ]} />
      </div>

      <div style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 8, padding: 20, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          <span data-vi>Thông tin kết nối</span><span data-en>Connection Info</span>
        </h3>
        <CopyValue label="Base URL" value={BASE_URL} />
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-3)", lineHeight: 1.6 }}>
          <span data-vi>Prompt Caching tự động bật, giảm ~90% chi phí input lặp lại.</span>
          <span data-en>Prompt Caching auto-enabled, ~90% cost reduction on repeated input.</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <ModelList />
        </div>
      </div>
    </>
  );
}

function ClaudeCodeTab() {
  return (
    <>
      <SectionTitle title="Claude Code" desc="Trợ lý AI cho terminal" />
      <div className="doc-prereq">
        <h4><span data-vi>Điều kiện tiên quyết</span><span data-en>Prerequisites</span></h4>
        <ul>
          <li>Node.js 18+</li>
          <li><span data-vi>Terminal</span><span data-en>A terminal</span></li>
          <li><span data-vi>API key</span><span data-en>An API key</span></li>
        </ul>
      </div>

      <h4 className="doc-step-h"><span data-vi>Cấu hình</span><span data-en>Configuration</span></h4>

      <div className="doc-step"><span className="num">1</span><div><strong><span data-vi>Cài đặt Claude Code</span><span data-en>Install Claude Code</span></strong></div></div>
      <TerminalMockup title="Terminal" lines={[
        { text: "npm install -g @anthropic-ai/claude-code", color: "#5eead4" },
      ]} />

      <div className="doc-step"><span className="num">2</span><div><strong><span data-vi>Cấu hình môi trường</span><span data-en>Configure environment</span></strong></div></div>
      <TerminalMockup title="~/.claude/settings.json" lines={[
        { text: "{" },
        { text: `  "env": {` },
        { text: `    "ANTHROPIC_BASE_URL": "${BASE_URL}",`, color: "#5eead4" },
        { text: `    "ANTHROPIC_AUTH_TOKEN": "sk-your-key",`, color: "#5eead4" },
        { text: `    "ANTHROPIC_MODEL": "sonnet-4-6"`, color: "#5eead4" },
        { text: `  }` },
        { text: "}" },
      ]} />

      <div className="doc-step"><span className="num">3</span><div><strong><span data-vi>Khởi chạy</span><span data-en>Launch</span></strong></div></div>
      <TerminalMockup title="Terminal" lines={[
        { text: "cd your-project", dim: true },
        { text: "claude", color: "#5eead4" },
      ]} />

      <h4 className="doc-step-h"><span data-vi>Mô hình</span><span data-en>Models</span></h4>
      <ModelList />
    </>
  );
}

function CursorTab() {
  return (
    <>
      <SectionTitle title="Cursor" desc="AI code editor" />
      <SettingsMockup
        title="Cursor Settings"
        subtitle="Models"
        fields={[
          { label: "OpenAI API Key", value: "sk-your-key", type: "password", highlight: true },
          { label: "Override OpenAI Base URL", value: `${BASE_URL}/v1`, highlight: true },
          { label: "Model", value: "sonnet-4-6", type: "select", highlight: true },
        ]}
      />
      <h4 className="doc-step-h"><span data-vi>Mô hình</span><span data-en>Models</span></h4>
      <ModelList />
    </>
  );
}

function ClineTab() {
  return (
    <>
      <SectionTitle title="Cline" desc="VS Code extension" />
      <SettingsMockup
        title="Cline Settings"
        subtitle="API Configuration"
        fields={[
          { label: "API Provider", value: "Anthropic", type: "select", highlight: true },
          { label: "API Key", value: "sk-your-key", type: "password", highlight: true },
          { label: "Base URL", value: `${BASE_URL}/v1`, highlight: true },
          { label: "Model", value: "sonnet-4-6", type: "select", highlight: true },
        ]}
      />
    </>
  );
}

function KiloTab() {
  return (
    <>
      <SectionTitle title="Kilo Code" desc="VS Code extension" />
      <SettingsMockup
        title="Kilo Code Settings"
        subtitle="Anthropic (Claude)"
        fields={[
          { label: "API Provider", value: "anthropic", type: "select", highlight: true },
          { label: "API Base URL", value: BASE_URL, highlight: true },
          { label: "API Key", value: "sk-your-key", type: "password", highlight: true },
          { label: "Model", value: "sonnet-4-6", type: "select", highlight: true },
        ]}
      />
    </>
  );
}

function OpenClawTab() {
  return (
    <>
      <SectionTitle title="OpenClaw" desc="Agentic coding" />
      <TerminalMockup title="~/.openclaw/config.json" lines={[
        { text: "{" },
        { text: `  "provider": "anthropic",`, color: "#5eead4" },
        { text: `  "baseUrl": "${BASE_URL}",`, color: "#5eead4" },
        { text: `  "apiKey": "sk-your-key",`, color: "#5eead4" },
        { text: `  "model": "sonnet-4-6"`, color: "#5eead4" },
        { text: "}" },
      ]} />
    </>
  );
}

function HermesTab() {
  return (
    <>
      <SectionTitle title="Hermes" desc="AI coding assistant" />
      <SettingsMockup
        title="Hermes Settings"
        subtitle="API Configuration"
        fields={[
          { label: "Provider", value: "Anthropic", type: "select", highlight: true },
          { label: "API Key", value: "sk-your-key", type: "password", highlight: true },
          { label: "Base URL", value: `${BASE_URL}/v1`, highlight: true },
          { label: "Model", value: "opus-4-7", type: "select", highlight: true },
        ]}
      />
    </>
  );
}

function ApiTab() {
  return (
    <>
      <SectionTitle title="API Reference" desc="Endpoints khả dụng" />
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rule)" }}>
              <th style={{ textAlign: "left", padding: "8px 0", color: "var(--ink-3)", fontWeight: 500 }}>Method</th>
              <th style={{ textAlign: "left", padding: "8px 0", color: "var(--ink-3)", fontWeight: 500 }}>Path</th>
              <th style={{ textAlign: "left", padding: "8px 0", color: "var(--ink-3)", fontWeight: 500 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "POST", path: "/v1/messages", desc: "Claude Messages API" },
              { method: "POST", path: "/v1/chat/completions", desc: "OpenAI-compatible chat" },
              { method: "GET", path: "/v1/models", desc: "List available models" },
            ].map((ep) => (
              <tr key={ep.path} style={{ borderBottom: "1px solid var(--rule)" }}>
                <td style={{ padding: "10px 0" }}>
                  <span style={{ padding: "2px 6px", borderRadius: 3, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, background: "var(--bg-3)", color: ep.method === "POST" ? "var(--accent)" : "var(--cy)" }}>{ep.method}</span>
                </td>
                <td style={{ padding: "10px 0", fontFamily: "var(--font-mono)", fontSize: 12 }}>{ep.path}</td>
                <td style={{ padding: "10px 0", color: "var(--ink-2)" }}>{ep.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TerminalMockup
        title="cURL Example"
        lines={[
          { text: `curl ${BASE_URL}/v1/messages \\` },
          { text: `  -H "x-api-key: sk-your-key" \\`, color: "#5eead4" },
          { text: `  -H "content-type: application/json" \\` },
          { text: `  -H "anthropic-version: 2023-06-01" \\` },
          { text: `  -d '{` },
          { text: `    "model": "sonnet-4-6",`, color: "#5eead4" },
          { text: `    "max_tokens": 1024,` },
          { text: `    "messages": [{"role":"user","content":"Hello"}]` },
          { text: `  }'` },
        ]}
      />
    </>
  );
}
