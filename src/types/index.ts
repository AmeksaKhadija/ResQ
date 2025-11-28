export enum UserRole {
  REGULATOR = "REGULATOR",
  FLEET_MANAGER = "FLEET_MANAGER",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string;
}

export enum AmbulanceStatus {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  MAINTENANCE = "MAINTENANCE",
  BREAK = "BREAK",
}

export interface Ambulance {
  id: string;
  callSign: string;
  status: AmbulanceStatus;
  latitude: number;
  longitude: number;
  equipment: string[];
  crew: string[];
  lastUpdate: string;
}

export enum IncidentSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum IncidentStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Incident {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  patientName: string;
  patientAge?: number;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
  assignedAmbulanceId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface DashboardStats {
  availableAmbulances: number;
  activeIncidents: number;
  averageResponseTime: number;
  completedToday: number;
}
