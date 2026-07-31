type Status = "production" | "concept" | "available";

const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
  production: { label: "production", cls: "pill-green" },
  concept: { label: "concept", cls: "pill-amber" },
  available: { label: "available for freelance", cls: "pill-green" },
};

export default function StatusPill({ status }: { status: Status }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.production;
  return (
    <span className={`pill ${s.cls}`}>
      <span className="pill-dot" />
      {s.label}
    </span>
  );
}
