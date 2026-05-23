import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", href, children, className = "", ...props }: ButtonProps) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${className}`.trim();

  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }

  return <button className={cls} {...props}>{children}</button>;
}
