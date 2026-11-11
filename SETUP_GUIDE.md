# Panduan Lengkap Setup dari Nol: Supabase hingga KoneksiAlumni

Panduan langkah demi langkah (*zero-to-production*) untuk mengonfigurasi **Supabase Cloud**, menghubungkannya ke **Backend Express.js (Bun)**, dan menjalankan **Frontend React (Vite)** secara terintegrasi.

---

## Daftar Isi
1. [Langkah 1: Membuat Proyek di Supabase Cloud](#langkah-1-membuat-proyek-di-supabase-cloud)
2. [Langkah 2: Mengambil Kredensial API](#langkah-2-mengambil-kredensial-api)
3. [Langkah 3: Eksekusi Skema Database (SQL Editor)](#langkah-3-eksekusi-skema-database-sql-editor)
4. [Langkah 4: Konfigurasi Supabase Storage (Private Bucket)](#langkah-4-konfigurasi-supabase-storage-private-bucket)
5. [Langkah 5: Konfigurasi Supabase Authentication](#langkah-5-konfigurasi-supabase-authentication)
6. [Langkah 6: Konfigurasi Proyek Lokal (.env)](#langkah-6-konfigurasi-proyek-lokal-env)
7. [Langkah 7: Menjalankan Server Backend & Frontend](#langkah-7-menjalankan-server-backend--frontend)
8. [Langkah 8: Uji Coba Alur Penuh (End-to-End Test)](#langkah-8-uji-coba-alur-penuh-end-to-end-test)

---

## Langkah 1: Membuat Proyek di Supabase Cloud

1. Buka browser dan kunjungi [https://supabase.com](https://supabase.com).
2. Klik tombol **Start your project** atau **Sign In** (bisa login menggunakan akun GitHub).
3. Setelah masuk ke dashboard, klik tombol hijau **New Project**.
4. Isi form pembuatan proyek:
   - **Organization:** Pilih organisasi default Anda (atau buat baru, misal: `Kampus-Dev`).
   - **Name:** Beri nama proyek, contoh: `koneksi-alumni`.
   - **Database Password:** Masukkan password yang kuat dan **simpan password ini di catatan aman** (password ini dibutuhkan jika Anda ingin koneksi langsung via PostgreSQL CLI/DBeaver).
   - **Region:** Pilih region terdekat dengan pengguna Anda di Indonesia, yaitu: `Southeast Asia (Singapore) - ap-southeast-1` untuk latensi terendah (~15–25ms).
   - **Pricing Plan:** Pilih **Free Tier**.
5. Klik **Create new project**.
6. Tunggu 1–2 menit hingga Supabase selesai menyiapkan (*provisioning*) basis data PostgreSQL Anda.

---

## Langkah 2: Mengambil Kredensial API

Setelah proyek selesai dibuat dan dashboard terbuka:

1. Di menu sidebar sebelah kiri, klik ikon gerigi **Project Settings** (paling bawah).
2. Pada submenu, pilih **API**.
3. Cari bagian **Project API keys** dan **Project URL**:
   - **Project URL:** Salin nilai URL (contoh: `https://abcdefghijklmnopqrst.supabase.co`).
   - **anon / public key:** Salin string kunci `anon` (aman digunakan di sisi frontend).
   - **service_role key:** Klik tombol **Reveal** lalu salin string kunci `service_role`.

> [!WARNING]
> Kunci `service_role` memiliki hak akses admin penuh untuk membypass aturan RLS (Row Level Security). **Hanya pasang di file `backend/.env`**, jangan pernah dimasukkan ke frontend atau di-commit ke Git.

---

## Langkah 3: Eksekusi Skema Database (SQL Editor)

1. Di menu sidebar kiri dashboard Supabase, klik ikon **SQL Editor** (ikon terminal `>_`).
2. Klik tombol **+ New query**.
3. Buka file [`backend/sql/schema.sql`](backend/sql/schema.sql) di proyek lokal Anda, salin seluruh kodenya, dan tempelkan ke SQL Editor Supabase.
4. Klik tombol **Run** (atau tekan `Ctrl + Enter`).
   - Pastikan muncul pesan sukses: `Success. No rows returned`.
5. Buka tab baru di SQL Editor (**+ New query**), salin isi file [`backend/sql/seed.sql`](backend/sql/seed.sql), lalu klik **Run** untuk memasukkan daftar topik keahlian standar (Backend Web, UI/UX, AI/ML, dll).
6. **Verifikasi:**
   - Di sidebar kiri, klik menu **Table Editor** (ikon tabel).
   - Pastikan tabel-tabel berikut sudah terdaftar:
     - `profiles`
     - `topics`
     - `alumni_topics`
     - `mentorship_slots`
     - `bookings`
     - `reviews`
     - `idempotency_keys`

---

## Langkah 4: Konfigurasi Supabase Storage (Private Bucket)

Fitur CV Review membutuhkan bucket privat agar dokumen mahasiswa tidak dapat diakses publik tanpa izin.

1. Di sidebar kiri dashboard Supabase, klik menu **Storage** (ikon tabung silinder).
2. Klik tombol **New bucket**.
3. Atur konfigurasi bucket:
   - **Bucket name:** Ketik persis `cv-resumes` (huruf kecil, pakai tanda hubung).
   - **Public bucket:** Biarkan tombol toggle dalam posisi **OFF (Nonaktif)**.
4. Klik tombol **Save**.
5. **Verifikasi:** Bucket `cv-resumes` kini muncul di daftar dengan label gembok / tanda *Private*.

---

## Langkah 5: Konfigurasi Supabase Authentication (UI Terbaru)

Supabase Auth mengelola token JWT dan pendaftaran pengguna. Pada versi dashboard Supabase terbaru:

1. Di sidebar kiri, klik menu **Authentication** (ikon dua orang).
2. Di bawah kategori **CONFIGURATION**, klik menu **Sign In / Providers**.
3. **Mematikan Verifikasi Email (Untuk kemudahan testing lokal):**
   - Pada kotak **User Signups**, cari opsi **Confirm email**.
   - Ubah toggle **Confirm email** menjadi **OFF** (berwarna abu-abu).
   - Klik tombol hijau **Save changes** di kanan bawah kotak.
4. **Verifikasi Email Provider:**
   - Pada bagian **Auth Providers** di bawahnya, pastikan baris **Email** sudah berlabel hijau **ENABLED** (default sudah aktif).
5. **Mengatur Redirect URL:**
   - Di sidebar kiri (masih di bawah kategori *CONFIGURATION*), klik menu **URL Configuration**.
   - **Site URL:** Isi dengan `http://localhost:3000`.
   - **Redirect URLs:** Klik *Add URL* dan tambahkan `http://localhost:3000/**`.
   - Klik **Save**.

---

## Langkah 6: Konfigurasi Proyek Lokal (.env)

Masuk ke terminal di komputer/server Anda:

### 1. Konfigurasi Backend
Masuk ke folder `backend` dan buat file `.env`:
```bash
cd /root/koneksi-alumni/backend
cp .env.example .env
```
Buka file `backend/.env` dengan teks editor favorit Anda (misal: `nano .env`):
```ini
# Port Server Backend
PORT=5000
NODE_ENV=development

# Kredensial dari Langkah 2
SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Simpan file.

### 2. Konfigurasi Frontend (Opsional)
Frontend sudah memiliki proxy otomatis ke backend via Vite (`/api` $\rightarrow$ `http://localhost:5000`). Jika ingin menghubungkan Supabase Client langsung di sisi browser:
```bash
cd /root/koneksi-alumni/frontend
```
Buat file `.env` di folder `frontend/`:
```ini
VITE_SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Langkah 7: Menjalankan Server Backend & Frontend

Pastikan Anda berada di root direktori `/root/koneksi-alumni`.

### Terminal 1 — Menjalankan Backend:
```bash
cd /root/koneksi-alumni/backend
bun install
bun run dev
```
Output yang diharapkan:
```text
🚀 KoneksiAlumni API running on port 5000
⚡ Runtime: Bun 1.4.4
```

### Terminal 2 — Menjalankan Frontend:
Buka tab/jendela terminal kedua:
```bash
cd /root/koneksi-alumni/frontend
bun install
bun run dev
```
Output yang diharapkan:
```text
  VITE v5.4.21  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

## Langkah 8: Uji Coba Alur Penuh (End-to-End Test)

Berikut adalah panduan simulasi nyata untuk memverifikasi seluruh komponen bekerja:

### Skenario A: Cek Kesehatan Server
Buka terminal baru dan jalankan:
```bash
curl http://localhost:5000/api/health
```
**Hasil:**
```json
{"success":true,"message":"KoneksiAlumni API is running","data":{"runtime":"bun","version":"1.0.0"}}
```

---

### Skenario B: Pendaftaran & Sinkronisasi Profil User
1. Buka dashboard Supabase $\rightarrow$ menu **Authentication** $\rightarrow$ **Users** $\rightarrow$ klik **Add user** $\rightarrow$ **Create user**.
   - Email: `alumni.fadhil@kampus.ac.id`
   - Password: `PasswordRahasia123!`
   - Klik **Create user**. Salin **User UID** yang terbentuk.
2. Login untuk mendapatkan Access Token JWT:
```bash
curl -X POST "https://abcdefghijklmnopqrst.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: <SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alumni.fadhil@kampus.ac.id",
    "password": "PasswordRahasia123!"
  }'
```
Salin nilai `access_token` dari respons JSON.

3. Panggil API Sinkronisasi Profil (sebagai Alumni):
```bash
curl -X POST http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "alumni",
    "full_name": "Fadhil Pratama, S.Kom.",
    "university_email": "alumni.fadhil@kampus.ac.id",
    "current_company": "GoTo Group",
    "current_position": "Senior Backend Engineer",
    "bio": "Alumni Informatika 2020. Fokus arsitektur sistem skala besar.",
    "linkedin_url": "https://linkedin.com/in/fadhilpratama"
  }'
```

---

### Skenario C: Verifikasi Alumni oleh Admin
Alumni baru otomatis berstatus `is_verified = false`. Untuk memverifikasinya:
1. Jalankan query SQL cepat di SQL Editor Supabase:
```sql
UPDATE profiles SET is_verified = TRUE WHERE university_email = 'alumni.fadhil@kampus.ac.id';
```

---

### Skenario D: Alumni Membuka Slot Jadwal
Alumni mempublikasikan slot waktu ketersediaan mentoring:
```bash
curl -X POST http://localhost:5000/api/slots \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "session_type": "mock_interview",
    "start_time": "2026-11-25T19:00:00.000Z",
    "end_time": "2026-11-25T19:45:00.000Z"
  }'
```
Salin nilai `id` slot yang dikembalikan (contoh: `slot-uuid-12345`).

---

### Skenario E: Mahasiswa Memesan Slot (Atomic Concurrency Test)
Buat user mahasiswa kedua (`budi.santoso@mahasiswa.kampus.ac.id`), ambil tokennya, lalu kirim request booking:
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <STUDENT_TOKEN>" \
  -H "Idempotency-Key: req-unique-001" \
  -H "Content-Type: application/json" \
  -d '{
    "slot_id": "slot-uuid-12345",
    "notes": "Mohon bantuan review simulasi interview coding test Go."
  }'
```
**Hasil:**
- Status HTTP `201 Created`.
- Slot otomatis terkunci (`status: booked`).
- Link Jitsi room instan dibuat: `https://meet.jit.si/koneksi-alumni-<bookingId>`.
- Jika request ini dikirim ulang secara paralel atau ganda, sistem akan mengembalikan proteksi **409 Conflict** atau mengembalikan respons cache identik dari **Idempotency Guard**.

---

Selamat! Seluruh sistem dari basis data cloud Supabase, server backend Bun.js, hingga aplikasi frontend React telah terhubung dan berfungsi secara penuh.

