"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS, VND_PER_USD, BANK_PLACEHOLDER } from "@/lib/demo-data";

type Step = "choose" | "paying" | "success";
type Mode = "plan" | "credit";

const DEMO_QR = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#fff"/>
  <g fill="#111">
    ${Array.from({ length: 25 * 25 }).map((_, i) => {
      const x = (i % 25) * 8;
      const y = Math.floor(i / 25) * 8;
      const seed = (i * 9301 + 49297) % 233280;
      return seed % 100 < 45 ? `<rect x="${x}" y="${y}" width="8" height="8"/>` : "";
    }).join("")}
  </g>
  <rect x="0" y="0" width="56" height="56" fill="none" stroke="#fff" stroke-width="8"/>
  <rect x="6" y="6" width="44" height="44" fill="#fff"/>
  <rect x="14" y="14" width="28" height="28" fill="#111"/>
  <rect x="20" y="20" width="16" height="16" fill="#fff"/>
  <rect x="24" y="24" width="8" height="8" fill="#111"/>
  <rect x="144" y="0" width="56" height="56" fill="none" stroke="#fff" stroke-width="8"/>
  <rect x="150" y="6" width="44" height="44" fill="#fff"/>
  <rect x="158" y="14" width="28" height="28" fill="#111"/>
  <rect x="164" y="20" width="16" height="16" fill="#fff"/>
  <rect x="168" y="24" width="8" height="8" fill="#111"/>
  <rect x="0" y="144" width="56" height="56" fill="none" stroke="#fff" stroke-width="8"/>
  <rect x="6" y="150" width="44" height="44" fill="#fff"/>
  <rect x="14" y="158" width="28" height="28" fill="#111"/>
  <rect x="20" y="164" width="16" height="16" fill="#fff"/>
  <rect x="24" y="168" width="8" height="8" fill="#111"/>
</svg>
`);

export default function BuyPage() {
  const [step, setStep] = useState<Step>("choose");
  const [mode, setMode] = useState<Mode>("plan");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(PLANS[1]?.id ?? null);
  const [customAmount, setCustomAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const orderCode = "DEMO" + Date.now().toString().slice(-6);
  const planObj = mode === "plan" ? PLANS.find(p => p.id === selectedPlanId) : null;
  const selectedAmount = planObj ? planObj.priceVnd : Math.round(Number(customAmount));
  const creditAmount = planObj ? planObj.creditUsd : Number(customAmount) / VND_PER_USD;
  const newKey = "sk-demo-aaaa-bbbb-cccc-dddd";

  const pay = () => {
    if (!userName.trim()) { setError("Vui lòng nhập tên"); return; }
    if (mode === "plan") {
      if (!selectedPlanId) { setError("Vui lòng chọn gói"); return; }
    } else {
      const amt = Math.round(Number(customAmount));
      if (!amt || amt < 10000) { setError("Số tiền tối thiểu 10,000 VNĐ"); return; }
    }
    setError("");
    setStep("paying");
  };

  const reset = () => {
    setStep("choose");
    setError("");
  };

  if (step === "success") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 500 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", margin: "0 auto 16px", fontSize: 24, color: "var(--accent-ink)", fontWeight: 700 }}>&#10003;</div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
              <span data-vi>Thanh toán thành công!</span>
              <span data-en>Payment successful!</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>
              <span data-vi>(Demo) API key đã sẵn sàng sử dụng.</span>
              <span data-en>(Demo) Your API key is ready to use.</span>
            </p>
          </div>

          <div className="card sticker" style={{ marginBottom: 20 }}>
            <div className="card-h"><span className="accent-dot" /><span className="title">API Key</span></div>
            <div className="card-b">
              <p style={{ fontSize: 12, color: "var(--hot)", marginBottom: 8, fontWeight: 600 }}>
                <span data-vi>Lưu key này ngay — sẽ không hiện lại!</span>
                <span data-en>Save this key now — it won&apos;t be shown again!</span>
              </p>
              <code style={{ display: "block", padding: 12, background: "var(--bg-3)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 13, wordBreak: "break-all", color: "var(--accent)" }}>{newKey}</code>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/my" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              <span data-vi>Vào Dashboard</span><span data-en>Go to Dashboard</span>
            </Link>
            <button onClick={reset} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
              <span data-vi>Thử lại</span><span data-en>Try again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "paying") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em" }}>
              <span data-vi>Quét QR để thanh toán</span>
              <span data-en>Scan QR to pay</span>
            </h1>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
              <span data-vi>(Demo · QR là ảnh placeholder)</span>
              <span data-en>(Demo · QR is a placeholder)</span>
            </p>
          </div>

          <div className="card sticker" style={{ textAlign: "center" }}>
            <div className="card-h"><span className="accent-dot" /><span className="title"><span data-vi>Thanh toán</span><span data-en>Payment</span></span></div>
            <div className="card-b">
              <img src={DEMO_QR} alt="QR" style={{ width: 220, height: 220, margin: "0 auto 16px", borderRadius: 8 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, textAlign: "left" }}>
                <Row label={<><span data-vi>Số tiền</span><span data-en>Amount</span></>} value={`${selectedAmount.toLocaleString()} VNĐ`} />
                <Row label="Credit" value={`$${creditAmount.toFixed(2)}`} accent />
                <Row label={<><span data-vi>Ngân hàng</span><span data-en>Bank</span></>} value={BANK_PLACEHOLDER.bankName} />
                <Row label={<><span data-vi>Số TK</span><span data-en>Account</span></>} value={BANK_PLACEHOLDER.accountNumber} />
                <Row label={<><span data-vi>Chủ TK</span><span data-en>Name</span></>} value={BANK_PLACEHOLDER.accountName} />
              </div>
              <div style={{ marginTop: 14, padding: 10, background: "var(--bg-3)", borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
                  <span data-vi>Nội dung CK</span><span data-en>Transfer note</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{orderCode}</div>
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                <span style={{ fontSize: 12, color: "var(--ink-2)" }}>
                  <span data-vi>Đang chờ thanh toán... (demo)</span>
                  <span data-en>Waiting for payment... (demo)</span>
                </span>
              </div>
              <button onClick={() => setStep("success")} className="btn btn-primary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
                <span data-vi>Mô phỏng đã thanh toán →</span>
                <span data-en>Simulate paid →</span>
              </button>
            </div>
          </div>

          <button onClick={reset} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
            <span data-vi>Huỷ</span><span data-en>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
            <span data-vi>mua key</span><span data-en>buy key</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
            <span data-vi>Tạo API key mới</span>
            <span data-en>Create new API key</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>
            <span data-vi>Demo UI · không có thanh toán thật.</span>
            <span data-en>UI demo · no real payment.</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bg-2)", border: "1.5px solid var(--rule-2)", borderRadius: 8, marginBottom: 16 }}>
          <button type="button" onClick={() => { setMode("plan"); setError(""); setCustomAmount(""); }} className={`btn ${mode === "plan" ? "btn-primary" : "btn-secondary"}`} style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 13, border: "none", boxShadow: "none" }}>
            <span data-vi>Mua gói (28 ngày)</span><span data-en>Buy plan (28 days)</span>
          </button>
          <button type="button" onClick={() => { setMode("credit"); setError(""); setSelectedPlanId(null); }} className={`btn ${mode === "credit" ? "btn-primary" : "btn-secondary"}`} style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 13, border: "none", boxShadow: "none" }}>
            <span data-vi>Nạp credit (theo VNĐ)</span><span data-en>Top up credit (per VND)</span>
          </button>
        </div>

        {mode === "plan" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16, paddingTop: 12 }}>
            {PLANS.map((p, idx) => {
              const isMid = idx === 1;
              const isSelected = selectedPlanId === p.id;
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => { setSelectedPlanId(p.id); setError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPlanId(p.id); setError(""); } }}
                  className="sticker"
                  style={{
                    textAlign: "left",
                    padding: 0,
                    border: isSelected ? "2px solid var(--accent)" : "1.5px solid var(--rule-2)",
                    background: "var(--bg-2)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: 8,
                    overflow: "visible",
                    transform: isSelected ? "translate(-1px,-1px)" : undefined,
                    boxShadow: isSelected ? "3px 3px 0 0 var(--ink)" : undefined,
                  }}
                >
                  {isMid && (
                    <div style={{ position: "absolute", top: -10, left: 12, fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", background: "var(--accent)", color: "var(--accent-ink)", padding: "3px 8px", borderRadius: 3, zIndex: 2, whiteSpace: "nowrap", border: "1.5px solid var(--ink)", boxShadow: "1px 1px 0 0 var(--ink)" }}>
                      <span data-vi>Phổ biến</span><span data-en>Popular</span>
                    </div>
                  )}
                  <div className="card-h" style={{ padding: "10px 14px" }}>
                    <span className="accent-dot" />
                    <span className="title" style={{ fontWeight: 700, color: "var(--ink)" }}>{p.name}</span>
                  </div>
                  <div className="card-b" style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>{(p.priceVnd / 1000).toLocaleString("vi-VN")}K</span>
                      <span style={{ fontSize: 12, color: "var(--ink-2)" }}>VNĐ</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 14 }}>${p.creditUsd}</strong>
                      <span>/<span data-vi>ngày</span><span data-en>day</span></span>
                      <span style={{ color: "var(--ink-3)" }}> · {p.durationDays} <span data-vi>ngày</span><span data-en>days</span></span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-2)", fontFamily: "var(--font-mono)" }}>
                      RPM: <strong style={{ color: "var(--ink)" }}>{p.rpmLimit}</strong>
                    </div>
                    {p.description && (
                      <p style={{ fontSize: 12, color: "var(--ink-2)", margin: 0, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{p.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="card sticker">
          <div className="card-h">
            <span className="accent-dot" />
            <span className="title">
              {mode === "plan"
                ? <><span data-vi>Thông tin gói</span><span data-en>Plan details</span></>
                : <><span data-vi>Số tiền nạp</span><span data-en>Top up amount</span></>}
            </span>
          </div>
          <div className="card-b" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, display: "block" }}>
                <span data-vi>Tên hiển thị</span><span data-en>Display name</span>
              </label>
              <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Tên của bạn..." className="field" style={{ width: "100%" }} />
            </div>

            {mode === "credit" && (
              <>
                <div>
                  <label style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, display: "block" }}>
                    <span data-vi>Số tiền (VNĐ)</span><span data-en>Amount (VND)</span>
                  </label>
                  <input type="number" value={customAmount} onChange={e => setCustomAmount(e.target.value)} placeholder="100000" className="field field-mono" style={{ width: "100%" }} />
                </div>
                {Number(customAmount) >= 10000 && (
                  <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid var(--rule)" }}>
                    <span style={{ color: "var(--ink-2)" }}><span data-vi>Bạn nhận</span><span data-en>You get</span></span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>${(Number(customAmount) / VND_PER_USD).toFixed(2)}</span>
                  </div>
                )}
                <p style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", margin: 0 }}>
                  <span data-vi>Tỷ giá: <strong>1 USD = {VND_PER_USD.toLocaleString("vi-VN")}₫</strong> · Hạn 7 ngày.</span>
                  <span data-en>Rate: <strong>$1 = {VND_PER_USD.toLocaleString("en-US")}₫</strong> · 7-day expiry.</span>
                </p>
              </>
            )}

            {mode === "plan" && planObj && (
              <div style={{ padding: "10px 12px", background: "var(--bg-3)", borderRadius: 6, fontSize: 13, display: "flex", flexDirection: "column", gap: 4 }}>
                <Row label={<><span data-vi>Gói</span><span data-en>Plan</span></>} value={planObj.name} />
                <Row label={<><span data-vi>Phải trả</span><span data-en>You pay</span></>} value={`${planObj.priceVnd.toLocaleString("vi-VN")} VNĐ`} />
                <Row label={<><span data-vi>Bạn nhận</span><span data-en>You get</span></>} value={`$${planObj.creditUsd}/day · ${planObj.durationDays}d · ${planObj.rpmLimit}rpm`} accent />
              </div>
            )}

            {error && <p style={{ color: "var(--hot)", fontSize: 13, margin: 0 }}>{error}</p>}
            <button onClick={pay} disabled={mode === "plan" ? !selectedPlanId : Number(customAmount) < 10000} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <span data-vi>Thanh toán →</span>
              <span data-en>Pay now →</span>
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--ink-3)" }}>
          <span data-vi>Đây là bản demo UI — không xử lý thanh toán thật.</span>
          <span data-en>This is a UI demo — no real payment is processed.</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: React.ReactNode; value: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "var(--ink-3)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: accent ? "var(--accent)" : undefined }}>{value}</span>
    </div>
  );
}
