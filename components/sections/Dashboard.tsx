import { Terminal, FolderGit2 } from "lucide-react";
import WindowChrome from "@/components/ui/WindowChrome";
import StatusPill from "@/components/ui/StatusPill";
import { PROFILE } from "@/data/profile";

export default function Dashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section id="dashboard">
      <WindowChrome file="dashboard.tsx" title="~/kylie/dashboard" right="ln 1, col 1" />
      <div className="win-body">
        <div className="dash-hero">
          <div className="dash-main">
            <StatusPill status="available" />
            <h1 style={{ marginTop: 14 }}>{PROFILE.headline}</h1>
            <p>{PROFILE.sub}</p>
            <div className="dash-cta">
              <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
                <Terminal size={14} /> Start a project
              </button>
              <button className="btn btn-ghost" onClick={() => onNavigate("projects")}>
                <FolderGit2 size={14} /> View projects
              </button>
            </div>
          </div>
          <div className="stat-panel">
            <div className="stat-row">
              <span className="stat-label">Location</span>
              <span className="stat-value">{PROFILE.location}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Current focus</span>
              <span className="stat-value">Enterprise insurance systems</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Core stack</span>
              <span className="stat-value">Java · Spring · Python</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Team</span>
              <span className="stat-value">Bracket Systems (w/ Prince Macalino)</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Response time</span>
              <span className="stat-value">~24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
