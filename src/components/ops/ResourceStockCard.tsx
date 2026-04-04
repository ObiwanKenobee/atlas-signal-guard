import { cn } from "@/lib/utils";
import type { Resource } from "@/data/mockData";
import { SeverityPill } from "./StatusComponents";
import { AlertTriangle, TrendingDown } from "lucide-react";

export function ResourceStockCard({ resource, className }: { resource: Resource; className?: string }) {
  const pct = Math.round((resource.quantity / (resource.minThreshold * 3)) * 100);
  const isBelowThreshold = resource.quantity <= resource.minThreshold;
  const daysLeft = resource.dailyConsumption > 0
    ? Math.round(resource.quantity / resource.dailyConsumption)
    : null;

  return (
    <div className={cn(
      "ops-card p-4",
      isBelowThreshold && "border-destructive/40",
      className
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="text-sm font-medium text-foreground">{resource.name}</h4>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">{resource.category}</span>
        </div>
        <SeverityPill severity={resource.criticality} />
      </div>

      <div className="mb-3">
        <div className="flex items-end justify-between mb-1">
          <span className={cn(
            "text-xl font-mono font-bold",
            isBelowThreshold ? "text-destructive" : "text-foreground"
          )}>
            {resource.quantity.toLocaleString()}
          </span>
          <span className="text-[11px] text-muted-foreground">{resource.unit}</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isBelowThreshold ? "bg-destructive" : pct > 60 ? "bg-success" : "bg-warning"
            )}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">Min: {resource.minThreshold.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground">{resource.dailyConsumption}/day</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{resource.location}</span>
        {daysLeft !== null && (
          <span className={cn(
            "flex items-center gap-1 font-mono",
            daysLeft <= 5 ? "text-destructive" : daysLeft <= 10 ? "text-warning" : "text-muted-foreground"
          )}>
            {daysLeft <= 5 && <AlertTriangle className="w-3 h-3" />}
            {daysLeft}d remaining
          </span>
        )}
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">{resource.organization}</div>
    </div>
  );
}
