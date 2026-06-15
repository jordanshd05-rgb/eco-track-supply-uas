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

export interface SupplyItem {
  id: string;
  namaBarang: string;
  vendor: string;
  kategori: string;
  jumlah: number;
  statusEmisi: string;
  jejakKarbonKg: number;
  lokasiGudang: string;
  createdAt?: string;
}
