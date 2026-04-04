// Atlas Sanctum Mandera - Mock Data
// Fictionalized operational data for Mandera County, Kenya

export type IncidentType =
  | "security_incident"
  | "suspicious_movement"
  | "road_blockage"
  | "conflict_warning"
  | "water_shortage"
  | "disease_signal"
  | "infrastructure_damage"
  | "market_disruption"
  | "displacement_movement";

export type Severity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "new" | "investigating" | "verified" | "disputed" | "resolved" | "false_report";
export type TaskStatus = "new" | "assigned" | "acknowledged" | "in_progress" | "blocked" | "completed" | "closed";
export type AlertSeverity = "critical" | "high" | "medium" | "low";

export interface Incident {
  id: string;
  publicRef: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: Severity;
  status: IncidentStatus;
  confidenceScore: number;
  location: string;
  ward: string;
  lat: number;
  lng: number;
  observedAt: string;
  submittedAt: string;
  reporter: string;
  reporterRole: string;
  sourceType: string;
  corroboratingReports: number;
}

export interface Alert {
  id: string;
  title: string;
  category: string;
  severity: AlertSeverity;
  status: "active" | "acknowledged" | "escalated" | "dismissed";
  triggerExplanation: string;
  affectedArea: string;
  relatedIncidents: number;
  recommendedAction: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  dailyConsumption: number;
  predictedDepletion: string;
  organization: string;
  criticality: Severity;
}

export interface Actor {
  id: string;
  name: string;
  type: string;
  area: string;
  status: "active" | "standby" | "deployed" | "offline";
  organization: string;
  activeTasks: number;
  contactChannel: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Severity;
  status: TaskStatus;
  assignedTo: string;
  assignedOrg: string;
  linkedIncident: string;
  dueAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
  type: "health_center" | "water_point" | "school" | "security_post" | "logistics_hub" | "settlement";
  lat: number;
  lng: number;
  status: "operational" | "degraded" | "non_operational";
  operator: string;
}

export interface AreaRisk {
  location: string;
  conflict: number;
  waterStress: number;
  disease: number;
  access: number;
  logistics: number;
}

// ========== MOCK DATA ==========

export const incidents: Incident[] = [
  {
    id: "INC-001", publicRef: "MND-2024-0041", title: "Armed group sighted near Elwak-Mandera road",
    description: "Three armed individuals spotted near km 47 marker along the Elwak-Mandera corridor. Traveling on foot heading northeast. Reported by local community watch.",
    type: "suspicious_movement", severity: "high", status: "investigating", confidenceScore: 62,
    location: "Elwak-Mandera Corridor", ward: "Elwak South", lat: 2.82, lng: 40.58,
    observedAt: "2024-03-15T06:30:00Z", submittedAt: "2024-03-15T07:12:00Z",
    reporter: "Field Officer Abdi", reporterRole: "field_reporter", sourceType: "direct_observation",
    corroboratingReports: 2
  },
  {
    id: "INC-002", publicRef: "MND-2024-0042", title: "Road blockage at Rhamu junction",
    description: "Heavy rains caused flash flooding blocking primary road at Rhamu junction. Vehicles unable to pass. Estimated 12-24hr recovery.",
    type: "road_blockage", severity: "medium", status: "verified", confidenceScore: 91,
    location: "Rhamu Junction", ward: "Rhamu", lat: 3.95, lng: 41.24,
    observedAt: "2024-03-15T04:00:00Z", submittedAt: "2024-03-15T05:30:00Z",
    reporter: "County Transport Office", reporterRole: "county_admin", sourceType: "official_report",
    corroboratingReports: 5
  },
  {
    id: "INC-003", publicRef: "MND-2024-0043", title: "Water point contamination - Takaba Ward",
    description: "Borehole BH-017 showing turbidity and unusual odor. Local residents reporting stomach illness. Approximately 340 households affected.",
    type: "water_shortage", severity: "critical", status: "verified", confidenceScore: 85,
    location: "Takaba Borehole BH-017", ward: "Takaba South", lat: 3.39, lng: 39.85,
    observedAt: "2024-03-14T14:00:00Z", submittedAt: "2024-03-14T16:20:00Z",
    reporter: "WASH Officer Fatuma", reporterRole: "humanitarian_coordinator", sourceType: "field_assessment",
    corroboratingReports: 4
  },
  {
    id: "INC-004", publicRef: "MND-2024-0044", title: "Livestock market disruption in Mandera Town",
    description: "Reports of forced taxation by unknown armed group at the central livestock market. Traders fleeing, market activity halted.",
    type: "market_disruption", severity: "high", status: "new", confidenceScore: 45,
    location: "Mandera Central Market", ward: "Mandera Township", lat: 3.94, lng: 41.87,
    observedAt: "2024-03-15T08:00:00Z", submittedAt: "2024-03-15T08:45:00Z",
    reporter: "Anonymous Tip", reporterRole: "community_source", sourceType: "tip",
    corroboratingReports: 1
  },
  {
    id: "INC-005", publicRef: "MND-2024-0045", title: "Displacement from Lafey sub-county",
    description: "Approximately 200 families moving from Lafey towards Mandera Town. Reports of inter-clan tensions as trigger. Women and children predominant.",
    type: "displacement_movement", severity: "high", status: "investigating", confidenceScore: 72,
    location: "Lafey-Mandera Road", ward: "Lafey", lat: 3.12, lng: 41.15,
    observedAt: "2024-03-14T11:00:00Z", submittedAt: "2024-03-14T13:00:00Z",
    reporter: "Chief Hassan Omar", reporterRole: "community_leader", sourceType: "direct_observation",
    corroboratingReports: 3
  },
  {
    id: "INC-006", publicRef: "MND-2024-0046", title: "Suspected cholera cases - Banissa",
    description: "Health center reports 8 cases of acute watery diarrhea in past 48 hours. Requesting lab confirmation and oral rehydration supplies.",
    type: "disease_signal", severity: "critical", status: "verified", confidenceScore: 78,
    location: "Banissa Health Center", ward: "Banissa", lat: 3.43, lng: 40.56,
    observedAt: "2024-03-15T09:00:00Z", submittedAt: "2024-03-15T10:15:00Z",
    reporter: "Dr. Amina Wario", reporterRole: "health_worker", sourceType: "clinical_report",
    corroboratingReports: 2
  },
  {
    id: "INC-007", publicRef: "MND-2024-0047", title: "IED threat along Fino-Arabia corridor",
    description: "Unconfirmed report of possible IED placement along the Fino-Arabia road corridor. Source is single informant with moderate reliability history.",
    type: "security_incident", severity: "critical", status: "new", confidenceScore: 33,
    location: "Fino-Arabia Road", ward: "Arabia", lat: 3.68, lng: 41.40,
    observedAt: "2024-03-15T05:15:00Z", submittedAt: "2024-03-15T06:00:00Z",
    reporter: "SIGINT Source Alpha", reporterRole: "intelligence_asset", sourceType: "humint",
    corroboratingReports: 0
  },
  {
    id: "INC-008", publicRef: "MND-2024-0048", title: "Bridge damage at Daua River crossing",
    description: "Seasonal flooding has weakened the wooden bridge structure at Daua River. Heavy vehicles cannot cross. Pedestrian access limited.",
    type: "infrastructure_damage", severity: "medium", status: "verified", confidenceScore: 95,
    location: "Daua River Bridge", ward: "Mandera East", lat: 3.93, lng: 41.85,
    observedAt: "2024-03-13T16:00:00Z", submittedAt: "2024-03-13T17:30:00Z",
    reporter: "County Engineer Osman", reporterRole: "county_admin", sourceType: "official_report",
    corroboratingReports: 6
  },
];

export const alerts: Alert[] = [
  {
    id: "ALT-001", title: "Escalating security corridor: Elwak-Mandera",
    category: "security", severity: "high", status: "active",
    triggerExplanation: "3 security incidents reported within 50km radius in past 72 hours. Pattern suggests coordinated activity.",
    affectedArea: "Elwak-Mandera Corridor", relatedIncidents: 3,
    recommendedAction: "Deploy additional security patrols. Issue travel advisory for civilian convoys.",
    createdAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "ALT-002", title: "Water crisis deepening: Takaba sub-county",
    category: "humanitarian", severity: "critical", status: "active",
    triggerExplanation: "Contaminated borehole + 2 other water points below minimum threshold. 1,200+ households affected.",
    affectedArea: "Takaba South", relatedIncidents: 2,
    recommendedAction: "Emergency water trucking. Deploy mobile water treatment unit.",
    createdAt: "2024-03-15T06:30:00Z"
  },
  {
    id: "ALT-003", title: "Disease outbreak risk: Banissa ward",
    category: "health", severity: "high", status: "acknowledged",
    triggerExplanation: "8 suspected cholera cases in 48hrs. Proximity to contaminated water source. Rainy season amplifier.",
    affectedArea: "Banissa", relatedIncidents: 2,
    recommendedAction: "Activate disease surveillance protocol. Pre-position ORS and IV supplies.",
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "ALT-004", title: "Supply line disruption: Northern corridor",
    category: "logistics", severity: "medium", status: "active",
    triggerExplanation: "Road blockage at Rhamu + bridge damage at Daua = two critical supply routes compromised simultaneously.",
    affectedArea: "Mandera North", relatedIncidents: 2,
    recommendedAction: "Reroute supply convoys via Wajir corridor. Assess air delivery feasibility.",
    createdAt: "2024-03-15T07:00:00Z"
  },
];

export const resources: Resource[] = [
  { id: "RES-001", name: "Potable Water", category: "water", location: "Mandera Town Depot", quantity: 45000, unit: "liters", minThreshold: 20000, dailyConsumption: 8000, predictedDepletion: "2024-03-20", organization: "UNICEF", criticality: "critical" },
  { id: "RES-002", name: "ORS Packets", category: "medical", location: "Banissa Health Center", quantity: 120, unit: "packets", minThreshold: 200, dailyConsumption: 25, predictedDepletion: "2024-03-19", organization: "MSF", criticality: "critical" },
  { id: "RES-003", name: "Diesel Fuel", category: "fuel", location: "County Logistics Hub", quantity: 2800, unit: "liters", minThreshold: 1000, dailyConsumption: 350, predictedDepletion: "2024-03-23", organization: "County Govt", criticality: "high" },
  { id: "RES-004", name: "Emergency Shelter Kits", category: "shelter", location: "Mandera Warehouse", quantity: 85, unit: "kits", minThreshold: 50, dailyConsumption: 8, predictedDepletion: "2024-03-25", organization: "UNHCR", criticality: "medium" },
  { id: "RES-005", name: "High-Energy Biscuits", category: "food", location: "WFP Distribution Point", quantity: 4200, unit: "cartons", minThreshold: 1500, dailyConsumption: 300, predictedDepletion: "2024-03-29", organization: "WFP", criticality: "high" },
  { id: "RES-006", name: "IV Fluids", category: "medical", location: "Mandera Referral Hospital", quantity: 340, unit: "bags", minThreshold: 100, dailyConsumption: 15, predictedDepletion: "2024-04-06", organization: "County Health", criticality: "medium" },
];

export const actors: Actor[] = [
  { id: "ACT-001", name: "KDF Alpha Detachment", type: "military", area: "Elwak-Mandera Corridor", status: "deployed", organization: "Kenya Defence Forces", activeTasks: 3, contactChannel: "HF Radio Ch.7" },
  { id: "ACT-002", name: "County Emergency Response", type: "county_office", area: "Mandera Township", status: "active", organization: "County Government", activeTasks: 5, contactChannel: "VHF Net 2" },
  { id: "ACT-003", name: "MSF Mobile Team Bravo", type: "ngo", area: "Banissa-Takaba", status: "deployed", organization: "Médecins Sans Frontières", activeTasks: 2, contactChannel: "Sat Phone +254..." },
  { id: "ACT-004", name: "Chief Hassan Omar", type: "community_leader", area: "Lafey", status: "active", organization: "Community Elders Council", activeTasks: 1, contactChannel: "Mobile +254..." },
  { id: "ACT-005", name: "WFP Logistics Unit", type: "logistics", area: "Mandera County", status: "active", organization: "World Food Programme", activeTasks: 4, contactChannel: "VHF Net 1" },
  { id: "ACT-006", name: "UNICEF WASH Team", type: "ngo", area: "Takaba Sub-county", status: "deployed", organization: "UNICEF", activeTasks: 3, contactChannel: "Sat Phone +254..." },
  { id: "ACT-007", name: "AP Post Rhamu", type: "security_post", area: "Rhamu", status: "active", organization: "Admin Police", activeTasks: 1, contactChannel: "VHF Net 3" },
];

export const tasks: Task[] = [
  { id: "TSK-001", title: "Deploy patrol to Elwak corridor", description: "Respond to armed group sighting. Establish presence along km 40-55 stretch.", priority: "high", status: "in_progress", assignedTo: "KDF Alpha Detachment", assignedOrg: "KDF", linkedIncident: "INC-001", dueAt: "2024-03-15T18:00:00Z", createdAt: "2024-03-15T07:30:00Z", updatedAt: "2024-03-15T09:00:00Z" },
  { id: "TSK-002", title: "Emergency water trucking to Takaba", description: "Dispatch 2 water tankers to Takaba South. Priority: BH-017 affected households.", priority: "critical", status: "assigned", assignedTo: "UNICEF WASH Team", assignedOrg: "UNICEF", linkedIncident: "INC-003", dueAt: "2024-03-16T06:00:00Z", createdAt: "2024-03-15T08:00:00Z", updatedAt: "2024-03-15T08:00:00Z" },
  { id: "TSK-003", title: "Cholera sample collection - Banissa", description: "Collect stool samples from suspected cases. Transport to Mandera Referral for lab confirmation.", priority: "critical", status: "in_progress", assignedTo: "MSF Mobile Team Bravo", assignedOrg: "MSF", linkedIncident: "INC-006", dueAt: "2024-03-15T16:00:00Z", createdAt: "2024-03-15T10:30:00Z", updatedAt: "2024-03-15T11:00:00Z" },
  { id: "TSK-004", title: "Road clearance at Rhamu junction", description: "Coordinate heavy equipment for flood debris removal. Assess road surface integrity.", priority: "medium", status: "new", assignedTo: "County Emergency Response", assignedOrg: "County Govt", linkedIncident: "INC-002", dueAt: "2024-03-16T12:00:00Z", createdAt: "2024-03-15T06:00:00Z", updatedAt: "2024-03-15T06:00:00Z" },
  { id: "TSK-005", title: "IDP registration at Mandera Town", description: "Set up registration point for displaced families from Lafey. Assess immediate needs.", priority: "high", status: "assigned", assignedTo: "County Emergency Response", assignedOrg: "County Govt", linkedIncident: "INC-005", dueAt: "2024-03-16T08:00:00Z", createdAt: "2024-03-14T14:00:00Z", updatedAt: "2024-03-15T08:00:00Z" },
];

export const facilities: Facility[] = [
  { id: "FAC-001", name: "Mandera Referral Hospital", type: "health_center", lat: 3.937, lng: 41.867, status: "operational", operator: "County Health" },
  { id: "FAC-002", name: "Banissa Health Center", type: "health_center", lat: 3.43, lng: 40.56, status: "degraded", operator: "County Health" },
  { id: "FAC-003", name: "Takaba Borehole BH-017", type: "water_point", lat: 3.39, lng: 39.85, status: "non_operational", operator: "UNICEF" },
  { id: "FAC-004", name: "Elwak Water Point", type: "water_point", lat: 2.83, lng: 40.58, status: "operational", operator: "County WASH" },
  { id: "FAC-005", name: "Rhamu AP Post", type: "security_post", lat: 3.95, lng: 41.24, status: "operational", operator: "Admin Police" },
  { id: "FAC-006", name: "County Logistics Hub", type: "logistics_hub", lat: 3.94, lng: 41.86, status: "operational", operator: "County Govt" },
  { id: "FAC-007", name: "Mandera Central School", type: "school", lat: 3.935, lng: 41.860, status: "operational", operator: "Ministry of Education" },
  { id: "FAC-008", name: "Lafey Settlement Camp", type: "settlement", lat: 3.12, lng: 41.15, status: "degraded", operator: "UNHCR" },
];

export const areaRisks: AreaRisk[] = [
  { location: "Mandera Township", conflict: 35, waterStress: 40, disease: 25, access: 20, logistics: 30 },
  { location: "Elwak South", conflict: 75, waterStress: 55, disease: 30, access: 60, logistics: 50 },
  { location: "Takaba South", conflict: 20, waterStress: 90, disease: 45, access: 40, logistics: 55 },
  { location: "Banissa", conflict: 30, waterStress: 60, disease: 80, access: 35, logistics: 40 },
  { location: "Rhamu", conflict: 25, waterStress: 35, disease: 20, access: 85, logistics: 70 },
  { location: "Lafey", conflict: 65, waterStress: 50, disease: 35, access: 55, logistics: 45 },
  { location: "Arabia", conflict: 70, waterStress: 45, disease: 25, access: 65, logistics: 60 },
];

export const stats = {
  activeIncidents: incidents.filter(i => !["resolved", "false_report"].includes(i.status)).length,
  verifiedSignals: incidents.filter(i => i.status === "verified").length,
  unverifiedSignals: incidents.filter(i => ["new", "investigating"].includes(i.status)).length,
  activeAlerts: alerts.filter(a => a.status === "active").length,
  openTasks: tasks.filter(t => !["completed", "closed"].includes(t.status)).length,
  criticalShortages: resources.filter(r => r.quantity <= r.minThreshold).length,
  deployedActors: actors.filter(a => a.status === "deployed").length,
};
