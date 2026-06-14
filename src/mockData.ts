import { TeamMember, EndpointInfo, PracticeStep, Shipment, EmissionAudit } from './types';

export const teamMembers: TeamMember[] = [
  { name: 'Jordan Shahadad', nim: '2405903040042', role: 'DevOps Engineer & System Integration Tester' },
  { name: 'Marfirah Julia Darma', nim: '2405903040051', role: 'Quality Assurance & Technical Writer' },
  { name: 'Muhammad Yusar', nim: '2405903040061', role: 'System Architect & Lead Backend Developer' },
  { name: 'Nazila Audia Putri', nim: '2405903040063', role: 'UI/UX Designer & Frontend Developer' },
  { name: 'Rosalia Amanda', nim: '2405903040082', role: 'Fullstack Engineer & API Designer' }
];

export const endpoints: EndpointInfo[] = [
  {
    method: 'GET',
    path: '/api/docs',
    auth: 'None (Public)',
    description: 'Mengakses file basis dokumentasi swagger/open-api dan petunjuk teknis layanan terintegrasi.',
    status: '200 OK',
    category: 'Sistem & Core'
  },
  {
    method: 'GET',
    path: '/api/v1/shipments',
    auth: 'Bearer Token (Optional)',
    description: 'Menampilkan seluruh daftar manifest pengiriman logistik dalam pangkalan data in-memory.',
    status: '200 OK / 500 Error',
    category: 'Shipment Modul'
  },
  {
    method: 'GET',
    path: '/api/v1/shipments/:id',
    auth: 'Bearer Token (Optional)',
    description: 'Mencari dan menampilkan detail manifest pengiriman logistik berdasarkan parameter ID.',
    status: '200 OK / 404 Not Found',
    category: 'Shipment Modul'
  },
  {
    method: 'POST',
    path: '/api/v1/shipments',
    auth: 'Bearer Token',
    description: 'Menambahkan data manifest pengiriman logistik baru dengan kalkulasi awal status pengiriman.',
    status: '201 Created / 400 Bad Request',
    category: 'Shipment Modul'
  },
  {
    method: 'PUT',
    path: '/api/v1/shipments/:id',
    auth: 'Bearer Token',
    description: 'Memutakhirkan atribut manifest pengiriman (titik jemput, tujuan, status, berat barangan).',
    status: '200 OK / 404 Not Found / 400 Bad Request',
    category: 'Shipment Modul'
  },
  {
    method: 'DELETE',
    path: '/api/v1/shipments/:id',
    auth: 'Bearer Token',
    description: 'Menghapus data manifest secara permanen dan melakukan cascade audit emisi terkait.',
    status: '200 OK / 404 Not Found',
    category: 'Shipment Modul'
  },
  {
    method: 'GET',
    path: '/api/v1/emissions',
    auth: 'None (Public)',
    description: 'Menampilkan riwayat menyeluruh dari hasil audit kalkulasi emisi logistik rute pengiriman.',
    status: '200 OK',
    category: 'Emisi & Tax Modul'
  },
  {
    method: 'GET',
    path: '/api/v1/emissions/:id',
    auth: 'None (Public)',
    description: 'Menampilkan berkas rincian log audit penghitungan emisi secara mendalam berdasarkan ID emisi.',
    status: '200 OK / 404 Not Found',
    category: 'Emisi & Tax Modul'
  },
  {
    method: 'POST',
    path: '/api/v1/emissions',
    auth: 'Bearer Token',
    description: 'Menerbitkan laporan pencatatan audit emisi baru berlandaskan berat kiriman dan faktor emisi IPCC.',
    status: '201 Created / 400 Bad Request / 404 Shipment Not Found',
    category: 'Emisi & Tax Modul'
  },
  {
    method: 'PUT',
    path: '/api/v1/emissions/:id',
    auth: 'Bearer Token',
    description: 'Membuka akses otentikasi verifikasi kelayakan bayar pajak karbon (Carbon Tax status).',
    status: '200 OK / 404 Not Found',
    category: 'Emisi & Tax Modul'
  },
  {
    method: 'DELETE',
    path: '/api/v1/emissions/:id',
    auth: 'Bearer Token',
    description: 'Memusnahkan rekaman log emisi dari sistem audit tanpa merusak data manifest pengiriman utama.',
    status: '200 OK / 404 Not Found',
    category: 'Emisi & Tax Modul'
  }
];

export const projectFolderTree = `eco-track-supply-api/
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js (Express server entrypoint)
├── src/
│   ├── config/
│   │   └── database.js (In-Memory Database engine)
│   ├── controllers/
│   │   ├── shipmentController.js
│   │   └── emissionController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── schema.js (Data schemas definition)
│   ├── routes/
│   │   ├── shipmentRoutes.js
│   │   ├── emissionRoutes.js
│   │   └── docRoutes.js
│   └── utils/
│       └── carbonCalculator.js (IPCC carbon formula & Tax logic)
└── tests/
    ├── shipment.test.js
    └── emission.test.js`;

export const initialShipments: Shipment[] = [
  {
    id: "SHIP-001",
    origin: "Jakarta (Pelabuhan Tanjung Priok)",
    destination: "Banda Aceh (Pelabuhan Malahayati)",
    weightKg: 4500,
    cargoType: "Electronic Components & Hardware",
    status: "IN_TRANSIT",
    createdAt: "2026-06-10T08:30:00Z"
  },
  {
    id: "SHIP-002",
    origin: "Surabaya (Terminal Teluk Lamong)",
    destination: "Meulaboh (Universitas Teuku Umar)",
    weightKg: 12000,
    cargoType: "Heavy Machinery Parts & Steel",
    status: "PENDING",
    createdAt: "2026-06-11T14:45:00Z"
  },
  {
    id: "SHIP-003",
    origin: "Medan (Belawan Logistics Hub)",
    destination: "Meulaboh (Sujat Cargo Hub)",
    weightKg: 1800,
    cargoType: "Organic Fertilizer & Farming Kits",
    status: "DELIVERED",
    createdAt: "2026-06-08T09:15:00Z"
  }
];

export const initialEmissions: EmissionAudit[] = [
  {
    id: "EMI-201",
    shipmentId: "SHIP-003",
    carbonOutputKg: 388.8, // 1800 * 0.216
    carbonTaxIdr: 11664,  // 388.8 * 30 rupiah
    verified: true,
    auditedAt: "2026-06-08T11:20:00Z"
  },
  {
    id: "EMI-202",
    shipmentId: "SHIP-001",
    carbonOutputKg: 972.0, // 4500 * 0.216
    carbonTaxIdr: 29160,  // 972 * 30 rupiah
    verified: false,
    auditedAt: "2026-06-10T11:00:00Z"
  }
];

export const practiceSteps: PracticeStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "AKSES ROOT DOKUMENTASI (GET /api/docs)",
    method: "GET",
    endpoint: "/api/docs",
    description: "Langkah awal pengujian ini bertujuan menguji ketersediaan serta kesiapan service api. Sistem merespons dengan menampilkan informasi status platform, deskripsi projek, mata kuliah, tahun ajaran, dan status persentase uptime system integrasi.",
    technicalAnalysis: "Route mengembalikan respons payload JSON statis yang bertindak sebagai landasan sistem dokumentasi mandiri. Status 200 OK mewakili tidak adanya kemacetan thread pada service logistik.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "status": "online",
  "app": "Eco-Track Supply API",
  "version": "1.0.0",
  "course": "Integrasi Sistem (3 SKS)",
  "semester": "Genap T.A. 2025/2026",
  "institution": "Universitas Teuku Umar",
  "developer": "Kelompok 4 - Teknologi Informasi",
  "uptimeSeconds": 14520,
  "endpointsCount": 11
}`,
    imageFileName: "foto-praktik-01.png"
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "LIHAT SEMUA DATA PENGIRIMAN (GET /api/v1/shipments)",
    method: "GET",
    endpoint: "/api/v1/shipments",
    description: "Langkah ini memanggil seluruh data manifest logistik log pengiriman yang diletakkan dalam database in-memory concurrent. Digunakan oleh instansi regulator logistik maupun admin gudang dalam memantau bobot sebaran muatan logistik.",
    technicalAnalysis: "Mengambil data array dari modul penampung. Response Headers diatur dengan format 'Content-Type: application/json'. Respons menyajikan performa query sub 5 milidetik karena basis in-memory array.",
    expectedResponseStatus: 200,
    expectedResponseJson: `[
  {
    "id": "SHIP-001",
    "origin": "Jakarta (Pelabuhan Tanjung Priok)",
    "destination": "Banda Aceh (Pelabuhan Malahayati)",
    "weightKg": 4500,
    "cargoType": "Electronic Components & Hardware",
    "status": "IN_TRANSIT",
    "createdAt": "2026-06-10T08:30:00Z"
  },
  {
    "id": "SHIP-002",
    "origin": "Surabaya (Terminal Teluk Lamong)",
    "destination": "Meulaboh (Universitas Teuku Umar)",
    "weightKg": 12000,
    "cargoType": "Heavy Machinery Parts & Steel",
    "status": "PENDING",
    "createdAt": "2026-06-11T14:45:00Z"
  },
  {
    "id": "SHIP-003",
    "origin": "Medan (Belawan Logistics Hub)",
    "destination": "Meulaboh (Sujat Cargo Hub)",
    "weightKg": 1800,
    "cargoType": "Organic Fertilizer & Farming Kits",
    "status": "DELIVERED",
    "createdAt": "2026-06-08T09:15:00Z"
  }
]`,
    imageFileName: "foto-praktik-02.png"
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "LIHAT DATA PENGIRIMAN SPESIFIK (GET /api/v1/shipments/:id)",
    method: "GET",
    endpoint: "/api/v1/shipments/SHIP-001",
    description: "Langkah pemanggilan data dengan filter parameter ID spesifik, yakni manifest logistik berkode 'SHIP-001'. Membantu proses integrasi data emisi untuk merujuk pada berat muatan yang presisi.",
    technicalAnalysis: "Sistem mencari elemen dengan mencocokkan parameter req.params.id pada array manifest. Jika ditemukan, detail single objek dikembalikan secara instan.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "data": {
    "id": "SHIP-001",
    "origin": "Jakarta (Pelabuhan Tanjung Priok)",
    "destination": "Banda Aceh (Pelabuhan Malahayati)",
    "weightKg": 4500,
    "cargoType": "Electronic Components & Hardware",
    "status": "IN_TRANSIT",
    "createdAt": "2026-06-10T08:30:00Z"
  },
  "message": "Shipment found successfully"
}`,
    imageFileName: "foto-praktik-03.png"
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "TAMBAH DATA PENGIRIMAN BARU (POST /api/v1/shipments)",
    method: "POST",
    endpoint: "/api/v1/shipments",
    description: "Langkah merekam manifest baru ke dalam server. Pengujian ini mengirimkan muatan barangan baru yang nantinya akan diteruskan ke modul kalkulator emisi.",
    technicalAnalysis: "Payload divalidasi secara ketat mencakup field 'origin', 'destination', 'weightKg', dan 'cargoType'. Id otomatis digenerate secara sekuensial atau acak aman.",
    requestBody: `{
  "origin": "Semarang (Tanjung Emas)",
  "destination": "Meulaboh (Pelabuhan Bubon)",
  "weightKg": 6200,
  "cargoType": "Medical Protection Kits & Vaccines"
}`,
    expectedResponseStatus: 201,
    expectedResponseJson: `{
  "success": true,
  "message": "New shipment manifest successfully registered",
  "data": {
    "id": "SHIP-004",
    "origin": "Semarang (Tanjung Emas)",
    "destination": "Meulaboh (Pelabuhan Bubon)",
    "weightKg": 6200,
    "cargoType": "Medical Protection Kits & Vaccines",
    "status": "PENDING",
    "createdAt": "2026-06-12T03:02:52Z"
  }
}`,
    imageFileName: "foto-praktik-04.png"
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "UPDATE DATA PENGIRIMAN (PUT /api/v1/shipments/:id)",
    method: "PUT",
    endpoint: "/api/v1/shipments/SHIP-002",
    description: "Langkah ini bertujuan melakukan perubahan status penanganan muatan 'SHIP-002' dari status 'PENDING' menjadi 'IN_TRANSIT' sekaligus merevisi ulang parameter berat muatannya karena ada penambahan kargo.",
    technicalAnalysis: "Sistem mencari index shipment yang bersangkutan, kemudian menggabungkan properti lama dengan payload baru via operator spread. Berhasil memperbarui in-memory data secara real-time.",
    requestBody: `{
  "weightKg": 12500,
  "status": "IN_TRANSIT",
  "cargoType": "Heavy Machinery Parts, Steel & Zinc Sheets"
}`,
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Shipment status and weight successfully updated",
  "data": {
    "id": "SHIP-002",
    "origin": "Surabaya (Terminal Teluk Lamong)",
    "destination": "Meulaboh (Universitas Teuku Umar)",
    "weightKg": 12500,
    "cargoType": "Heavy Machinery Parts, Steel & Zinc Sheets",
    "status": "IN_TRANSIT",
    "createdAt": "2026-06-11T14:45:00Z"
  }
}`,
    imageFileName: "foto-praktik-05.png"
  },
  {
    id: "step-6",
    stepNumber: "06",
    title: "HAPUS DATA PENGIRIMAN (DELETE /api/v1/shipments/:id)",
    method: "DELETE",
    endpoint: "/api/v1/shipments/SHIP-003",
    description: "Uji coba menghapuskan kargo pengiriman. Penghapusan ini memicu pembersihan terstruktur pada database agar data yang tidak valid atau dibatalkan dibersihkan total demi integritas memori.",
    technicalAnalysis: "Melakukan penghapusan item pengiriman dari database. Jika berhasil, sistem mengonfirmasi status sukses. Hal ini juga otomatis menghapus audit emisi terkait (cascade delete logic).",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Shipment SHIP-003 has been deleted, associated emission audit reports have been purged",
  "deletedId": "SHIP-003"
}`,
    imageFileName: "foto-praktik-06.png"
  },
  {
    id: "step-7",
    stepNumber: "07",
    title: "LIHAT SEMUA RIWAYAT AUDIT EMISI (GET /api/v1/emissions)",
    method: "GET",
    endpoint: "/api/v1/emissions",
    description: "Modul ke-2 diaktifkan dengan mengambil seluruh riwayat audit kalkulasi emisi logistik yang tercatat dari operasional Green Logistics perusahaan logistik mitra UTU.",
    technicalAnalysis: "Melakukan query global pada entitas log audit emisi. Nilai emisi yang terbit memaparkan jumlah sumbangan gas CO2 dalam kg berlandaskan koefisien standar lingkungan global.",
    expectedResponseStatus: 200,
    expectedResponseJson: `[
  {
    "id": "EMI-201",
    "shipmentId": "SHIP-003",
    "carbonOutputKg": 388.8,
    "carbonTaxIdr": 11664,
    "verified": true,
    "auditedAt": "2026-06-08T11:20:00Z"
  },
  {
    "id": "EMI-202",
    "shipmentId": "SHIP-001",
    "carbonOutputKg": 972.0,
    "carbonTaxIdr": 29160,
    "verified": false,
    "auditedAt": "2026-06-10T11:00:00Z"
  }
]`,
    imageFileName: "foto-praktik-07.png"
  },
  {
    id: "step-8",
    stepNumber: "08",
    title: "LIHAT DETAIL LOG EMISI SPESIFIK (GET /api/v1/emissions/:id)",
    method: "GET",
    endpoint: "/api/v1/emissions/EMI-201",
    description: "Mencari data log emisi yang lebih spesifik berdasarkan kode ID Emisi untuk keperluan audit pelaporan kelayakan industri.",
    technicalAnalysis: "Ekstraksi record array emissions dengan pencocokan parameter ID. Mengembalikan berkas objek emisi lengkap terintegrasi.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "data": {
    "id": "EMI-201",
    "shipmentId": "SHIP-003",
    "carbonOutputKg": 388.8,
    "carbonTaxIdr": 11664,
    "verified": true,
    "auditedAt": "2026-06-08T11:20:00Z"
  }
}`,
    imageFileName: "foto-praktik-08.png"
  },
  {
    id: "step-9",
    stepNumber: "09",
    title: "UJI VALIDASI DATA RELASI (POST /api/v1/emissions) - SCENARIO ERROR",
    method: "POST",
    endpoint: "/api/v1/emissions",
    description: "Skenario pengujian kegagalan rukun integritas relasional data API. Kita sengaja melayangkan request audit emisi untuk manifest ID non-aktif 'SHIP-999' yang sama sekali tidak ada di database manifest logistik.",
    technicalAnalysis: "Sistem pencegah kegagalan (Validator Guard) berjalan sebelum formula diproses. Sistem mencari kecocokan berkas shipmentId produk. Karena 'SHIP-999' tidak ada, rute dihentikan dan melempar sanksi status 404.",
    requestBody: `{
  "shipmentId": "SHIP-999"
}`,
    expectedResponseStatus: 404,
    expectedResponseJson: `{
  "success": false,
  "error": "FOREIGN_KEY_VIOLATION",
  "message": "Referenced Shipment ID 'SHIP-999' is not registered in the system. Audit aborted."
}`,
    imageFileName: "foto-praktik-09.png"
  },
  {
    id: "step-10",
    stepNumber: "10",
    title: "CATAT EMISI KARBON VALID (POST /api/v1/emissions) - SCENARIO SUKSES",
    method: "POST",
    endpoint: "/api/v1/emissions",
    description: "Mendaftarkan log audit emisi baru dengan merujuk pada manifest valid 'SHIP-001' yang memiliki kargo berat muatan sebesar 4500 kg. Sistem menghitung besaran emisi dengan formula IPCC (muatan * 0.216) dan Carbon Tax Assessment senilai Rp 30 per kg emisi.",
    technicalAnalysis: "Sistem mendeteksi validitas shipmentId 'SHIP-001', menarik data berat (4500 kg), lalu mengaktifkan modul utilities: Carbon Emisi = 4500 * 0.216 = 972.0 kg CO2. Carbon Tax = 972.0 * Rp 30 = Rp 29.160. Log kemudian disimpan di memori.",
    requestBody: `{
  "shipmentId": "SHIP-001"
}`,
    expectedResponseStatus: 201,
    expectedResponseJson: `{
  "success": true,
  "message": "Emission audit calculated and logged successfully",
  "data": {
    "id": "EMI-203",
    "shipmentId": "SHIP-001",
    "carbonOutputKg": 972,
    "carbonTaxIdr": 29160,
    "verified": false,
    "auditedAt": "2026-06-12T03:02:52Z"
  }
}`,
    imageFileName: "foto-praktik-10.png"
  },
  {
    id: "step-11",
    stepNumber: "11",
    title: "UPDATE STATUS VERIFIKASI EMISI (PUT /api/v1/emissions/:id)",
    method: "PUT",
    endpoint: "/api/v1/emissions/EMI-202",
    description: "Pembaruan status verifikasi emisi hijau. Log audit 'EMI-202' diubah status verifikasinya menjadi true oleh instansi berwenang, menandai kewajiban pembayaran pajak karbon telah disepakati dan dihitung akurat.",
    technicalAnalysis: "Controller mengubah properti 'verified' menjadi true berdasarkan data pencocokan req.params.id pada index database emissions.",
    requestBody: `{
  "verified": true
}`,
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Emission audit verification status updated to VERIFIED",
  "data": {
    "id": "EMI-202",
    "shipmentId": "SHIP-001",
    "carbonOutputKg": 972,
    "carbonTaxIdr": 29160,
    "verified": true,
    "auditedAt": "2026-06-10T11:00:00Z"
  }
}`,
    imageFileName: "foto-praktik-11.png"
  },
  {
    id: "step-12",
    stepNumber: "12",
    title: "HAPUS LOG AUDIT EMISI (DELETE /api/v1/emissions/:id)",
    method: "DELETE",
    endpoint: "/api/v1/emissions/EMI-202",
    description: "Langkah ini dipergunakan apabila dokumen berkas log audit emisi terjadi salah input atau terjadi penataan ulang sirkulasi data emisi secara legal oleh auditor eksternal tanpa mengusik database pengiriman.",
    technicalAnalysis: "Sistem mencari file record dengan ID 'EMI-202', mengeksekusi operasi penghapusan item index array emisi dan menyajikan response body kepastian pembersihan data.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Emission audit record 'EMI-202' has been permanently deleted from storage.",
  "deletedId": "EMI-202"
}`,
    imageFileName: "foto-praktik-12.png"
  }
];
