# Tugas Akhir Pengembangan Aplikasi Web 
# 👤 Kelompok 8
  1. Nasywa Rahmadhani P.S. (22/498375/TK/54665)
  2. Adji Dharmawan I. (22/499366/TK/54743)
  3. Pijarwidyanara Andhita H. (22/503741/TK/55061)
  4. M. Hilmi Dzaki Wismadi (22/497591/TK/54539)
  5. Fahrin Ulya Nisrina (22/497708/TK/54557)


# 🎵 Web App Overview
Melodify adalah sebuah aplikasi _music player_ berbasis web bertujuan memfasilitasi kebutuhan pengguna dalam mendengarkan musik di kesehariannya.
Fitur-fitur utama dari Melodify antara lain: 
  - Sign Up & Login
  - Browsing lagu dan musisi
  - Memutar lagu
  - Menambahkan lagu ke playlist
  - Edit playlist


# ⚡ Development Setup
## Prerequisites
Pastikan sudah menginstal:
  - Node.js: minimal versi 16.15
  - MongoDB: secara lokal atau gunakan layanan cloud seperti MongoDB Atlas.


## Setting Up the Project
1. Clone repository ini:
   ```bash
   git clone (https://github.com/aDJi2003/auths_backend).git
   cd auths_backend
2. Pasang dependensi yang dibutuhkan.
   Jalankan perintah berikut untuk menginstal semua dependensi proyek:
   ```bash
   npm install
4. Set up environment variables
   Buat file .env di root folder dan tambahkan konfigurasi berikut:
   ```bash
   DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
   JWTPRIVATEKEY=<your_jwt_secret>
   SALT=<salt>
6. Menjalankan aplikasi:
   Menjalankan aplikasi:
   ```bash
   npm start


# 📊 Dokumentasi API

## Endpoints User

| **Method** | **Endpoint**           | **Deskripsi**                      |
|------------|------------------------|-------------------------------------|
| POST       | `/api/users/register`  | Mendaftarkan pengguna baru.         |
| POST       | `/api/users/login`     | Login pengguna dan mengembalikan token JWT. |
| GET        | `/api/users`           | Mendapatkan semua pengguna.         |
| GET        | `/api/users/:id`       | Mendapatkan pengguna by ID.         |
| PUT        | `/api/users/:id`       | Memperbarui pengguna by ID.         |
| DELETE     | `/api/users/:id`       | Menghapus pengguna by ID.           |

## Endpoints Lagu

| **Method** | **Endpoint**           | **Deskripsi**                      |
|------------|------------------------|-------------------------------------|
| GET        | `/api/songs`           | Mendapatkan semua lagu.             |
| GET        | `/api/songs/:id`       | Mendapatkan detail sebuah lagu.     |
| PUT        | `/api/songs/:id`       | Memperbarui detail sebuah lagu.     |
| POST       | `/api/songs`           | Menambahkan lagu baru (hanya admin).|
| DELETE     | `/api/songs/:id`       | Menghapus sebuah lagu.              |
| GET        | `/api/like`            | Mendapatkan semua lagu favorit.     |
| PUT        | `/api/like/:id`        | Menambahkan lagu favorit.           |
| GET        | `/api/save`            | Mendapatkan semua lagu yang dimasukkan dalam saved songs. |
| PUT        | `/api/save/:id`        | Menambahkan lagu favorit ke saved songs. |

## Endpoints Playlist

| **Method** | **Endpoint**               | **Deskripsi**                      |
|------------|----------------------------|-------------------------------------|
| GET        | `/api/playlists`           | Mendapatkan semua playlist milik pengguna. |
| POST       | `/api/playlists`           | Membuat playlist baru.              |
| GET        | `/api/playlists/:id`       | Mendapatkan playlist by ID.         |
| PUT        | `/api/playlists/:id`       | Menambahkan atau menghapus lagu dari playlist pengguna. |
| PUT        | `/api/playlists/add-song`  | Menambahkan lagu ke playlist pengguna. |
| PUT        | `/api/playlists/remove-song` | Menghapus lagu dari playlist pengguna. |
| DELETE     | `/api/playlists/:id`       | Menghapus playlist.                 |
| GET        | `/api/playlists/random`    | Mendapatkan playlist secara acak.   |



# 🔗 LINK TUGAS AKHIR
## Web-App Melodify
https://front-end-paw.vercel.app/
## Repository
Front-End = https://github.com/aDJi2003/front-end-paw
Back-End = https://github.com/aDJi2003/auths_backend
## Video Presentasi
https://drive.google.com/file/d/1QxSizofsq9wkaCtA8OA4LC_i33uvrfxs/view?usp=drive_link
## PPT
https://drive.google.com/file/d/1eNpOcYG91SKOif9Rwa1PtHkY54rnqyQ1/view?usp=drive_link
