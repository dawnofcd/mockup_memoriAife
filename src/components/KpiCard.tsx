export function KpiCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="kpi">
      <div className="kpi-val">{accent ? <span className="accent">{value}</span> : value}</div>
      <div className="kpi-lab">{label}</div>
    </div>
  );
}
