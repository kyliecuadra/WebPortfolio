"use client";

import { useEffect, useMemo, useRef } from "react";
import { Command, ChevronRight, GitBranch, X } from "lucide-react";
import { NAV } from "@/data/nav";
import { PROJECTS } from "@/data/projects";

interface CommandPaletteProps {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onSelectProject: (id: string) => void;
}

export default function CommandPalette({
  open,
  query,
  onQueryChange,
  onClose,
  onNavigate,
  onSelectProject,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { nav: NAV, proj: [] as typeof PROJECTS };
    return {
      nav: NAV.filter((n) => n.label.includes(q)),
      proj: PROJECTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div
        className="palette"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="palette-input-row">
          <Command size={15} color="var(--text-faint)" aria-hidden="true" />
          <input
            ref={inputRef}
            placeholder="Jump to a section or project…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search sections and projects"
          />
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={14} />
          </button>
        </div>
        <div className="palette-results">
          {results.nav.length > 0 && (
            <>
              <div className="palette-group-label">Sections</div>
              {results.nav.map((n) => (
                <button type="button" className="palette-item" key={n.id} onClick={() => onNavigate(n.id)}>
                  <ChevronRight size={13} color="var(--text-faint)" aria-hidden="true" /> {n.label}
                  <span className="pi-sub">{n.file}</span>
                </button>
              ))}
            </>
          )}
          {results.proj.length > 0 && (
            <>
              <div className="palette-group-label">Projects</div>
              {results.proj.map((p) => (
                <button type="button" className="palette-item" key={p.id} onClick={() => onSelectProject(p.id)}>
                  <GitBranch size={13} color="var(--text-faint)" aria-hidden="true" /> {p.name}
                  <span className="pi-sub">{p.type}</span>
                </button>
              ))}
            </>
          )}
          {results.nav.length === 0 && results.proj.length === 0 && (
            <div style={{ padding: 16, color: "var(--text-faint)", fontFamily: "var(--mono)", fontSize: 13 }}>
              No matches.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
