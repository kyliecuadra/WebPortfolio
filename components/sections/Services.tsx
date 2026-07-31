import WindowChrome from "@/components/ui/WindowChrome";
import { SERVICES } from "@/data/services";

export default function Services() {
  return (
    <section id="services">
      <WindowChrome file="services.http" title="~/kylie/services.http" right="API reference" />
      <div className="win-body">
        {SERVICES.map((s) => (
          <div className="svc-row" key={s.path}>
            <span className="svc-method">{s.method}</span>
            <div>
              <div className="svc-path">{s.path}</div>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
