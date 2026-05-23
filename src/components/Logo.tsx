export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? 24 : 30;
  return (
    <a href="/" className="logo-lockup">
      <svg className="mark" style={{ width: s, height: s }} viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="16" fill="none" stroke="currentColor" strokeWidth="5"/>
        <path d="M28 72V36l22 22 22-22v36" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="50" cy="28" r="4" fill="var(--accent)"/>
      </svg>
      <span className="word"><span className="lead">Memor</span><span className="tail">IAI</span></span>
    </a>
  );
}
