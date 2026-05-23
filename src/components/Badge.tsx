const statusMap: Record<string, string> = {
  active: "badge-active",
  inactive: "badge-inactive",
  pending: "badge-pending",
  confirmed: "badge-confirmed",
  expired: "badge-expired",
};

export function Badge({ status, label }: { status: string; label?: string }) {
  const cls = statusMap[status] || "badge-active";
  return <span className={`badge ${cls}`}>{label || status}</span>;
}
