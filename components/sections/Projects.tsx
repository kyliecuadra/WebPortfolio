"use client";

import { useState } from "react";
import { GitBranch, ChevronDown, ChevronRight, ExternalLink, Github, FileText } from "lucide-react";
import WindowChrome from "@/components/ui/WindowChrome";
import StatusPill from "@/components/ui/StatusPill";
import { PROJECTS } from "@/data/projects";

interface ProjectsProps {
  expandedId: string | null;
  onExpand: (id: string | null) => void;
}

export default function Projects({ expandedId, onExpand }: ProjectsProps) {
  return (
    <section id="projects">
      <WindowChrome file="projects/" title="~/kylie/projects" right={`${PROJECTS.length} repositories`} />
      <div className="win-body">
        {PROJECTS.map((p) => {
          const isOpen = expandedId === p.id;
          const panelId = `repo-panel-${p.id}`;
          const hasLinks = p.repoUrl || p.liveUrl || p.caseStudyUrl;
          return (
            <div className="repo-row" key={p.id}>
              <button
                type="button"
                className="repo-head"
                onClick={() => onExpand(isOpen ? null : p.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <GitBranch size={15} color="var(--text-faint)" aria-hidden="true" />
                <span className="repo-name">{p.name}</span>
                <span className="repo-file">{p.file}</span>
                <span className="repo-type">{p.type}</span>
                <StatusPill status={p.status} />
                {isOpen ? (
                  <ChevronDown size={16} color="var(--text-faint)" aria-hidden="true" />
                ) : (
                  <ChevronRight size={16} color="var(--text-faint)" aria-hidden="true" />
                )}
              </button>
              {isOpen && (
                <div className="repo-body" id={panelId} role="region" aria-label={`${p.name} details`}>
                  <p style={{ color: "var(--text-dim)", fontSize: 13.5, margin: "10px 0 0" }}>
                    {p.summary}
                  </p>
                  <div className="repo-grid">
                    <div className="repo-block">
                      <div className="repo-block-label">Problem</div>
                      <p>{p.problem}</p>
                    </div>
                    <div className="repo-block">
                      <div className="repo-block-label">Solution</div>
                      <p>{p.solution}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div className="repo-block-label">Role</div>
                    <p style={{ fontSize: 13.5, color: "var(--text-dim)", margin: "4px 0 12px" }}>
                      {p.role}
                    </p>
                    <div className="chip-row">
                      {p.stack.map((s) => (
                        <span className="chip" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                  {hasLinks && (
                    <div className="repo-links">
                      {p.liveUrl && (
                        <a className="repo-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={13} aria-hidden="true" /> Live demo
                        </a>
                      )}
                      {p.repoUrl && (
                        <a className="repo-link" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={13} aria-hidden="true" /> Repository
                        </a>
                      )}
                      {p.caseStudyUrl && (
                        <a className="repo-link" href={p.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                          <FileText size={13} aria-hidden="true" /> Case study
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
