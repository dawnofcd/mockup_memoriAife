"use client";

import { useState } from "react";

interface Field {
  label: string;
  value: string;
  type?: "text" | "password" | "select";
  options?: string[];
  highlight?: boolean;
}

interface SettingsMockupProps {
  title: string;
  subtitle?: string;
  fields: Field[];
  style?: "vscode" | "app";
}

export function SettingsMockup({ title, subtitle, fields, style = "vscode" }: SettingsMockupProps) {
  return (
    <div className="mockup">
      <div className="mockup-titlebar">
        <div className="dots">
          <span className="dot r" /><span className="dot y" /><span className="dot g" />
        </div>
        <span className="title">{title}</span>
        {subtitle && <span className="sub">{subtitle}</span>}
      </div>
      <div className="mockup-body">
        {fields.map((field, i) => (
          <div className="mockup-field" key={i}>
            <label>{field.label}</label>
            {field.type === "select" ? (
              <div className={`mockup-select ${field.highlight ? "hl" : ""}`}>
                <span>{field.value}</span>
                <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
            ) : (
              <div className={`mockup-input ${field.type === "password" ? "masked" : ""} ${field.highlight ? "hl" : ""}`}>
                <span>{field.type === "password" ? "•".repeat(Math.min(field.value.length, 20)) : field.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TerminalMockup({ title, lines }: { title: string; lines: { text: string; color?: string; dim?: boolean }[] }) {
  return (
    <div className="mockup terminal">
      <div className="mockup-titlebar">
        <div className="dots">
          <span className="dot r" /><span className="dot y" /><span className="dot g" />
        </div>
        <span className="title">{title}</span>
      </div>
      <div className="mockup-body mono">
        {lines.map((line, i) => (
          <div key={i} className={`term-line ${line.dim ? "dim" : ""}`} style={line.color ? { color: line.color } : undefined}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
