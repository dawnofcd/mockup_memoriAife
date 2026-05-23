import { Logo } from "./Logo";

export function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Logo />
        <div className="nav-links">
          <a href="/docs"><span data-vi>Tài liệu</span><span data-en>Docs</span></a>
        </div>
        <span className="nav-spacer" />
        <div className="nav-right">
          <a href="/buy" className="btn btn-primary" style={{ background: "var(--hot)", borderColor: "var(--hot)" }}>
            <span data-vi>Mua key</span><span data-en>Buy key</span>
          </a>
          <a href="/my" className="btn btn-primary">
            <span data-vi>Đăng nhập</span><span data-en>Sign in</span>
            <span className="arrow" style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
