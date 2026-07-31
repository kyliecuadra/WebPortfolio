"use client";

import { Search, Sun, Moon } from "lucide-react";
import { NAV } from "@/data/nav";

interface TopBarProps {
  active: string;
  theme: "dark" | "light";
  onNavigate: (id: string) => void;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

export default function TopBar({ active, theme, onNavigate, onToggleTheme, onOpenPalette }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brk">&gt;_</span> kylie<span className="brk">.</span>dev
      </div>
      <nav className="topnav" aria-label="Sections">
        {NAV.map((n) => (
          <button
            key={n.id}
            className={`topnav-item ${active === n.id ? "active" : ""}`}
            onClick={() => onNavigate(n.id)}
            aria-current={active === n.id ? "true" : undefined}
          >
            {n.label}
          </button>
        ))}
      </nav>
      <div className="topbar-actions">
        <button className="kbtn" onClick={onOpenPalette} aria-label="Search">
          <Search size={13} /> <span>Search</span> <kbd>⌘K</kbd>
        </button>
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
