"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import CommandPalette from "@/components/layout/CommandPalette";
import Dashboard from "@/components/sections/Dashboard";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { PROJECTS } from "@/data/projects";

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("dashboard");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedProject, setExpandedProject] = useState<string | null>(PROJECTS[0].id);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Register section elements for scroll-to-navigate, after each render.
  useEffect(() => {
    document.querySelectorAll("main section[id]").forEach((el) => {
      sectionRefs.current[el.id] = el as HTMLElement;
    });
  });

  function goTo(id: string) {
    setActive(id);
    setPaletteOpen(false);
    setQuery("");
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectProject(id: string) {
    setExpandedProject(id);
    goTo("projects");
  }

  return (
    <div className={`platform ${theme}`}>
      <div className="grid-bg" />

      <TopBar
        active={active}
        theme={theme}
        onNavigate={goTo}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="content">
        <Dashboard onNavigate={goTo} />
        <About />
        <Stack />
        <Projects expandedId={expandedProject} onExpand={setExpandedProject} />
        <Experience />
        <Services />
        <Contact />
      </main>

      <div className="footer">
        © {new Date().getFullYear()} Kylie Cuadra · built as a working software platform, not a template
      </div>

      <CommandPalette
        open={paletteOpen}
        query={query}
        onQueryChange={setQuery}
        onClose={() => setPaletteOpen(false)}
        onNavigate={goTo}
        onSelectProject={selectProject}
      />
    </div>
  );
}
