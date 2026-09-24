# Atlas Sanctum Mandera

> **Turn scattered field signals into trusted operational awareness.**

Atlas Sanctum Mandera is an **offline-first frontier intelligence and coordination platform** designed for high-risk, low-connectivity, multi-actor environments.

The MVP is designed around the operational realities of frontier regions such as Mandera, Kenya:

* intermittent connectivity
* incomplete information
* fragmented reporting
* distributed response teams
* rapidly changing field conditions
* sensitive operational data
* geographically dispersed infrastructure
* uncertainty around incoming signals

The system helps authorized users answer five questions:

```text
WHAT IS HAPPENING?
        ↓
WHAT IS TRUSTWORTHY?
        ↓
WHERE IS IT HAPPENING?
        ↓
WHO IS RESPONDING?
        ↓
WHAT NEEDS ACTION NEXT?
```

Atlas Sanctum is not a generic CRUD dashboard.

It is a **field decision system**.

---

# 01 — Product Vision

Atlas Sanctum Mandera connects reporting, verification, geospatial intelligence, resources, actors, tasks, alerts, and audit history into a single operational layer.

```text
FIELD SIGNALS
      ↓
REPORTS
      ↓
VERIFICATION
      ↓
GEOSPATIAL CONTEXT
      ↓
RISK ANALYSIS
      ↓
RESPONSE TASKING
      ↓
FIELD ACTION
      ↓
OUTCOME
      ↓
AUDIT
```

The platform is designed for:

* humanitarian responders
* county administrators
* trusted community operators
* field teams
* analysts
* logistics teams
* authorized security and operations personnel

All operational access is governed by explicit roles, permissions, and data boundaries.

---

# 02 — Design Principles

## Offline by Default

Connectivity is a variable, not an assumption.

The field experience must continue working when the network disappears.

## Trust Before Urgency

A dramatic report is not automatically a reliable report.

Atlas separates:

```text
Signal
Confidence
Verification
```

## Geography Is Context

An incident without location is incomplete.

The platform makes geography a first-class domain.

## Explain Every Important Decision

Users should be able to understand:

* why an alert fired
* why a score changed
* why a report was verified
* who changed a record
* what evidence was used

## Action Over Decoration

Every important signal should lead naturally to:

```text
Investigate
Verify
Assign
Escalate
Resolve
```

---

# 03 — Platform Architecture

```text
                           ATLAS SANCTUM
                                  │
                                  ↓
                         FIELD DATA LAYER
                                  │
              ┌───────────────────┼───────────────────┐
              ↓                   ↓                   ↓
         INCIDENTS            RESOURCES            ACTORS
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  ↓
                         VERIFICATION ENGINE
                                  │
                                  ↓
                       GEOSPATIAL INTELLIGENCE
                                  │
                                  ↓
                          ALERT / RISK ENGINE
                                  │
                                  ↓
                         RESPONSE TASKING
                                  │
                                  ↓
                           FIELD ACTION
                                  │
                                  ↓
                              AUDIT LOG
```

The platform is intentionally modular so additional intelligence services can be added without rewriting the operational core.

---

# 04 — Core Modules

Atlas Sanctum Mandera MVP consists of eight major product domains.

```text
01. Incident Reporting
02. Signal Verification
03. Geospatial Operations
04. Resource & Needs Tracking
05. Actor Coordination
06. Response Tasking
07. Early Warning & Alerts
08. Audit & Decision History
```

---

# 05 — Incident Reporting

## `IncidentReporting`

Users can submit structured field reports for events such as:

```text
Security Incident
Suspicious Movement
Road Blockage
Conflict Warning
Water Shortage
Disease Signal
Infrastructure Damage
Market Disruption
Displacement Movement
```

### Report structure

```text
Title
Description
Incident Type
Category
Severity
Observed Time
Submission Time
Location
Administrative Area
Source Type
Initial Confidence
Reporter
Organization
Evidence Metadata
```

### Location input

Users can:

* capture GPS coordinates
* select a point manually
* select a known settlement
* attach an administrative location

The interface should work even when GPS is unavailable.

---

# 06 — Incident Status

Each report should have an explicit lifecycle.

```text
NEW
 ↓
UNDER REVIEW
 ↓
CORROBORATED
 ↓
VERIFIED
 ↓
RESOLVED
```

Alternative states:

```text
DISPUTED
REJECTED
DUPLICATE
EXPIRED
```

Status transitions should be auditable.

---

# 07 — Signal Verification Engine

## `VerificationEngine`

Atlas should treat trust as a process rather than a label.

The engine evaluates incoming reports using multiple signals:

```text
Source Reliability
        +
Corroboration
        +
Spatial Proximity
        +
Temporal Proximity
        +
Evidence
        +
Trusted-Actor Review
        +
Conflicting Reports
        +
Freshness
```

These inputs produce a confidence assessment.

---

# 08 — Confidence Model

The MVP can use a deterministic first-pass model:

```text
confidence_score =
    source_weight
  + corroboration_weight
  + spatial_weight
  + temporal_weight
  + verifier_adjustment
  - conflict_penalty
  - freshness_penalty
```

The exact weights should live in configuration rather than being hard-coded throughout the frontend or API.

### Initial interpretation bands

```text
0–29      LOW CONFIDENCE
30–59     UNCONFIRMED
60–79     LIKELY CREDIBLE
80–100    VERIFIED
```

These labels are operational categories, not claims of objective truth.

---

# 09 — Machine vs Human Confidence

Atlas should store both:

```text
Machine Confidence
Human-Reviewed Confidence
```

Example:

```text
Machine Score
74

Analyst Score
82

Final Status
Verified
```

A human review should never silently overwrite the machine score.

Both should remain part of the record.

---

# 10 — Incident Clustering

Similar incoming reports should be grouped into an `IncidentCluster`.

Example:

```text
Report A
  │
  ├── 4 km
  │
Report B ──────┐
               ↓
           CLUSTER 042
               ↑
Report C ──────┘
```

Clustering can consider:

```text
Time
Geography
Incident Type
Narrative Similarity
Shared Evidence
```

The system should preserve the original reports even after clustering.

---

# 11 — Geospatial Operations Map

## `OperationsMap`

The map is the primary situational-awareness surface.

Layers include:

```text
Incidents
Alerts
Water Points
Health Facilities
Schools
Roads
Security Posts
Logistics Hubs
Settlements
Response Zones
Risk Heatmaps
```

Users can:

* toggle layers
* cluster points
* filter by time
* select a region
* inspect entities
* view historical states
* zoom from county to settlement

---

# 12 — Map Performance

The system should support large numbers of entities without overwhelming low-end devices.

Use:

```text
Clustering
Vector Tiles
Viewport Queries
Lazy Layer Loading
Geometry Simplification
Memoized Selectors
```

For the MVP:

```text
MapLibre GL
```

or:

```text
Leaflet
```

is sufficient.

---

# 13 — Offline Mapping

The map should support future offline tile packages.

Conceptually:

```text
ONLINE
  ↓
Download / Cache Relevant Area
  ↓
OFFLINE
  ↓
Cached Basemap
  +
Cached Operational Data
  ↓
Reconnect
  ↓
Synchronize Changes
```

The application should visibly communicate whether the current map is:

```text
LIVE
CACHED
PARTIALLY CACHED
STALE
```

---

# 14 — Resource & Needs Tracking

## `ResourceManagement`

Track critical resources:

```text
Water
Food
Fuel
Medical Supplies
Vehicles
Communication Equipment
Shelter Materials
```

Each stock location exposes:

```text
Quantity
Unit
Owner
Location
Criticality
Minimum Threshold
Daily Consumption
Predicted Depletion
Last Updated
```

---

# 15 — Resource Risk

Example:

```text
WATER — DEPOT 04

Current:
12,400 L

Minimum:
8,000 L

Daily consumption:
1,900 L

Estimated depletion:
2.3 days

Status:
⚠ WATCH
```

The depletion model should remain inspectable.

---

# 16 — Actor Coordination

## `ActorRegistry`

Atlas maintains a structured directory of operational actors.

Examples:

```text
County Offices
Humanitarian Organizations
Clinics
Schools
Community Leaders
Logistics Teams
Field Officers
Security Organizations
```

Each actor includes:

```text
Name
Type
Organization
Area of Operation
Contact Channels
Verified Status
Permissions
Assigned Tasks
Activity State
```

Sensitive operational fields should be role-gated.

---

# 17 — Actor Activity

The system can provide a regional activity picture.

```text
NAIROBI
   └── Not in operational scope

MANDERA NORTH
   ├── Health Response Team
   ├── Water Operations
   ├── County Field Officers
   └── Logistics Partner

MANDERA EAST
   ├── Clinic Team
   └── Community Coordination
```

The goal is to answer:

> **Who is responding where?**

---

# 18 — Response Tasking

## `TaskingEngine`

Any verified or sufficiently credible signal can generate a response task.

```text
INCIDENT
   ↓
TASK
   ↓
ACTOR
   ↓
DEADLINE
   ↓
ACTION
   ↓
OUTCOME
```

### Task fields

```text
Title
Description
Incident
Alert
Assigned Actor
Organization
Priority
Status
Deadline
Notes
Evidence
Outcome
```

---

# 19 — Task States

```text
NEW
ASSIGNED
ACKNOWLEDGED
IN PROGRESS
BLOCKED
COMPLETED
CLOSED WITHOUT ACTION
```

Task history should be immutable at the event level.

---

# 20 — Early Warning & Alerts

## `AlertEngine`

The alert layer detects recurring or compound patterns.

Potential trigger classes:

```text
Repeated incidents in one corridor
Increasing water shortage
Unusual movement patterns
Increasing disease reports
Supply depletion
Road inaccessibility
Multiple related incidents
Rapid risk-score changes
```

An alert should never be just a red banner.

It needs context.

---

# 21 — Alert Structure

```text
ALERT

Title
Category
Severity
Confidence
Affected Area
Trigger Explanation
Related Incidents
Recommended Action
Created At
Status
```

Example:

```text
WATER SUPPLY PRESSURE

Severity:
HIGH

Affected Area:
Settlement Cluster 07

Why:
Three water points reported declining supply
within the last 48 hours.

Confidence:
81%

Recommended action:
Inspect primary borehole and evaluate
emergency water distribution.
```

---

# 22 — Audit & Decision History

## `AuditTrail`

Atlas records the operational history behind meaningful system events.

Track:

```text
Who submitted a report
Who modified a record
Why confidence changed
Why a report was verified
Why an alert fired
Who assigned a response
Which evidence was referenced
Who closed the task
```

Each audit event should contain:

```text
Actor
Timestamp
Action
Entity
Previous State
New State
Reason
Evidence References
```

---

# 23 — User Roles

Initial RBAC model:

```text
FIELD REPORTER
VERIFIER / ANALYST
OPERATIONS COMMANDER
HUMANITARIAN COORDINATOR
COUNTY ADMINISTRATOR
SYSTEM ADMIN
```

---

# 24 — Permission Model

Permissions should be granular.

### Field Reporter

```text
Create local reports
View permitted local data
Upload evidence
View own submissions
```

### Verifier / Analyst

```text
Review reports
Change confidence
Merge incidents
Validate evidence
Resolve conflicts
```

### Operations Commander

```text
View operational layers
Assign tasks
Escalate alerts
Monitor active operations
```

### Humanitarian Coordinator

```text
Manage resources
Monitor response
Coordinate organizations
Review needs
```

### County Administrator

```text
View county-level intelligence
Monitor infrastructure
Review resource state
Review response activity
```

### System Administrator

```text
Manage users
Manage roles
Manage organizations
Configure system
Review audit controls
```

The backend remains the final authorization boundary.

---

# 25 — Frontend Information Architecture

The frontend should feel like an operations room, not a generic admin console.

```text
/auth
/command
/incidents
/incidents/:id
/map
/resources
/actors
/tasks
/alerts
/admin
/audit
```

---

# 26 — Command Dashboard

## `CommandDashboard`

The initial command screen should answer:

```text
What is happening?
Where are the highest-risk areas?
Which signals are trusted?
What alerts are active?
Who is responding?
Where are resources constrained?
```

### Recommended modules

```text
Active Incidents
Verified Signals
Top Risk Areas
Active Alerts
Open Tasks
Resource Shortages
Operations Map
Recent Activity
```

---

# 27 — Command Screen Example

```text
┌───────────────────────────────────────────────────────────────┐
│ ATLAS SANCTUM · MANDERA                                     │
│ ● OFFLINE-READY   Last sync: 4m ago                         │
├───────────────────────┬───────────────────────────────────────┤
│ ACTIVE INCIDENTS      │ VERIFIED SIGNALS                    │
│ 38                    │ 21                                  │
├───────────────────────┼───────────────────────────────────────┤
│ ACTIVE ALERTS         │ OPEN RESPONSE TASKS                 │
│ 7                     │ 14                                  │
├───────────────────────┴───────────────────────────────────────┤
│                                                               │
│                     OPERATIONS MAP                            │
│                                                               │
├───────────────────────┬───────────────────────────────────────┤
│ RESOURCE PRESSURE     │ TOP RISK AREAS                       │
│ Water   ⚠             │ Corridor A                           │
│ Fuel    ✓             │ Settlement Cluster 07                │
│ Medical !             │ Road Segment 12                       │
└───────────────────────┴───────────────────────────────────────┘
```

---

# 28 — Incident Feed

## `IncidentFeed`

The incident list should support:

```text
Search
Date Range
Severity
Type
Status
Confidence
Organization
Location
Assignment
```

Each row should expose:

```text
Incident
Location
Severity
Confidence
Status
Observed
Submitted
Assigned
```

---

# 29 — Incident Detail

## `IncidentDetail`

The detail view should consolidate the evidence.

```text
SUMMARY
MAP LOCATION
EVIDENCE
CONFIDENCE HISTORY
CLUSTER
RELATED ALERTS
RESPONSE TASKS
AUDIT HISTORY
```

Example:

```text
INCIDENT #MD-004281

Road blockage reported near [area]

Severity:
HIGH

Confidence:
76%

Status:
CORROBORATED

Corroboration:
3 reports
2 independent organizations

[Verify]
[Create Task]
[Link Alert]
```

---

# 30 — Full Operations Room

## `MapOperationsRoom`

A dedicated full-screen map experience should provide:

```text
Incident Layers
Alert Layers
Resource Layers
Facility Layers
Actor Layers
Risk Heatmaps
Time Scrubber
Filters
```

The side drawer should expose detailed entities without permanently obscuring the map.

---

# 31 — Resource Dashboard

## `ResourceDashboard`

Primary widgets:

```text
Stock Health
Depletion Forecast
Shortage Alerts
Location Table
Consumption Rate
Critical Resource Map
```

Example:

```text
MEDICAL SUPPLIES
██████████████░░ 72%

FUEL
███████████░░░░ 61%

WATER
██████░░░░░░░░░ 38%
```

---

# 32 — Coordination Board

## `CoordinationBoard`

This view answers:

> **Who is doing what?**

Use either:

```text
Kanban
```

or:

```text
Region × Actor
```

Example:

```text
                NEW      ACTIVE      BLOCKED     COMPLETE

COUNTY          3          6           1            9
HEALTH          2          8           0            7
WATER           1          4           2            5
LOGISTICS       4          5           1            8
```

---

# 33 — Alerts Center

## `AlertsCenter`

Each alert supports:

```text
Acknowledge
Escalate
Dismiss
View Evidence
Open Related Incidents
Create Task
```

The action set should depend on role permissions.

---

# 34 — Admin Console

## `AdminConsole`

Administrative modules:

```text
Users
Roles
Organizations
Permissions
Alert Rules
System Settings
Audit
Device Sync
```

---

# 35 — Frontend Component System

Build a shared operational UI library.

```text
StatusBadge
ConfidenceBadge
SeverityPill
GeoMap
TimelinePanel
IncidentCard
AlertCard
ResourceStockCard
RiskScoreTile
SyncStatusIndicator
RoleGuard
FilterDrawer
EvidenceGallery
TaskBoard
AuditTrailTable
```

The same components should be usable across dashboard, map, incident, and mobile surfaces.

---

# 36 — Frontend Stack

Recommended:

```text
Next.js
TypeScript
Tailwind CSS
TanStack Query
Zustand / Redux Toolkit
MapLibre GL
PWA
IndexedDB
Service Worker
```

Use a shared domain model between dashboard and field reporting experiences.

---

# 37 — Backend Stack

The API layer can use:

```text
Laravel
```

or:

```text
NestJS
```

Recommended supporting infrastructure:

```text
PostgreSQL
PostGIS
Redis
S3-Compatible Object Storage
Background Workers
```

---

# 38 — Backend Services

Logical services:

```text
Auth Service
Incident Service
Verification Service
Geospatial Service
Resource Service
Actor Coordination Service
Tasking Service
Alert Engine
Audit Service
Sync Service
```

These can initially live in a modular monolith while keeping domain boundaries explicit.

A modular monolith is preferable to premature microservice theater for an MVP.

---

# 39 — Offline Architecture

Offline capability is one of the defining requirements.

The client should support:

```text
Local Capture
Local Read Cache
Queued Writes
Retry
Conflict Detection
Sync
```

Architecture:

```text
             ONLINE
                │
                ↓
          API + Realtime
                │
                ↓
        Client Query Cache
                │
                ↓
             UI


             OFFLINE
                │
                ↓
           IndexedDB
                │
                ↓
          Write Queue
                │
                ↓
       Reconnect / Retry
                │
                ↓
       Conflict Resolution
                │
                ↓
            Server
```

---

# 40 — Offline Drafts

A field reporter should be able to:

```text
Create Incident
   ↓
Capture Coordinates
   ↓
Add Notes
   ↓
Attach Evidence Metadata
   ↓
Save Locally
   ↓
Continue Working
```

without requiring a live network connection.

The UI should clearly indicate:

```text
DRAFT — LOCAL ONLY

PENDING SYNC

SYNCED

SYNC FAILED

CONFLICT REQUIRES REVIEW
```

---

# 41 — Sync Model

Every offline mutation receives a local synchronization identity.

Conceptually:

```ts
interface SyncEvent {
  id: string;
  deviceId: string;
  userId: string;

  entityType: string;
  entityId: string;

  operation: "create" | "update" | "delete";

  payloadHash: string;

  status:
    | "pending"
    | "synced"
    | "failed"
    | "conflict";

  createdAt: string;
  syncedAt?: string;
}
```

---

# 42 — Conflict Resolution

Conflicts should not simply be silently overwritten.

For critical entities:

```text
LOCAL UPDATE
      +
SERVER UPDATE
      ↓
CONFLICT
      ↓
COMPARE
      ↓
RESOLVE
      ↓
AUDIT
```

A conflict UI can display:

```text
LOCAL
Status: In Progress

SERVER
Status: Completed

Updated by:
Operations Lead

[Keep Local]
[Keep Server]
[Merge]
```

Resolution itself becomes an audit event.

---

# 43 — Database Architecture

Use:

```text
PostgreSQL
+
PostGIS
```

Core entities:

```text
users
roles
organizations
locations
incident_reports
incident_clusters
incident_cluster_members
verification_events
evidences
resource_items
resource_stock_entries
tasks
task_updates
alerts
alert_incidents
facilities
infrastructure_assets
area_risk_snapshots
audit_logs
sync_events
```

---

# 44 — Core Schema

## `users`

```text
id
full_name
phone
email
password_hash
status
primary_role_id
organization_id
assigned_area_id
last_seen_at
created_at
updated_at
```

## `roles`

```text
id
name
description
```

## `organizations`

```text
id
name
type
trust_level
contact_info
created_at
updated_at
```

---

# 45 — Geospatial Schema

## `locations`

```text
id
name
type
admin_level
geometry
parent_location_id
created_at
updated_at
```

Use PostGIS geometry types appropriate to the location.

---

# 46 — Incident Schema

## `incident_reports`

```text
id
public_ref
title
description
incident_type
category
severity
status
source_type
source_reliability_snapshot
confidence_initial
confidence_current
observed_at
submitted_at
reporter_user_id
organization_id
location_id
geom
metadata_json
created_at
updated_at
```

---

# 47 — Incident Cluster Schema

## `incident_clusters`

```text
id
cluster_key
title
status
primary_incident_id
confidence_score
incident_count
first_seen_at
last_seen_at
centroid_geom
created_at
updated_at
```

## `incident_cluster_members`

```text
id
cluster_id
incident_report_id
joined_at
```

---

# 48 — Verification Schema

## `verification_events`

```text
id
incident_report_id
verifier_user_id
action
previous_confidence
new_confidence
rationale
evidence_summary
created_at
```

Verification history should never be flattened into a single database field.

The history is part of the evidence.

---

# 49 — Evidence Schema

## `evidences`

```text
id
incident_report_id
type
file_key
mime_type
file_size
checksum
captured_at
uploaded_at
metadata_json
```

For MVP purposes, the system can store media metadata and use S3-compatible object storage for actual files.

---

# 50 — Resource Schema

## `resource_items`

```text
id
name
category
unit
criticality
description
```

## `resource_stock_entries`

```text
id
resource_item_id
location_id
organization_id
quantity_on_hand
minimum_threshold
daily_consumption_rate
predicted_depletion_at
updated_by_user_id
updated_at
```

---

# 51 — Task Schema

## `tasks`

```text
id
title
description
linked_incident_id
linked_alert_id
assigned_actor_id
assigned_org_id
priority
status
due_at
created_by_user_id
created_at
updated_at
```

## `task_updates`

```text
id
task_id
updated_by_user_id
status
note
metadata_json
created_at
```

---

# 52 — Alert Schema

## `alerts`

```text
id
title
category
severity
status
trigger_type
trigger_explanation
confidence_score
affected_location_id
geom
recommended_action
created_at
updated_at
```

## `alert_incidents`

```text
id
alert_id
incident_report_id
```

---

# 53 — Infrastructure Schema

## `facilities`

```text
id
name
type
location_id
geom
status
operator_org_id
metadata_json
```

## `infrastructure_assets`

```text
id
name
type
location_id
geom
status
criticality
metadata_json
```

---

# 54 — Risk Snapshot Schema

## `area_risk_snapshots`

```text
id
location_id
snapshot_date
conflict_risk_score
water_stress_score
disease_risk_score
access_risk_score
logistics_risk_score
summary_json
```

Each risk score should be accompanied by methodology metadata in the production implementation.

---

# 55 — Audit Schema

## `audit_logs`

```text
id
actor_user_id
action_type
entity_type
entity_id
before_json
after_json
reason
created_at
```

Audit records should be append-only wherever practical.

---

# 56 — API Design

Use versioned REST APIs.

Base path:

```text
/api/v1
```

---

# 57 — Authentication API

```text
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

---

# 58 — User & Role API

```text
GET   /users
POST  /users
GET   /users/{id}
PATCH /users/{id}

GET /roles
```

---

# 59 — Organization API

```text
GET  /organizations
POST /organizations
GET  /organizations/{id}
```

---

# 60 — Location API

```text
GET /locations
GET /locations/{id}
GET /locations/tree
GET /locations/{id}/children
```

---

# 61 — Incident API

```text
GET   /incidents
POST  /incidents
GET   /incidents/{id}
PATCH /incidents/{id}

POST /incidents/{id}/verify
POST /incidents/{id}/evidence
GET  /incidents/{id}/timeline
POST /incidents/{id}/link-cluster
```

Supported filters:

```text
Date Range
Severity
Type
Status
Confidence
Bounding Box
Radius
Organization
Assignment
```

---

# 62 — Cluster API

```text
GET  /clusters
GET  /clusters/{id}
POST /clusters/recompute
```

---

# 63 — Verification API

```text
GET  /verifications
POST /verifications
GET  /verifications/{id}
```

---

# 64 — Resource API

```text
GET   /resources/items
POST  /resources/items

GET   /resources/stock
POST  /resources/stock
PATCH /resources/stock/{id}

GET /resources/stock/alerts
```

---

# 65 — Actor API

```text
GET   /actors
POST  /actors
GET   /actors/{id}
PATCH /actors/{id}

GET /actors/{id}/tasks
```

---

# 66 — Task API

```text
GET   /tasks
POST  /tasks
GET   /tasks/{id}
PATCH /tasks/{id}

POST /tasks/{id}/updates
```

---

# 67 — Alert API

```text
GET   /alerts
POST  /alerts
GET   /alerts/{id}
PATCH /alerts/{id}

POST /alerts/run-rules
```

---

# 68 — Geospatial API

```text
GET /map/overview
GET /map/incidents
GET /map/alerts
GET /map/resources
GET /map/facilities
GET /map/risk-heatmap
```

Geo endpoints should support GeoJSON responses.

---

# 69 — Audit API

```text
GET /audit
GET /audit/{entityType}/{entityId}
```

---

# 70 — Sync API

```text
POST /sync/pull
POST /sync/push
POST /devices/register
```

Sync requests should include deterministic identifiers so retries do not generate duplicate records.

---

# 71 — API Response Envelope

All API responses should follow a predictable format.

```json
{
  "data": {},
  "meta": {
    "request_id": "uuid",
    "timestamp": "ISO8601"
  },
  "error": null
}
```

Validation errors should expose field-level messages.

Example:

```json
{
  "data": null,
  "meta": {
    "request_id": "req_123",
    "timestamp": "2026-09-24T16:42:00Z"
  },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid incident payload",
    "fields": {
      "severity": [
        "Severity is required."
      ]
    }
  }
}
```

---

# 72 — OpenAPI

The project should generate an **OpenAPI 3.1** specification covering:

```text
Authentication
Users
Roles
Organizations
Locations
Incidents
Verification
Evidence
Clusters
Resources
Actors
Tasks
Alerts
Map
Audit
Sync
```

The API contract should become the source of truth between frontend and backend teams.

---

# 73 — Frontend State Architecture

Separate:

```text
Server State
Local UI State
Session State
Offline State
Realtime State
```

Recommended:

```text
TanStack Query
→ server state

Zustand / Redux Toolkit
→ local and workflow state

IndexedDB
→ offline persistence

WebSocket / SSE manager
→ realtime updates
```

---

# 74 — Low-Bandwidth UX

The platform should degrade gracefully.

Prioritize:

```text
Critical text
Incident metadata
Coordinates
Severity
Status
Task state
```

Deprioritize:

```text
Large imagery
Nonessential animations
High-resolution maps
Heavy analytical layers
```

Media should be uploadable asynchronously.

---

# 75 — Multilingual Readiness

Initial language support:

```text
English
Swahili
```

The architecture should support future localization.

Keep translatable text outside components where practical.

Support:

```text
labels
notifications
validation
status messages
help content
date/time formatting
number formatting
```

---

# 76 — Security Model

The system operates in a sensitive environment.

Security requirements include:

```text
Strong Authentication
Role-Based Authorization
Tenant / Organization Boundaries
Audit Logging
Secure Media Handling
Encrypted Transport
Secure Local Storage
Token Expiration
Session Revocation
Input Validation
```

The MVP should be designed so operationally sensitive layers can later be isolated from broader community-facing data.

---

# 77 — Demo Data

The project should ship with a fictionalized Mandera demo dataset.

Seed:

```text
Wards
Settlements
Health Centers
Water Points
Supply Depots
Road Corridors
Organizations
Actors
Incident Reports
Incident Clusters
Alerts
Resources
Tasks
Risk Snapshots
```

Include approximately 30 days of historical incident activity.

All data must be fictionalized or synthetic.

> **Never use real sensitive or classified operational data in the demo environment.**

---

# 78 — Example Demo Scenario

A sample operational chain:

```text
08:14
Water shortage reported

09:02
Second nearby report submitted

09:17
Reports clustered

09:25
Confidence rises to 74%

09:34
Analyst verifies signal

09:40
Water-supply alert generated

09:45
Response task created

09:51
Logistics team assigned

11:20
Field team acknowledges

14:10
Water delivery completed

15:00
Task closed

15:02
Audit event written
```

This single scenario demonstrates the entire product loop.

---

# 79 — Critical UX States

Every major surface must handle:

```text
Loading
Empty
Offline
Stale
Partial Data
Permission Restricted
Sync Pending
Sync Failed
Conflict
Error
```

Example:

```text
OFFLINE

Your latest operational data was synchronized
12 minutes ago.

New reports will be stored locally and synced
when connectivity returns.

[View Offline Queue]
```

---

# 80 — Testing Strategy

## Unit Tests

Test:

* confidence calculations
* formatters
* permissions
* reducers
* sync state transitions

## Component Tests

Test:

* incident cards
* status badges
* filters
* map drawers
* task states
* offline indicators

## Integration Tests

Test:

```text
API → Query Cache → UI

Offline Write → IndexedDB → Sync → API

Alert → Related Incident → Task
```

## End-to-End Tests

Critical journey:

```text
Login
→ Submit Incident
→ Lose Connection
→ Save Offline
→ Reconnect
→ Sync
→ Verify
→ Create Task
→ Complete
→ Audit
```

---

# 81 — Documentation Deliverables

The repository should include:

```text
OpenAPI 3.1
ERD
Database Schema
Architecture Decision Records
Sync Strategy
Trust Scoring Specification
Deployment Guide
Role / Permission Matrix
Demo Dataset Documentation
```

Recommended structure:

```text
docs/
├── product/
├── architecture/
├── api/
├── schemas/
├── security/
├── offline-sync/
├── trust-model/
└── deployment/
```

---

# 82 — Monorepo Structure

```text
atlas-sanctum-mandera/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── maps/
│   └── validation/
│
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── api/
│   ├── schemas/
│   ├── deployment/
│   └── security/
│
├── infra/
│   ├── docker/
│   ├── postgres/
│   ├── redis/
│   └── nginx/
│
└── README.md
```

---

# 83 — Deployment Architecture

Initial deployment can use:

```text
Browser / PWA
      ↓
CDN / Reverse Proxy
      ↓
Next.js Frontend
      ↓
Laravel / NestJS API
      ↓
PostgreSQL + PostGIS
      ↓
Redis
      ↓
Background Workers
      ↓
S3-Compatible Storage
```

Future edge mode:

```text
FIELD NODE
   ↓
LOCAL DATA STORE
   ↓
LOCAL API / SYNC AGENT
   ↓
INTERMITTENT SATELLITE / CELLULAR
   ↓
CENTRAL PLATFORM
```

---

# 84 — MVP Delivery Scope

The first implementation should deliver:

### Backend

```text
Authentication
RBAC
Incident API
Verification API
Resource API
Actor API
Task API
Alert API
Audit API
Sync API
PostGIS schema
Redis jobs
Seed data
```

### Frontend

```text
Login
Command Dashboard
Incident Feed
Incident Detail
Operations Map
Resource Dashboard
Coordination Board
Alerts Center
Admin Console
Offline Capture
Sync Queue
```

### Documentation

```text
OpenAPI
ERD
Architecture
Seed Data
Deployment
Trust Scoring
Offline Sync
```

---

# 85 — What Not to Build in V1

Avoid prematurely building:

```text
Full AI autonomous response
Large-scale predictive surveillance
Complex microservice infrastructure
Real classified-data integrations
Overengineered blockchain layers
Sophisticated sensor-fusion platforms
Nationwide deployment tooling
```

First make the core operational loop reliable.

---

# 86 — The Core Operational Loop

The entire MVP can be understood as:

```text
REPORT
   ↓
VERIFY
   ↓
LOCATE
   ↓
CORRELATE
   ↓
ALERT
   ↓
ASSIGN
   ↓
RESPOND
   ↓
VERIFY OUTCOME
   ↓
AUDIT
```

That loop is the heart of Atlas Sanctum Mandera.

---

# 87 — Product North Star

The platform should never overwhelm operators with information for its own sake.

The purpose is to shorten the distance between:

> **signal**

and

> **trusted action.**

A good field intelligence interface lets an operator move from:

```text
“I've just heard something.”
```

to:

```text
“Here is what happened,
here is how trustworthy it is,
here is where it is,
here is who is responding,
and here is what needs to happen next.”
```

---

# 88 — Final System Model

```text
                         FIELD REALITY
                              │
                ┌─────────────┼─────────────┐
                ↓             ↓             ↓
             REPORTS       SENSORS       OBSERVATIONS
                │             │             │
                └─────────────┼─────────────┘
                              ↓
                        VERIFICATION
                              │
                              ↓
                         TRUST SCORE
                              │
                              ↓
                    GEOSPATIAL CONTEXT
                              │
                              ↓
                       RISK / ALERTS
                              │
                              ↓
                       RESPONSE TASK
                              │
                              ↓
                       ACTOR + RESOURCE
                              │
                              ↓
                         FIELD ACTION
                              │
                              ↓
                           OUTCOME
                              │
                              ↓
                           AUDIT
                              │
                              └──────────────↺
```

---

# Atlas Sanctum Mandera

## **Frontier intelligence for trusted action.**

Atlas Sanctum Mandera is designed to operate where information is incomplete, connectivity is unreliable, conditions change quickly, and decisions carry real consequences.

It does not attempt to eliminate uncertainty.

It makes uncertainty **visible, structured, and actionable**.

It does not assume every report is true.

It creates a process for determining what deserves trust.

It does not stop at awareness.

It connects awareness to:

**people, resources, tasks, response, and accountability.**

> **Observe carefully. Verify deliberately. Coordinate decisively. Record everything.**
