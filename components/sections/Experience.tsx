import WindowChrome from "@/components/ui/WindowChrome";
import { EXPERIENCE } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience">
      <WindowChrome file="experience.log" title="~/kylie/experience.log" right="release history" />
      <div className="win-body">
        {EXPERIENCE.map((e) => (
          <div className="log-item" key={e.version}>
            <div className="log-version">{e.version}</div>
            <div>
              <div className="log-title">{e.title}</div>
              <div className="log-org">{e.org} · {e.period}</div>
              <div className="log-detail">{e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
