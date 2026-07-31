"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import WindowChrome from "@/components/ui/WindowChrome";

type DeployState = "idle" | "deploying" | "success" | "error";

export default function Contact() {
  const [deployState, setDeployState] = useState<DeployState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDeploy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDeployState("deploying");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      projectType: data.get("projectType"),
      budget: data.get("budget"),
      timeline: data.get("timeline"),
      email: data.get("email"),
      requirements: data.get("requirements"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setDeployState("error");
        return;
      }

      setDeployState("success");
      form.reset();
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setDeployState("error");
    }
  }

  return (
    <section id="contact">
      <WindowChrome file="contact.sh" title="~/kylie/contact.sh" right="deploy console" />
      <div className="win-body">
        <div className="console">
          <div className="console-line"><span className="prompt">$</span>init --new-project</div>
          <div className="console-line"><span className="prompt">$</span>fill out the form below to deploy a message</div>
        </div>

        {deployState === "success" ? (
          <div className="deploy-success" role="status" aria-live="polite">
            <CheckCircle2 size={18} aria-hidden="true" /> Deployment successful — I&apos;ll respond within 24 hours.
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleDeploy}>
            {/* Honeypot: hidden from real users, bots tend to fill every field they find */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="field">
              <label htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Enterprise backend</option>
                <option>AI / computer vision</option>
                <option>Full-stack web app</option>
                <option>Consulting / code review</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Budget</label>
              <select id="budget" name="budget" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Under ₱5,000</option>
                <option>₱5,000 – ₱10,000</option>
                <option>₱11,000 – ₱20,000</option>
                <option>Let&apos;s discuss</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <select id="timeline" name="timeline" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>ASAP</option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>Flexible</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="email">Contact email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="field full">
              <label htmlFor="requirements">Requirements</label>
              <textarea id="requirements" name="requirements" required placeholder="What are you building?" />
            </div>

            {deployState === "error" && errorMessage && (
              <div className="field full">
                <div className="deploy-error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" /> {errorMessage}
                </div>
              </div>
            )}

            <div className="field full">
              <button className="btn btn-primary" type="submit" disabled={deployState === "deploying"}>
                <Send size={14} aria-hidden="true" />
                {deployState === "deploying" ? "Deploying…" : "Deploy message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
