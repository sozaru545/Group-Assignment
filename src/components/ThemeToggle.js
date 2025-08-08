// components/ThemeToggle.js
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const getPreferred = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getPreferred);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Optional: live update if OS theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <button onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle color theme">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
