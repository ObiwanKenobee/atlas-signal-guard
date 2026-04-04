import { cn } from "@/lib/utils";
import type { Incident } from "@/data/mockData";
import { StatusBadge, SeverityPill, ConfidenceBadge } from "./StatusComponents";
import { MapPin, Clock, User, Link } from "lucide-react";

const typeLabels: Record<string, string> = {
  security_incident: "SECURITY",
  suspicious_movement: "MOVEMENT",
  road_blockage: "ROAD",
  conflict_warning: "CONFLICT",
  water_shortage: "WATER",
  disease_signal: "DISEASE",
  infrastructure_damage: "INFRA",
  market_disruption: "MARKET",
  displacement_movement: "DISPLACEMENT",
};

export function IncidentCard({ incident, onClick, className }: {
  incident: Incident;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "ops-card p-4 cursor-pointer hover:border-primary/40 transition-colors group",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-muted-foreground">{incident.publicRef}</span>
            <span className="text-[10px] font-mono text-primary/70">{typeLabels[incident.type] || incident.type}</span>
          </div>
          <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {incident.title}
          </h3>
        </div>
        <SeverityPill severity={incident.severity} />
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{incident.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {incident.ward}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {new Date(incident.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {incident.corroboratingReports > 0 && (
            <span className="flex items-center gap-1">
              <Link className="w-3 h-3" /> {incident.corroboratingReports}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={incident.status} />
          <ConfidenceBadge score={incident.confidenceScore} />
        </div>
      </div>
    </div>
  );
}
