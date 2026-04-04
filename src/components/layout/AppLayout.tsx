import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SyncStatusIndicator } from "@/components/ops/StatusComponents";
import {
  LayoutDashboard, AlertTriangle, Map, Package, Users, ListTodo,
  Bell, Settings, Shield, Radio
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Command" },
  { to: "/incidents", icon: AlertTriangle, label: "Incidents" },
  { to: "/map", icon: Map, label: "Map Room" },
  { to: "/resources", icon: Package, label: "Resources" },
  { to: "/coordination", icon: Users, label: "Coordination" },
  { to: "/tasks", icon: ListTodo, label: "Tasking" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
  { to: "/admin", icon: Settings, label: "Admin" },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 lg:w-56 bg-sidebar flex flex-col border-r border-sidebar-border shrink-0">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-3 border-b border-sidebar-border">
          <Shield className="w-6 h-6 text-primary shrink-0" />
          <span className="hidden lg:block text-sm font-bold text-foreground tracking-wide">
            ATLAS SANCTUM
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 mx-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <SyncStatusIndicator online={true} />
          <div className="hidden lg:block mt-2 text-[10px] font-mono text-muted-foreground">
            MANDERA COUNTY OPS
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
