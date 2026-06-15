import { TeamMember, EndpointInfo, PracticeStep, SupplyItem } from './types';

export const teamMembers: TeamMember[] = [
  { name: 'Jordan Shahadad', nim: '2405903040042', role: '' },
  { name: 'Marfirah Julia Darma', nim: '2405903040051', role: '' },
  { name: 'Muhammad Yusar', nim: '2405903040061', role: '' },
  { name: 'Nazila Audia Putri', nim: '2405903040063', role: '' },
  { name: 'Rosalia Amanda', nim: '2405903040082', role: '' }
];

export const endpoints: EndpointInfo[] = [
  {
    method: 'GET',
    path: '/api/shipments',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Mengambil seluruh daftar pengiriman fisik dari inventori logistik dan gudang.',
    status: '200 OK / 401 Unauthorized',
    category: 'Shipment Modul'
  },
  {
    method: 'GET',
    path: '/api/shipments/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Mengambil satu detail data manifes logistik fisik berdasarkan ID (format TRK-XXX).',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Shipment Modul'
  },
  {
    method: 'POST',
    path: '/api/shipments',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Menambahkan data manifes pengiriman baru ke sistem logistik.',
    status: '201 Created / 400 Bad Request / 401 Unauthorized',
    category: 'Shipment Modul'
  },
  {
    method: 'PUT',
    path: '/api/shipments/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Memperbarui parameter fisik (stok/jumlah & lokasi gudang) pada manifes barang.',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Shipment Modul'
  },
  {
    method: 'DELETE',
    path: '/api/shipments/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Menghapus data manifes pengiriman fisik secara permanen dari pangkalan data.',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Shipment Modul'
  },
  {
    method: 'GET',
    path: '/api/tracks',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Mengambil ringkasan audit keberlanjutan dan jejak emisi emisi karbon dari seluruh barang.',
    status: '200 OK / 401 Unauthorized',
    category: 'Carbon Modul'
  },
  {
    method: 'GET',
    path: '/api/tracks/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Mengambil status detail audit karbon dan status emisi barang secara spesifik.',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Carbon Modul'
  },
  {
    method: 'POST',
    path: '/api/tracks',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Melakukan registrasi pencatatan audit emisi baru secara manual dan mandiri ke sistem.',
    status: '201 Created / 400 Bad Request / 401 Unauthorized',
    category: 'Carbon Modul'
  },
  {
    method: 'PUT',
    path: '/api/tracks/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Memperbarui status keberlanjutan emisi beserta bobot emisi hasil kalkulasi audit lapangan.',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Carbon Modul'
  },
  {
    method: 'DELETE',
    path: '/api/tracks/:id',
    auth: 'x-api-key: ecotrack2026uas',
    description: 'Mengatur ulang (reset) atau menghapus log emisi barang kembali ke default ("Pending Audit", karbon: 0).',
    status: '200 OK / 404 Not Found / 401 Unauthorized',
    category: 'Carbon Modul'
  }
];

export const projectFolderTree = `eco-track-api/
├── src/
│   ├── data/
│   │   └── supplies.js        <-- Sumber data mentah logistik & emisi (Array of Objects)
│   ├── middleware/
│   │   ├── apiKey.js          <-- Middleware keamanan x-api-key (Menjaga rute shipments & tracks)
│   │   └── logger.js          <-- Middleware tracker log request masuk di terminal
│   ├── routes/
│   │   ├── docsRoutes.js      <-- Jalur rute dokumentasi JSON (/api/docs) sesuai pesanan dosen
│   │   ├── shipmentRoutes.js  <-- Jalur rute full CRUD untuk manajemen fisik pengiriman barang
│   │   └── trackRoutes.js     <-- Jalur rute full CRUD untuk manajemen audit emisi karbon
│   └── server.js              <-- Entry point utama server Express (Port 3001) & rute induk (/)
├── .gitignore                 <-- Mengabaikan folder node_modules/ agar repositori GitHub tetap ringan
├── package.json               <-- File konfigurasi dependencies proyek Node.js (Express, dll)
└── package-lock.json          <-- Pengunci versi library agar lingkungan tim tetap sinkron`;

export const initialSupplies: SupplyItem[] = [
  {
    id: "TRK-001",
    namaBarang: "Kardus Daur Ulang",
    vendor: "PT Eco Packindo",
    kategori: "Packaging",
    jumlah: 2500,
    statusEmisi: "Low Carbon",
    jejakKarbonKg: 120.5,
    lokasiGudang: "Gudang Utama Meulaboh"
  },
  {
    id: "TRK-002",
    namaBarang: "Palet Kayu Ramah Lingkungan",
    vendor: "Indo Forest Corp",
    kategori: "Container",
    jumlah: 1200,
    statusEmisi: "Pending Audit",
    jejakKarbonKg: 0.0,
    lokasiGudang: "Gudang Semarang Timur"
  },
  {
    id: "TRK-003",
    namaBarang: "Kantong Pati Singkong",
    vendor: "PT BioPlast Nusantara",
    kategori: "Packaging",
    jumlah: 8000,
    statusEmisi: "Net Zero Emission",
    jejakKarbonKg: 0.0,
    lokasiGudang: "Gudang Distribusi Barat"
  }
];

export const practiceSteps: PracticeStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "UJI VALIDASI KUNCI KEAMANAN (GET /api/shipments) - SCENARIO ERROR",
    method: "GET",
    endpoint: "/api/shipments",
    description: "Skenario pengujian keandalan apiKeyMiddleware. Kami mencoba menembak endpoint shipments tanpa menyertakan custom header x-api-key di Postman untuk menguji filter otentikasi.",
    technicalAnalysis: "Sebelum request diteruskan ke routes handler, Express mengevaluasi request headers. Karena x-api-key absen, pemrosesan diputus dengan mengembalikan status 401 Unauthorized.",
    expectedResponseStatus: 401,
    expectedResponseJson: `{
  "success": false,
  "message": "Unauthorized: x-api-key header is missing or invalid!"
}`,
    imageFileName: "foto-praktik-01.png"
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "LIHAT SEMUA SHIPMENTS VALID (GET /api/shipments) - SCENARIO SUKSES",
    method: "GET",
    endpoint: "/api/shipments",
    description: "Mengambil daftar seluruh berkas pengiriman fisik logistik dari pangkalan data in-memory supplies.js dengan memasukkan x-api-key: ecotrack2026uas pada request di Postman.",
    technicalAnalysis: "Request lolos dari sensor apiKey.js. Nilai array supplies disaring untuk merender bagian detail operasional logistik fisik, merespons dengan status 200 OK dalam format JSON.",
    expectedResponseStatus: 200,
    expectedResponseJson: `[
  {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "vendor": "PT Eco Packindo",
    "kategori": "Packaging",
    "jumlah": 2500,
    "lokasiGudang": "Gudang Utama Meulaboh"
  },
  {
    "id": "TRK-002",
    "namaBarang": "Palet Kayu Ramah Lingkungan",
    "vendor": "Indo Forest Corp",
    "kategori": "Container",
    "jumlah": 1200,
    "lokasiGudang": "Gudang Semarang Timur"
  },
  {
    "id": "TRK-003",
    "namaBarang": "Kantong Pati Singkong",
    "vendor": "PT BioPlast Nusantara",
    "kategori": "Packaging",
    "jumlah": 8000,
    "lokasiGudang": "Gudang Distribusi Barat"
  }
]`,
    imageFileName: "foto-praktik-02.png"
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "LIHAT SHIPMENT SECARA SPESIFIK (GET /api/shipments/:id)",
    method: "GET",
    endpoint: "/api/shipments/TRK-001",
    description: "Memanggil rincian manifes fisik tunggal bersandikan ID khusus 'TRK-001' untuk pelacakan pergerakan stok real-time.",
    technicalAnalysis: "Rute mencocokkan parameter ID di endpoint URL terhadap penampung array. Jika ID terdaftar, objek target ditarik dan disajikan secara instan dalam hitungan di bawah 5ms.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "data": {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "vendor": "PT Eco Packindo",
    "kategori": "Packaging",
    "jumlah": 2500,
    "lokasiGudang": "Gudang Utama Meulaboh"
  },
  "message": "Shipment info retrieved successfully."
}`,
    imageFileName: "foto-praktik-03.png"
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "REGISTRASI MANIFES SHIPMENT BARU (POST /api/shipments)",
    method: "POST",
    endpoint: "/api/shipments",
    description: "Mendaftarkan satu baris manifes pengiriman baru ke dalam inventori logistik untuk memantau pasokan suplai hijau.",
    technicalAnalysis: "Request body divalidasi keabsahannya meliputi form id, namaBarang, vendor, jumlah, dan lokasiGudang. Data kemudian dipersist pada array supplies.js.",
    requestBody: `{
  "id": "TRK-003",
  "namaBarang": "Palet Kayu Sertifikasi FSC",
  "vendor": "PT Logistik Hijau Nusantara",
  "jumlah": 350,
  "lokasiGudang": "Gudang Distribusi Barat"
}`,
    expectedResponseStatus: 201,
    expectedResponseJson: `{
  "success": true,
  "message": "New shipment manifest successfully registered",
  "data": {
    "id": "TRK-003",
    "namaBarang": "Palet Kayu Sertifikasi FSC",
    "vendor": "PT Logistik Hijau Nusantara",
    "kategori": "Distribution Unit",
    "jumlah": 350,
    "statusEmisi": "Pending Audit",
    "jejakKarbonKg": 0,
    "lokasiGudang": "Gudang Distribusi Barat"
  }
}`,
    imageFileName: "foto-praktik-04.png"
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "MUTAKHIRKAN MANIFES SHIPMENT (PUT /api/shipments/:id)",
    method: "PUT",
    endpoint: "/api/shipments/TRK-003",
    description: "Mengupdate parameter kuantitas fisik (jumlah) dan reposisi area log gudang untuk melacak sebaran barang di gudang pusat Meulaboh.",
    technicalAnalysis: "Sistem mengidentifikasi array supplies bertag TRK-003, lalu menimpa parameter jumlah dan lokasiGudang sesuai kiriman payload JSON, sementara item emisi tetap konstan.",
    requestBody: `{
  "jumlah": 450,
  "lokasiGudang": "Gudang Pusat Meulaboh"
}`,
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Shipment physical details successfully updated",
  "data": {
    "id": "TRK-003",
    "namaBarang": "Palet Kayu Sertifikasi FSC",
    "vendor": "PT Logistik Hijau Nusantara",
    "kategori": "Distribution Unit",
    "jumlah": 450,
    "statusEmisi": "Pending Audit",
    "jejakKarbonKg": 0,
    "lokasiGudang": "Gudang Pusat Meulaboh"
  }
}`,
    imageFileName: "foto-praktik-05.png"
  },
  {
    id: "step-6",
    stepNumber: "06",
    title: "HAPUS DATA SHIPMENT LOGISTIK (DELETE /api/shipments/:id)",
    method: "DELETE",
    endpoint: "/api/shipments/TRK-003",
    description: "Menghapuskan atau memusnahkan penanganan manifes kargo yang dibatalkan atau kedaluwarsa secara permanen.",
    technicalAnalysis: "Record disaring keluar dari array logistik berdasarkan ID di parameter URL. Jika sukses disaring, sistem mengembalikan data konfirmasi penghapusan data.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Shipment TRK-003 has been successfully removed from storage.",
  "deletedId": "TRK-003"
}`,
    imageFileName: "foto-praktik-06.png"
  },
  {
    id: "step-7",
    stepNumber: "07",
    title: "LIHAT JEJAK KARBON GLOBAL (GET /api/tracks) - PINTU DEPARTEMEN EMISI",
    method: "GET",
    endpoint: "/api/tracks",
    description: "Memasuki pintu 2 (Carbon Tracking) untuk menarik ringkasan komparatif penataan emisi karbon dioksida CO2 dari seluruh pasokan suplai gudang.",
    technicalAnalysis: "Sistem menyajikan status emisi serta angka riil kg jejak emisi kargo dari list supplies.js untuk bahan pelaporan evaluasi AMDAL.",
    expectedResponseStatus: 200,
    expectedResponseJson: `[
  {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "statusEmisi": "Low Carbon",
    "jejakKarbonKg": 120.5
  },
  {
    "id": "TRK-002",
    "statusEmisi": "Pending Audit",
    "jejakKarbonKg": 0
  },
  {
    "id": "TRK-003",
    "namaBarang": "Kantong Pati Singkong",
    "statusEmisi": "Net Zero Emission",
    "jejakKarbonKg": 0
  }
]`,
    imageFileName: "foto-praktik-07.png"
  },
  {
    id: "step-8",
    stepNumber: "08",
    title: "PELACAKAN EMISI SPESIFIK (GET /api/tracks/:id)",
    method: "GET",
    endpoint: "/api/tracks/TRK-001",
    description: "Menampilkan berkas audit dan kalkulasi dekarbonisasi terdokumentasi teruntuk supply ID 'TRK-001'. Silakan periksa nilai emisi real.",
    technicalAnalysis: "Data ditarik bertumpu pada index ID, menyajikan parameter audit status keberlanjutan hijau.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "data": {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "statusEmisi": "Low Carbon",
    "jejakKarbonKg": 120.5
  }
}`,
    imageFileName: "foto-praktik-08.png"
  },
  {
    id: "step-9",
    stepNumber: "09",
    title: "UJI FORM VALIDATOR GUARD TRACK (POST /api/tracks) - SCENARIO ERROR",
    method: "POST",
    endpoint: "/api/tracks",
    description: "Uji coba integritas saringan keamanan input data. Kita dengan sengaja melayangkan input form audit emisi yang bermuatan ID tidak valid serta angka emisi minus (tidak dimungkinkan secara alami).",
    technicalAnalysis: "Sistem filter validasi asinkron menolak request dengan status 400 Bad Request, mencegah data cacat mempolusi pangkalan data audit emisi berkelanjutan.",
    requestBody: `{
  "id": "INVALID-ID",
  "namaBarang": "Kardus Bekas",
  "statusEmisi": "Low Carbon",
  "jejakKarbonKg": -10
}`,
    expectedResponseStatus: 400,
    expectedResponseJson: `{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "ID format must be TRK-XXX and emission output cannot be negative."
}`,
    imageFileName: "foto-praktik-09.png"
  },
  {
    id: "step-10",
    stepNumber: "10",
    title: "INPUT DATA AUDIT EKOLOGI VALID (POST /api/tracks) - SCENARIO SUKSES",
    method: "POST",
    endpoint: "/api/tracks",
    description: "Praktek menambahkan rekaman status kepedulian lingkungan secara mandiri untuk material 'Kertas Selongsong' dengan status 'Low Carbon' secara presisi di Postman.",
    technicalAnalysis: "Data lulus validasi ID (TRK-004) dan angka emisi positif. Element baru didorong ke storage, mengembalikan status 201 Created.",
    requestBody: `{
  "id": "TRK-004",
  "namaBarang": "Kertas Selongsong",
  "statusEmisi": "Low Carbon",
  "jejakKarbonKg": 45.2
}`,
    expectedResponseStatus: 201,
    expectedResponseJson: `{
  "success": true,
  "message": "New sustainability track record filed successfully",
  "data": {
    "id": "TRK-004",
    "namaBarang": "Kertas Selongsong",
    "vendor": "Pending Registry",
    "kategori": "Biodegradable Unit",
    "jumlah": 0,
    "statusEmisi": "Low Carbon",
    "jejakKarbonKg": 45.2,
    "lokasiGudang": "Unassigned Lokasi"
  }
}`,
    imageFileName: "foto-praktik-10.png"
  },
  {
    id: "step-11",
    stepNumber: "11",
    title: "TERBITKAN AUDIT STATUS EMISI (PUT /api/tracks/:id)",
    method: "PUT",
    endpoint: "/api/tracks/TRK-001",
    description: "Komitmen pemutakhiran status audit. Tim asesor memperbarui status emisi Kardus Daur Ulang menjadi 'Net Zero Emission' dengan melampirkan angka karbon 0 kg CO2 demi kepentingan sertifikasi.",
    technicalAnalysis: "Sistem mencari data TRK-001, kemudian mengubah properti statusEmisi dan jejakKarbonKg ke penampung array secara instan lalu dikembalikan sebagai respons sukses.",
    requestBody: `{
  "statusEmisi": "Net Zero Emission",
  "jejakKarbonKg": 0.0
}`,
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Audit carbon emissions and status successfully registered",
  "data": {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "vendor": "PT Eco Packindo",
    "kategori": "Packaging",
    "jumlah": 2500,
    "statusEmisi": "Net Zero Emission",
    "jejakKarbonKg": 0,
    "lokasiGudang": "Gudang Utama Meulaboh"
  }
}`,
    imageFileName: "foto-praktik-11.png"
  },
  {
    id: "step-12",
    stepNumber: "12",
    title: "MUTASIKAN/RESET LAPORAN AUDIT EMISI (DELETE /api/tracks/:id)",
    method: "DELETE",
    endpoint: "/api/tracks/TRK-001",
    description: "Menghapuskan atau menyetel ulang log emisi barang kembali ke kondisi default ('Pending Audit', jejak karbon 0 Kg) tanpa mengusik kuantitas fisik suplai.",
    technicalAnalysis: "Mereset status audit material TRK-001 kembali ke default. Sangat berguna saat terjadi kesalahan entri audit tanpa mencederai catatan manifes logistik fisik utama.",
    expectedResponseStatus: 200,
    expectedResponseJson: `{
  "success": true,
  "message": "Carbon status for TRK-001 has been reset to default Pending Audit.",
  "data": {
    "id": "TRK-001",
    "namaBarang": "Kardus Daur Ulang",
    "vendor": "PT Eco Packindo",
    "kategori": "Packaging",
    "jumlah": 2500,
    "statusEmisi": "Pending Audit",
    "jejakKarbonKg": 0,
    "lokasiGudang": "Gudang Utama Meulaboh"
  }
}`,
    imageFileName: "foto-praktik-12.png"
  }
];
