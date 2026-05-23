"use client";

import { useEffect, useState } from "react";

export function FloatControls() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("vi");

  useEffect(() => {
    const savedTheme = localStorage.getItem("fc-theme") || "light";
    const savedLang = localStorage.getItem("fc-lang") || "vi";
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-lang", savedLang);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fc-theme", next);
  };

  const toggleLang = () => {
    const next = lang === "vi" ? "en" : "vi";
    setLang(next);
    document.documentElement.setAttribute("data-lang", next);
    localStorage.setItem("fc-lang", next);
  };

  return (
    <div className="float-controls">
      <button className="ctrl-pill" onClick={toggleLang}>
        {lang === "vi" ? "VI" : "EN"}
        <span style={{ opacity: 0.5 }}>/</span>
        {lang === "vi" ? "EN" : "VI"}
      </button>
      <button className="ctrl-pill" onClick={toggleTheme}>
        <span className="dot" />
        {theme === "light" ? (
          <><span data-vi>Sáng</span><span data-en>Light</span></>
        ) : (
          <><span data-vi>Tối</span><span data-en>Dark</span></>
        )}
      </button>
    </div>
  );
}
