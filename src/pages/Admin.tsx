import { StatusBadge } from "@/components/ops/StatusComponents";
import { Settings, Users, Shield, Bell, FileText, Radio, Database } from "lucide-react";

const mockUsers = [
  { name: "Abdi Mohamed", role: "Operations Commander", status: "active", lastSeen: "2 min ago" },
  { name: "Fatuma Wario", role: "Humanitarian Coordinator", status: "active", lastSeen: "5 min ago" },
  { name: "Hassan Omar", role: "Field Reporter", status: "active", lastSeen: "12 min ago" },
  { name: "Dr. Amina Wario", role: "Verifier / Analyst", status: "active", lastSeen: "8 min ago" },
  { name: "Osman Ali", role: "County Administrator", status: "offline", lastSeen: "2 hours ago" },
  { name: "System Admin", role: "System Admin", status: "active", lastSeen: "now" },
];

const roles = [
  { name: "Field Reporter", count: 12, permissions: "Submit reports, view local data" },
  { name: "Verifier / Analyst", count: 4, permissions: "Score, merge, validate signals" },
  { name: "Operations Commander", count: 2, permissions: "Assign tasks, view sensitive layers" },
  { name: "Humanitarian Coordinator", count: 3, permissions: "Manage resources, response status" },
  { name: "County Administrator", count: 2, permissions: "County-wide view, policy actions" },
  { name: "System Admin", count: 1, permissions: "Full system access, user management" },
];

export default function Admin() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Admin Console</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">SYSTEM MANAGEMENT</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "Users", value: mockUsers.length },
          { icon: Shield, label: "Roles", value: roles.length },
          { icon: Database, label: "Organizations", value: 8 },
          { icon: Radio, label: "Sync Devices", value: 3 },
        ].map(item => (
          <div key={item.label} className="ops-card p-4 flex items-center gap-3">
            <item.icon className="w-5 h-5 text-primary" />
            <div>
              <span className="text-operational">{item.label}</span>
              <span className="text-xl font-mono font-bold text-foreground block">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Users */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4" /> User Management
          </h2>
          <div className="ops-card overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 text-operational">
                  <th className="text-left p-3">NAME</th>
                  <th className="text-left p-3">ROLE</th>
                  <th className="text-left p-3">STATUS</th>
                  <th className="text-left p-3">LAST SEEN</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.name} className="border-t border-border">
                    <td className="p-3 text-foreground">{u.name}</td>
                    <td className="p-3 text-muted-foreground">{u.role}</td>
                    <td className="p-3"><StatusBadge status={u.status} /></td>
                    <td className="p-3 text-muted-foreground font-mono">{u.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4" /> Role Management
          </h2>
          <div className="space-y-2">
            {roles.map(role => (
              <div key={role.name} className="ops-card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground font-medium">{role.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{role.count} users</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{role.permissions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" /> Recent Audit Logs
        </h2>
        <div className="ops-card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/50 text-operational">
                <th className="text-left p-3">TIMESTAMP</th>
                <th className="text-left p-3">USER</th>
                <th className="text-left p-3">ACTION</th>
                <th className="text-left p-3">ENTITY</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "15:12:03", user: "Abdi Mohamed", action: "TASK_ASSIGNED", entity: "TSK-001" },
                { time: "14:45:22", user: "Dr. Amina Wario", action: "INCIDENT_VERIFIED", entity: "INC-006" },
                { time: "14:30:00", user: "Fatuma Wario", action: "RESOURCE_UPDATED", entity: "RES-002" },
                { time: "13:15:44", user: "Hassan Omar", action: "INCIDENT_SUBMITTED", entity: "INC-005" },
                { time: "12:00:00", user: "System", action: "ALERT_GENERATED", entity: "ALT-002" },
              ].map((log, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-muted-foreground">{log.time}</td>
                  <td className="p-3 text-foreground">{log.user}</td>
                  <td className="p-3"><StatusBadge status={log.action.toLowerCase()} /></td>
                  <td className="p-3 font-mono text-primary">{log.entity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
