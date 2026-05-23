import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-bottom">
          <span data-vi>© 2026 MemorIAI · UI demo</span>
          <span data-en>© 2026 MemorIAI · UI demo</span>
          <div className="links">
            <a href="/docs"><span data-vi>Tài liệu</span><span data-en>Docs</span></a>
            <a href="/my">Dashboard</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
