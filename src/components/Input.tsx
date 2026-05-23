import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean;
}

export function Input({ mono, className = "", ...props }: InputProps) {
  const cls = `field ${mono ? "field-mono" : ""} ${className}`.trim();
  return <input className={cls} {...props} />;
}
