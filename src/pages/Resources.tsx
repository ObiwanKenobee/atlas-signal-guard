import { resources } from "@/data/mockData";
import { ResourceStockCard } from "@/components/ops/ResourceStockCard";
import { StatCard } from "@/components/ops/StatusComponents";
import { AlertTriangle } from "lucide-react";

export default function Resources() {
  const critical = resources.filter(r => r.quantity <= r.minThreshold);
  const ok = resources.filter(r => r.quantity > r.minThreshold);
  const categories = Array.from(new Set(resources.map(r => r.category)));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Resource Dashboard</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{resources.length} TRACKED ITEMS • {critical.length} BELOW THRESHOLD</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="TOTAL ITEMS" value={resources.length} />
        <StatCard label="CRITICAL" value={critical.length} variant="danger" />
        <StatCard label="CATEGORIES" value={categories.length} />
        <StatCard label="ORGANIZATIONS" value={Array.from(new Set(resources.map(r => r.organization))).length} />
      </div>

      {critical.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertTriangle className="w-4 h-4" /> Below Minimum Threshold
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {critical.map(r => <ResourceStockCard key={r.id} resource={r} />)}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">All Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ok.map(r => <ResourceStockCard key={r.id} resource={r} />)}
        </div>
      </div>
    </div>
  );
}
