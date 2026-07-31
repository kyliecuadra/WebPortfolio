import WindowChrome from "@/components/ui/WindowChrome";

const STACK_CHIPS = [
  "Java", "Spring Boot", "Hibernate", "Oracle", "Python",
  "YOLO/OpenCV", "PHP", "MySQL", "Azure", "Jenkins", "Git",
];

export default function About() {
  return (
    <section id="about">
      <WindowChrome file="about.md" title="~/kylie/about.md" right="markdown" />
      <div className="win-body md-body">
        <h3>Mission</h3>
        <p>
          Build software that holds up under real usage — enterprise systems that don&apos;t
          buckle under audit, and client tools that keep working after launch day.
        </p>
        <h3>Specializations</h3>
        <ul>
          <li>Enterprise Java/Spring Boot backend systems</li>
          <li>Computer-vision and AI-assisted automation</li>
          <li>Full-stack web platforms (PHP/MySQL, WordPress, Shopify)</li>
        </ul>
        <h3>Current stack</h3>
        <div className="chip-row">
          {STACK_CHIPS.map((t) => (
            <span className="chip" key={t}>{t}</span>
          ))}
        </div>
        <h3>Career path</h3>
        <p>
          Started freelancing in 2019 while completing a BS in Information Technology at
          Cavite State University, then moved into enterprise Java development while
          continuing freelance and AI/CV work on the side — including co-running Bracket
          Systems, a two-person development team.
        </p>
      </div>
    </section>
  );
}
