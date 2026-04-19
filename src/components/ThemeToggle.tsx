import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" &&
    (localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches))
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="relative w-10 h-10 rounded-full border border-border bg-card hover:bg-muted transition-all shadow-soft inline-flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-4 h-4 text-highlight" /> : <Moon className="w-4 h-4 text-primary" />}
    </button>
  );
}
