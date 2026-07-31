"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import WindowChrome from "@/components/ui/WindowChrome";

type DeployState = "idle" | "deploying" | "success";

export default function Contact() {
  const [deployState, setDeployState] = useState<DeployState>("idle");

  function handleDeploy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDeployState("deploying");
    // Replace with a real submit handler (API route, email service, etc).
    setTimeout(() => setDeployState("success"), 1100);
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
          <div className="deploy-success">
            <CheckCircle2 size={18} /> Deployment successful — I&apos;ll respond within 24 hours.
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleDeploy}>
            <div className="field">
              <label>Project type</label>
              <select required defaultValue="">
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
              <select required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Under ₱5,000</option>
                <option>₱5,000 – ₱10,000</option>
                <option>₱11,000 – ₱25,000</option>
                <option>Let&apos;s discuss</option>
              </select>
            </div>
            <div className="field">
              <label>Timeline</label>
              <select required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>ASAP</option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>Flexible</option>
              </select>
            </div>
            <div className="field">
              <label>Contact email</label>
              <input type="email" required placeholder="you@company.com" />
            </div>
            <div className="field full">
              <label>Requirements</label>
              <textarea required placeholder="What are you building?" />
            </div>
            <div className="field full">
              <button className="btn btn-primary" type="submit" disabled={deployState === "deploying"}>
                <Send size={14} />
                {deployState === "deploying" ? "Deploying…" : "Deploy message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
