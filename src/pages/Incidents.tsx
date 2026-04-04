import { useState } from "react";
import { incidents } from "@/data/mockData";
import { IncidentCard } from "@/components/ops/IncidentCard";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBadge, SeverityPill, ConfidenceBadge, RiskScoreTile } from "@/components/ops/StatusComponents";
import { MapPin, Clock, User, FileText, ArrowLeft, Filter, Search } from "lucide-react";

export default function Incidents() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Detail view
  if (id) {
    const incident = incidents.find(i => i.id === id);
    if (!incident) return <div className="p-6 text-muted-foreground">Incident not found.</div>;

    return (
      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        <button onClick={() => navigate("/incidents")} className="flex items-center gap-1 text-xs text-primary hover:underline font-mono">
          <ArrowLeft className="w-3 h-3" /> BACK TO FEED
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-muted-foreground">{incident.publicRef}</span>
            <SeverityPill severity={incident.severity} />
            <StatusBadge status={incident.status} />
            <ConfidenceBadge score={incident.confidenceScore} />
          </div>
          <h1 className="text-lg font-bold text-foreground">{incident.title}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="ops-card p-4 space-y-3">
            <h3 className="text-operational">SUMMARY</h3>
            <p className="text-sm text-foreground">{incident.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">Type:</span> <span className="text-foreground">{incident.type.replace(/_/g, " ")}</span></div>
              <div><span className="text-muted-foreground">Source:</span> <span className="text-foreground">{incident.sourceType.replace(/_/g, " ")}</span></div>
              <div><span className="text-muted-foreground">Reporter:</span> <span className="text-foreground">{incident.reporter}</span></div>
              <div><span className="text-muted-foreground">Role:</span> <span className="text-foreground">{incident.reporterRole.replace(/_/g, " ")}</span></div>
            </div>
          </div>

          <div className="ops-card p-4 space-y-3">
            <h3 className="text-operational">LOCATION & TIMING</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary" /> {incident.location}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-muted-foreground" /> Ward: {incident.ward}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-muted-foreground" /> Coords: {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}</div>
              <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-muted-foreground" /> Observed: {new Date(incident.observedAt).toLocaleString()}</div>
              <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-muted-foreground" /> Submitted: {new Date(incident.submittedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="ops-card p-4 space-y-3">
            <h3 className="text-operational">CONFIDENCE HISTORY</h3>
            <div className="text-center py-4">
              <span className="text-4xl font-mono font-bold text-foreground">{incident.confidenceScore}</span>
              <span className="text-sm text-muted-foreground block mt-1">/ 100</span>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {incident.corroboratingReports} corroborating reports
            </div>
          </div>

          <div className="ops-card p-4 space-y-3">
            <h3 className="text-operational">EVIDENCE</h3>
            <div className="flex items-center justify-center py-6 text-muted-foreground text-xs">
              No evidence attachments yet
            </div>
          </div>

          <div className="ops-card p-4 space-y-3">
            <h3 className="text-operational">LINKED ENTITIES</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>Cluster: —</div>
              <div>Related alerts: —</div>
              <div>Response tasks: —</div>
            </div>
          </div>
        </div>

        <div className="ops-card p-4">
          <h3 className="text-operational mb-3">AUDIT TIMELINE</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground font-mono w-36">{new Date(incident.submittedAt).toLocaleString()}</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-foreground">Report submitted by {incident.reporter}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground font-mono w-36">{new Date(incident.submittedAt).toLocaleString()}</span>
              <span className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-foreground">Initial confidence score: {incident.confidenceScore}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  const filtered = incidents.filter(inc => {
    if (search && !inc.title.toLowerCase().includes(search.toLowerCase()) && !inc.publicRef.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && inc.type !== typeFilter) return false;
    if (statusFilter !== "all" && inc.status !== statusFilter) return false;
    return true;
  });

  const types = Array.from(new Set(incidents.map(i => i.type)));
  const statuses = Array.from(new Set(incidents.map(i => i.status)));

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Incident Feed</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{incidents.length} TOTAL • {filtered.length} SHOWING</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search incidents..."
            className="w-full pl-8 pr-3 py-1.5 bg-muted border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-muted border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="all">All Types</option>
          {types.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-muted border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="all">All Status</option>
          {statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
        </select>
      </div>

      {/* Incident list */}
      <div className="space-y-2">
        {filtered.map(inc => (
          <IncidentCard key={inc.id} incident={inc} onClick={() => navigate(`/incidents/${inc.id}`)} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No incidents match filters</div>
        )}
      </div>
    </div>
  );
}
