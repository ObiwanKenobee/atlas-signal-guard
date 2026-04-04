import { actors, tasks } from "@/data/mockData";
import { StatusBadge, SeverityPill } from "@/components/ops/StatusComponents";
import { Users, Radio, MapPin } from "lucide-react";

const typeLabels: Record<string, string> = {
  military: "🔴 Military",
  county_office: "🏛 County Office",
  ngo: "🟢 NGO",
  community_leader: "👤 Community Leader",
  logistics: "📦 Logistics",
  security_post: "🛡 Security Post",
};

export default function Coordination() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Coordination Board</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{actors.length} ACTORS • {tasks.length} ACTIVE TASKS</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Actors */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4" /> Active Actors
          </h2>
          <div className="space-y-2">
            {actors.map(actor => (
              <div key={actor.id} className="ops-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{actor.name}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground">{typeLabels[actor.type] || actor.type}</span>
                  </div>
                  <StatusBadge status={actor.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {actor.area}</div>
                  <div className="flex items-center gap-1"><Radio className="w-3 h-3" /> {actor.contactChannel}</div>
                  <div>{actor.organization}</div>
                  <div>{actor.activeTasks} active tasks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Response Tasks</h2>
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="ops-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{task.id}</span>
                  <div className="flex gap-1">
                    <SeverityPill severity={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">{task.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>→ {task.assignedTo}</span>
                  <span>Due: {new Date(task.dueAt).toLocaleDateString()}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Linked: {task.linkedIncident}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
