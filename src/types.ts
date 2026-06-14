export interface TeamMember {
  name: string;
  nim: string;
  role: string;
}

export interface EndpointInfo {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  auth: string;
  description: string;
  status: string;
  category: string;
}

export interface PracticeStep {
  id: string;
  stepNumber: string;
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  technicalAnalysis: string;
  requestBody?: string;
  expectedResponseStatus: number;
  expectedResponseJson: string;
  imageFileName: string;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  weightKg: number;
  cargoType: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
}

export interface EmissionAudit {
  id: string;
  shipmentId: string;
  carbonOutputKg: number;
  carbonTaxIdr: number;
  verified: boolean;
  auditedAt: string;
}
