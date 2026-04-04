import { stats, incidents, alerts, areaRisks, tasks, resources } from "@/data/mockData";
import { StatCard, RiskScoreTile, SeverityPill, StatusBadge, ConfidenceBadge } from "@/components/ops/StatusComponents";
import { IncidentCard } from "@/components/ops/IncidentCard";
import { AlertCard } from "@/components/ops/AlertCard";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const recentIncidents = incidents.slice(0, 4);
  const activeAlerts = alerts.filter(a => a.status === "active").slice(0, 2);
  const criticalResources = resources.filter(r => r.quantity <= r.minThreshold);
  const topRisks = [...areaRisks].sort((a, b) => Math.max(b.conflict, b.waterStress, b.disease) - Math.max(a.conflict, a.waterStress, a.disease)).slice(0, 4);
  const urgentTasks = tasks.filter(t => t.priority === "critical" || t.priority === "high").slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Command Dashboard</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            MANDERA COUNTY • {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
            {" "} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EAT
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono">LAST SYNC: 2 MIN AGO</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard label="ACTIVE INCIDENTS" value={stats.activeIncidents} variant="warning" />
        <StatCard label="VERIFIED" value={stats.verifiedSignals} variant="success" />
        <StatCard label="UNVERIFIED" value={stats.unverifiedSignals} variant="default" />
        <StatCard label="ACTIVE ALERTS" value={stats.activeAlerts} variant="danger" />
        <StatCard label="OPEN TASKS" value={stats.openTasks} variant="default" />
        <StatCard label="SHORTAGES" value={stats.criticalShortages} variant="danger" />
        <StatCard label="DEPLOYED UNITS" value={stats.deployedActors} variant="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent incidents */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent Incidents</h2>
            <button onClick={() => navigate("/incidents")} className="text-xs text-primary hover:underline font-mono">VIEW ALL →</button>
          </div>
          <div className="space-y-2">
            {recentIncidents.map(inc => (
              <IncidentCard key={inc.id} incident={inc} onClick={() => navigate(`/incidents/${inc.id}`)} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Active alerts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Active Alerts</h2>
              <button onClick={() => navigate("/alerts")} className="text-xs text-primary hover:underline font-mono">VIEW ALL →</button>
            </div>
            {activeAlerts.map(alt => (
              <AlertCard key={alt.id} alert={alt} />
            ))}
          </div>

          {/* Risk overview */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Area Risk Overview</h2>
            <div className="ops-card p-3 space-y-2">
              {topRisks.map(risk => (
                <div key={risk.location} className="flex items-center gap-2">
                  <span className="text-xs text-foreground w-24 truncate">{risk.location}</span>
                  <div className="flex-1 grid grid-cols-5 gap-1">
                    <RiskScoreTile label="CON" score={risk.conflict} className="p-1 text-center" />
                    <RiskScoreTile label="H2O" score={risk.waterStress} className="p-1 text-center" />
                    <RiskScoreTile label="DIS" score={risk.disease} className="p-1 text-center" />
                    <RiskScoreTile label="ACC" score={risk.access} className="p-1 text-center" />
                    <RiskScoreTile label="LOG" score={risk.logistics} className="p-1 text-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical shortages */}
          {criticalResources.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-destructive">⚠ Critical Shortages</h2>
              {criticalResources.map(r => (
                <div key={r.id} className="ops-card p-3 border-destructive/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{r.name}</span>
                    <span className="text-sm font-mono text-destructive font-bold">{r.quantity} {r.unit}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{r.location} • {r.organization}</span>
                </div>
              ))}
            </div>
          )}

          {/* Urgent tasks */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Urgent Tasks</h2>
            {urgentTasks.map(t => (
              <div key={t.id} className="ops-card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                  <div className="flex gap-1">
                    <SeverityPill severity={t.priority} />
                    <StatusBadge status={t.status} />
                  </div>
                </div>
                <p className="text-sm text-foreground">{t.title}</p>
                <span className="text-[10px] text-muted-foreground">→ {t.assignedTo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
