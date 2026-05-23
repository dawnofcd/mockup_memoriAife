export function Card({
  title,
  badge,
  flush,
  children,
}: {
  title?: string;
  badge?: React.ReactNode;
  flush?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      {title && (
        <div className="card-h">
          <span className="accent-dot" />
          <span className="title">{title}</span>
          {badge && <span className="right">{badge}</span>}
        </div>
      )}
      <div className={flush ? "card-b flush" : "card-b"}>{children}</div>
    </div>
  );
}
