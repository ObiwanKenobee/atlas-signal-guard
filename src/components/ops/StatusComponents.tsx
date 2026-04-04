import { cn } from "@/lib/utils";
import type { Severity, IncidentStatus, AlertSeverity } from "@/data/mockData";

// ========== STATUS BADGE ==========
const statusStyles: Record<string, string> = {
  new: "bg-primary/20 text-primary border-primary/30",
  investigating: "bg-warning/20 text-warning border-warning/30",
  verified: "bg-success/20 text-success border-success/30",
  disputed: "bg-destructive/20 text-destructive border-destructive/30",
  resolved: "bg-muted text-muted-foreground border-border",
  false_report: "bg-muted text-muted-foreground border-border line-through",
  active: "bg-primary/20 text-primary border-primary/30",
  acknowledged: "bg-warning/20 text-warning border-warning/30",
  escalated: "bg-destructive/20 text-destructive border-destructive/30",
  dismissed: "bg-muted text-muted-foreground border-border",
  assigned: "bg-primary/20 text-primary border-primary/30",
  in_progress: "bg-warning/20 text-warning border-warning/30",
  blocked: "bg-destructive/20 text-destructive border-destructive/30",
  completed: "bg-success/20 text-success border-success/30",
  closed: "bg-muted text-muted-foreground border-border",
  // Actor statuses
  deployed: "bg-warning/20 text-warning border-warning/30",
  standby: "bg-muted text-muted-foreground border-border",
  offline: "bg-destructive/20 text-destructive border-destructive/30",
  // Facility statuses
  operational: "bg-success/20 text-success border-success/30",
  degraded: "bg-warning/20 text-warning border-warning/30",
  non_operational: "bg-destructive/20 text-destructive border-destructive/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border",
      statusStyles[status] || "bg-muted text-muted-foreground border-border",
      className
    )}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ========== SEVERITY PILL ==========
const severityStyles: Record<Severity | AlertSeverity, string> = {
  critical: "bg-destructive/20 text-destructive border-destructive/40",
  high: "bg-warning/20 text-warning border-warning/40",
  medium: "bg-primary/20 text-primary border-primary/40",
  low: "bg-muted text-muted-foreground border-border",
};

export function SeverityPill({ severity, className }: { severity: Severity | AlertSeverity; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border",
      severityStyles[severity],
      className
    )}>
      {severity}
    </span>
  );
}

// ========== CONFIDENCE BADGE ==========
function getConfidenceColor(score: number) {
  if (score >= 80) return "text-confidence-high border-confidence-high/40 bg-confidence-high/10";
  if (score >= 60) return "text-confidence-medium border-confidence-medium/40 bg-confidence-medium/10";
  if (score >= 30) return "text-primary border-primary/40 bg-primary/10";
  return "text-confidence-low border-confidence-low/40 bg-confidence-low/10";
}

function getConfidenceLabel(score: number) {
  if (score >= 80) return "VERIFIED";
  if (score >= 60) return "LIKELY";
  if (score >= 30) return "UNCONFIRMED";
  return "LOW CONF";
}

export function ConfidenceBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-mono tracking-wider",
      getConfidenceColor(score),
      className
    )}>
      <span className="font-bold">{score}</span>
      <span className="opacity-70">{getConfidenceLabel(score)}</span>
    </span>
  );
}

// ========== RISK SCORE TILE ==========
function getRiskColor(score: number) {
  if (score >= 70) return "text-destructive";
  if (score >= 40) return "text-warning";
  return "text-success";
}

function getRiskBg(score: number) {
  if (score >= 70) return "bg-destructive/10";
  if (score >= 40) return "bg-warning/10";
  return "bg-success/10";
}

export function RiskScoreTile({ label, score, className }: { label: string; score: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 p-2 rounded", getRiskBg(score), className)}>
      <span className={cn("text-lg font-mono font-bold", getRiskColor(score))}>{score}</span>
      <span className="text-operational">{label}</span>
    </div>
  );
}

// ========== SYNC STATUS INDICATOR ==========
export function SyncStatusIndicator({ online = true }: { online?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className={cn(
        "w-2 h-2 rounded-full",
        online ? "bg-success animate-pulse-slow" : "bg-destructive"
      )} />
      <span className="text-muted-foreground">
        {online ? "ONLINE" : "OFFLINE — LOCAL MODE"}
      </span>
    </div>
  );
}

// ========== STAT CARD ==========
export function StatCard({ label, value, trend, variant = "default" }: {
  label: string;
  value: string | number;
  trend?: string;
  variant?: "default" | "warning" | "danger" | "success";
}) {
  const variantStyles = {
    default: "border-border",
    warning: "border-warning/30",
    danger: "border-destructive/30",
    success: "border-success/30",
  };
  const valueStyles = {
    default: "text-foreground",
    warning: "text-warning",
    danger: "text-destructive",
    success: "text-success",
  };

  return (
    <div className={cn("ops-card p-4 flex flex-col gap-1", variantStyles[variant])}>
      <span className="text-operational">{label}</span>
      <span className={cn("text-2xl font-mono font-bold", valueStyles[variant])}>{value}</span>
      {trend && <span className="text-xs text-muted-foreground">{trend}</span>}
    </div>
  );
}
