import { alerts } from "@/data/mockData";
import { AlertCard } from "@/components/ops/AlertCard";
import { StatCard } from "@/components/ops/StatusComponents";
import { Bell } from "lucide-react";

export default function Alerts() {
  const active = alerts.filter(a => a.status === "active");
  const acknowledged = alerts.filter(a => a.status === "acknowledged");
  const other = alerts.filter(a => !["active", "acknowledged"].includes(a.status));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Alerts Center</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{alerts.length} TOTAL ALERTS • {active.length} ACTIVE</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="ACTIVE" value={active.length} variant="danger" />
        <StatCard label="ACKNOWLEDGED" value={acknowledged.length} variant="warning" />
        <StatCard label="ESCALATED" value={alerts.filter(a => a.status === "escalated").length} variant="danger" />
        <StatCard label="DISMISSED" value={alerts.filter(a => a.status === "dismissed").length} />
      </div>

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-destructive flex items-center gap-2">
            <Bell className="w-4 h-4" /> Active Alerts
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {active.map(a => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      )}

      {acknowledged.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-warning">Acknowledged</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {acknowledged.map(a => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      )}

      {other.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Other</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {other.map(a => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      )}
    </div>
  );
}
