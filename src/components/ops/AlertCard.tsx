import { cn } from "@/lib/utils";
import type { Alert } from "@/data/mockData";
import { StatusBadge, SeverityPill } from "./StatusComponents";
import { AlertTriangle, MapPin, Clock, ArrowRight } from "lucide-react";

const categoryIcons: Record<string, string> = {
  security: "🔴",
  humanitarian: "🟡",
  health: "🟠",
  logistics: "🔵",
};

export function AlertCard({ alert, className }: { alert: Alert; className?: string }) {
  return (
    <div className={cn("ops-card p-4", className)}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span>{categoryIcons[alert.category] || "⚪"}</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">{alert.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <SeverityPill severity={alert.severity} />
          <StatusBadge status={alert.status} />
        </div>
      </div>

      <h3 className="text-sm font-medium text-foreground mb-2">{alert.title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{alert.triggerExplanation}</p>

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
        <MapPin className="w-3 h-3" />
        <span>{alert.affectedArea}</span>
        <span className="text-border">|</span>
        <span>{alert.relatedIncidents} linked incidents</span>
      </div>

      <div className="bg-muted/50 rounded p-2 flex items-start gap-2">
        <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
        <span className="text-xs text-secondary-foreground">{alert.recommendedAction}</span>
      </div>
    </div>
  );
}
