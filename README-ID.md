Baca ini dalam bahasa lain: [English](README.md)

Repository Frontend: [Frontend](https://github.com/petrabayu/dss-camera-frontend)

# Sistem Pendukung Keputusan untuk Pemilihan Kamera Digital (Backend)

## **Deskripsi**

Aplikasi Sistem Pendukung Keputusan berbasis web yang dirancang untuk membantu pengguna dalam memilih kamera digital yang paling sesuai berdasarkan beberapa kriteria seperti kualitas gambar, performa, harga, kualitas video, dan kemudahan penggunaan. Aplikasi ini memanfaatkan metode Analytical Hierarchy Process (AHP) untuk pembobotan kriteria dan metode Technique for Order Preference by Similarity to Ideal Solution (TOPSIS) untuk pemeringkatan akhir.

## **Dataset**

Dataset yang digunakan dapat diunduh di sini: [Digital Camera Specifications Dataset](https://www.kaggle.com/datasets/petrabayupangestu/camaera-digital-specification)

## **Fitur**

- CRUD Kamera Digital,
- Perbandingan Berpasangan menggunakan metode AHP,
- Pemeringkatan kamera terbaik berdasarkan preferensi menggunakan metode TOPSIS.

## **Tech Stack**

- **Frontend:** React Vite, Tailwind, Axios, ChartJs,
- **Backend:** NodeJS, ExpressJS,
- **Database:** MySQL.

## **API Endpoint**

### **Kamera Endpoint**

| Method | Endpoint                | Deskripsi                             |
| ------ | ----------------------- | ------------------------------------- |
| POST   | `/api/cameras/`         | Membuat data kamera baru              |
| GET    | `/api/cameras/`         | Mengambil semua data kamera           |
| GET    | `/api/cameras/:id`      | Mengambil data kamera berdasarkan id  |
| POST   | `/api/cameras/selected` | Mendapatkan data kamera yang terpilih |
| PUT    | `/api/cameras/:id`      | Merubah data kamera berdasarkan id    |
| DELETE | `/api/cameras/:id`      | Menghapus data kamera berdasarkan id  |

### **Bobot AHP Endpoint**

| Method | Endpoint                  | Deskripsi                                  |
| ------ | ------------------------- | ------------------------------------------ |
| POST   | `/api/ahp-weights/`       | Membuat nilai bobot AHP baru               |
| GET    | `/api/ahp-weights/latest` | Mendapatkan nilai bobot AHP terbaru        |
| GET    | `/api/ahp-weights/:id`    | Mendapatkan nilai bobot AHP berdasarkan id |

### **Perhitungan TOPSIS Endpoint**

| Method | Endpoint                     | Deskripsi                                           |
| ------ | ---------------------------- | --------------------------------------------------- |
| POST   | `/api/topsis-scores/`        | Membuat nilai TOPSIS baru                           |
| GET    | `/api/topsis-scores/ranking` | Mendapatkan data rangking terbaru pada nilai TOPSIS |
| POST   | `/api/topsis-calculation/`   | Melakukan perhitungan TOPSIS                        |

## **Instalasi**

1. Klon dan jalankan backend dengan mengikuti petunjuk di bawah ini:

```bash
git clone https://github.com/petrabayu/dss-camera-backend.git

cd dss-camera-backend

npm install

npm start
```

2. Server akan berjalan pada `http://localhost:3000` secara bawaan.

   > **CATATAN:** Jika Anda lebih suka menggunakan port yang berbeda, silakan perbarui port backend dan sesuaikan API endpoint pada bagian frontend juga.

3. Siapkan `.env` and isi environment variables yang diperlukan.

```env
PORT = 3000
DB_HOST = 'your_host'
DB_USER = 'your_db_root'
DB_PASSWORD = 'your_db_password'
DB_SCHEMA = 'your_db_schema'
```

4. Dilanjutkan dengan mengkloning dan menjalankan program frontend: [SPK-Frontend](https://github.com/petrabayu/dss-camera-frontend),

## **Kontak**

**Dibuat oleh petrabayu - [LinkedIn](https://www.linkedin.com/in/petrabayu/) - petrabayu19@gmail.com**
