import { tasks } from "@/data/mockData";
import { StatusBadge, SeverityPill, StatCard } from "@/components/ops/StatusComponents";
import { ListTodo, Clock } from "lucide-react";

export default function Tasking() {
  const byStatus = (s: string) => tasks.filter(t => t.status === s);
  const columns = [
    { label: "NEW", status: "new", items: byStatus("new") },
    { label: "ASSIGNED", status: "assigned", items: byStatus("assigned") },
    { label: "IN PROGRESS", status: "in_progress", items: byStatus("in_progress") },
    { label: "COMPLETED", status: "completed", items: byStatus("completed") },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Response Tasking</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{tasks.length} TASKS</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="NEW" value={byStatus("new").length} />
        <StatCard label="ASSIGNED" value={byStatus("assigned").length} variant="warning" />
        <StatCard label="IN PROGRESS" value={byStatus("in_progress").length} variant="success" />
        <StatCard label="COMPLETED" value={byStatus("completed").length} />
      </div>

      {/* Kanban-style board */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.status} className="space-y-2">
            <h3 className="text-operational flex items-center gap-2">
              {col.label}
              <span className="text-xs font-mono text-foreground">{col.items.length}</span>
            </h3>
            {col.items.map(task => (
              <div key={task.id} className="ops-card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{task.id}</span>
                  <SeverityPill severity={task.priority} />
                </div>
                <h4 className="text-sm text-foreground mb-2">{task.title}</h4>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>→ {task.assignedTo}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(task.dueAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {col.items.length === 0 && (
              <div className="ops-card p-4 text-center text-xs text-muted-foreground">No tasks</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
