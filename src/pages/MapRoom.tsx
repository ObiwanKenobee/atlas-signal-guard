import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { incidents, facilities, alerts } from "@/data/mockData";
import { StatusBadge, SeverityPill, ConfidenceBadge } from "@/components/ops/StatusComponents";
import { Layers, X } from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const incidentIcon = (severity: string) => L.divIcon({
  className: "",
  html: `<div style="width:12px;height:12px;border-radius:50%;border:2px solid ${severity === "critical" ? "#ef4444" : severity === "high" ? "#eab308" : "#22d3ee"};background:${severity === "critical" ? "#ef444480" : severity === "high" ? "#eab30880" : "#22d3ee80"};"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const facilityIcon = (type: string) => {
  const colors: Record<string, string> = {
    health_center: "#22c55e",
    water_point: "#3b82f6",
    school: "#a855f7",
    security_post: "#ef4444",
    logistics_hub: "#f97316",
    settlement: "#94a3b8",
  };
  const color = colors[type] || "#94a3b8";
  return L.divIcon({
    className: "",
    html: `<div style="width:10px;height:10px;border-radius:2px;background:${color};border:1px solid ${color};"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
};

export default function MapRoom() {
  const [showIncidents, setShowIncidents] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const selected = selectedIncident ? incidents.find(i => i.id === selectedIncident) : null;

  return (
    <div className="h-full relative flex">
      <div className="flex-1 relative">
        <MapContainer
          center={[3.5, 41.0]}
          zoom={8}
          className="h-full w-full"
          style={{ background: "hsl(220, 20%, 10%)" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {showIncidents && incidents.map(inc => (
            <Marker
              key={inc.id}
              position={[inc.lat, inc.lng]}
              icon={incidentIcon(inc.severity)}
              eventHandlers={{ click: () => setSelectedIncident(inc.id) }}
            >
              <Popup>
                <div className="text-xs">
                  <strong>{inc.publicRef}</strong><br />
                  {inc.title}
                </div>
              </Popup>
            </Marker>
          ))}

          {showFacilities && facilities.map(fac => (
            <Marker
              key={fac.id}
              position={[fac.lat, fac.lng]}
              icon={facilityIcon(fac.type)}
            >
              <Popup>
                <div className="text-xs">
                  <strong>{fac.name}</strong><br />
                  {fac.type.replace(/_/g, " ")} • {fac.status}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Layer controls */}
        <div className="absolute top-4 right-4 z-[1000] ops-card p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
            <Layers className="w-3 h-3" /> LAYERS
          </div>
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" checked={showIncidents} onChange={e => setShowIncidents(e.target.checked)} className="rounded" />
            Incidents
          </label>
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" checked={showFacilities} onChange={e => setShowFacilities(e.target.checked)} className="rounded" />
            Facilities
          </label>
        </div>

        {/* Map header */}
        <div className="absolute top-4 left-4 z-[1000]">
          <h1 className="text-lg font-bold text-foreground drop-shadow-lg">Map Operations Room</h1>
          <p className="text-[10px] font-mono text-muted-foreground drop-shadow">MANDERA COUNTY • {incidents.length} INCIDENTS • {facilities.length} FACILITIES</p>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="w-80 bg-card border-l border-border p-4 overflow-y-auto shrink-0 z-[1000]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground">{selected.publicRef}</span>
            <button onClick={() => setSelectedIncident(null)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-sm font-bold text-foreground mb-2">{selected.title}</h3>
          <div className="flex gap-1 mb-3">
            <SeverityPill severity={selected.severity} />
            <StatusBadge status={selected.status} />
            <ConfidenceBadge score={selected.confidenceScore} />
          </div>
          <p className="text-xs text-muted-foreground mb-3">{selected.description}</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Location: {selected.location}</div>
            <div>Ward: {selected.ward}</div>
            <div>Reporter: {selected.reporter}</div>
            <div>Observed: {new Date(selected.observedAt).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
