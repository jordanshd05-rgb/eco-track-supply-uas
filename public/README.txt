TEMPAT MENARUH GAMBAR SCREENSHOT POSTMAN (UNTUK PELAPORAN UAS)
=============================================================

Agar gambar tangkapan layar (screenshot) hasil pengujian Postman Anda dapat otomatis muncul di dalam tata letak aplikasi laporan ini (baik di web preview AI Studio ini maupun saat dijalankan di komputer lokal Anda):

1. Masukkan semua file foto screenshot (.png) Anda ke dalam folder `public/` ini.
2. Pastikan penamaan filenya sama persis dengan daftar di bawah ini (menggunakan huruf kecil dan strip/hyphen):

   - foto-praktik-01.png  --> Untuk Uji GET /api/docs (Akses Root)
   - foto-praktik-02.png  --> Untuk Uji GET /api/v1/shipments (Lihat Semua Shipments)
   - foto-praktik-03.png  --> Untuk Uji GET /api/v1/shipments/:id (Lihat Shipment Spesifik)
   - foto-praktik-04.png  --> Untuk Uji POST /api/v1/shipments (Tambah Shipment Baru)
   - foto-praktik-05.png  --> Untuk Uji PUT /api/v1/shipments/:id (Update Status/Berat)
   - foto-praktik-06.png  --> Untuk Uji DELETE /api/v1/shipments/:id (Hapus Shipment)
   - foto-praktik-07.png  --> Untuk Uji GET /api/v1/emissions (Lihat Semua Riwayat Emisi)
   - foto-praktik-08.png  --> Untuk Uji GET /api/v1/emissions/:id (Lihat Detail Log Emisi)
   - foto-praktik-09.png  --> Untuk Uji POST /api/v1/emissions (Validasi Error SHIP-999)
   - foto-praktik-10.png  --> Untuk Uji POST /api/v1/emissions (Catat Emisi Valid SHIP-001)
   - foto-praktik-11.png  --> Untuk Uji PUT /api/v1/emissions/:id (Update Status Verifikasi)
   - foto-praktik-12.png  --> Untuk Uji DELETE /api/v1/emissions/:id (Hapus Log Audit Emisi)

---
CARA MENAMBAHKAN FILE DI AI STUDIO ONLINE:
1. Pada menu sebelah kiri (File Explorer), klik kanan di folder `public` yang baru saya buat ini.
2. Pilih opsi "Upload Files" dan unggah file gambar Anda dari komputer Anda.
3. Setelah terunggah, refresh halaman preview Anda untuk melihat gambarnya langsung terintegrasi di dalam Bab IV laporan pengujian!

CARA MENAMBAHKAN FILE DI LAYANAN LOKAL (VS CODE / ZIP SEBELUM DI-KUMPULKAN):
1. Ekstrak ZIP projek yang sudah diunduh.
2. Cari folder bernama `public` di root projek.
3. Taruh file foto screenshot Anda di dalam folder tersebut dengan nama-nama file di atas.
4. Jalankan `npm run dev`, maka semua foto akan muncul di halaman web lokal (laporan Anda sudah 100% lengkap dan profesional)!
