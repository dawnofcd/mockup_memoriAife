export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span style={{ color: "var(--accent)" }}>/</span> {children}
    </div>
  );
}
