# SENTURION — PROJECT DEVELOPMENT RULES

Dokumen ini adalah aturan pengembangan utama project SENTURION dan menjadi acuan saat mengerjakan, mengubah, atau menambahkan fitur.

Semua perubahan kode WAJIB mengikuti aturan ini selama tidak bertentangan dengan instruksi eksplisit user.

---

# 1. PRINSIP UMUM

- Jangan mengubah kode yang tidak berhubungan dengan permintaan.
- Jangan menghapus fitur yang sudah berjalan.
- Jangan mengganti struktur project tanpa perintah.
- Jangan mengganti nama file, route, component, variable, tabel, field, atau API endpoint tanpa perintah.
- Sebelum mengubah file, baca dan pahami file terkait terlebih dahulu.
- Pertahankan pola coding dan arsitektur yang sudah digunakan project.
- Jika implementasi existing sudah berjalan, modifikasi implementasi tersebut daripada membuat sistem baru yang tidak diperlukan.
- Jangan melakukan refactor besar jika tidak diminta.
- Jangan menambahkan dependency baru kecuali benar-benar diperlukan.
- Jika dependency baru diperlukan, jelaskan alasannya terlebih dahulu.
- Jangan menebak struktur, nama endpoint, nama tabel, nama field, atau response API. Periksa project terlebih dahulu.
- Jika user meminta perubahan kecil, lakukan perubahan sekecil mungkin.
- Jangan mengubah banyak file jika cukup mengubah satu file.
- Jangan menghapus kode existing hanya karena ada cara lain yang dianggap lebih baik.
- Jika ada keraguan yang dapat menyebabkan perubahan besar atau destructive, berhenti dan tanyakan kepada user.
- Jika user mengatakan "kerjakan", lakukan perubahan pada file terkait jika akses file/project tersedia, bukan hanya memberikan contoh.
- Jika terjadi error, cari sumber error pada implementasi existing terlebih dahulu sebelum membuat file, pola, atau sistem baru.
- Jangan membuat dummy/mock data jika API sebenarnya sudah tersedia dan dapat digunakan.
- Untuk perubahan UI, pertahankan fungsi existing dan hanya ubah tampilan kecuali user meminta perubahan fungsi.

---

# 2. TEKNOLOGI FRONTEND

Frontend SENTURION menggunakan pola:

- Vue 3
- Quasar Framework
- Vite
- Pinia
- Vue Router
- Axios

Gunakan Composition API.

Gunakan:

```vue
<script setup>
```

Jangan mengubah component menjadi Options API kecuali project existing pada bagian tersebut memang menggunakan Options API atau user memerintahkannya.

---

# 3. STRUKTUR BERDASARKAN MODULE

Setiap fitur WAJIB dibuat berdasarkan module.

Satu module pada umumnya mempunyai:

- Page sendiri
- Component khusus module sendiri
- Pinia Store sendiri
- Route sendiri

Jangan mencampur file dari module yang berbeda.

Contoh module **Penjualan**:

```text
src/
├── pages/
│   └── Penjualan/
│       ├── comp/
│       │   ├── FormPenjualan.vue
│       │   ├── ListPenjualan.vue
│       │   ├── FilterPenjualan.vue
│       │   └── DialogBayar.vue
│       └── IndexPage.vue
│
├── stores/
│   └── penjualan/
│       └── index.js
│
└── router/
    └── penjualan.js
```

Contoh module **Penerimaan**:

```text
src/
├── pages/
│   └── Penerimaan/
│       ├── comp/
│       │   ├── FormPenerimaan.vue
│       │   └── ListPenerimaan.vue
│       └── IndexPage.vue
│
├── stores/
│   └── penerimaan/
│       └── index.js
│
└── router/
    └── penerimaan.js
```

Contoh module **MasterBarang**:

```text
src/
├── pages/
│   └── MasterBarang/
│       ├── comp/
│       │   ├── FormMasterBarang.vue
│       │   └── ListMasterBarang.vue
│       └── IndexPage.vue
│
├── stores/
│   └── masterbarang/
│       └── index.js
│
└── router/
    └── masterbarang.js
```

Pola wajib:

```text
MODULE
│
├── pages/NamaModule/
│   ├── comp/
│   └── IndexPage.vue
│
├── stores/namamodule/
│   └── index.js
│
└── router/namamodule.js
```

---

# 4. ATURAN PENAMAAN MODULE

Gunakan **PascalCase** untuk folder Page.

Contoh:

```text
Penjualan
Penerimaan
MasterBarang
OrderPenjualan
StokBarang
LaporanPenjualan
```

Gunakan **lowercase** untuk folder Store.

Contoh:

```text
penjualan
penerimaan
masterbarang
orderpenjualan
stokbarang
laporanpenjualan
```

Gunakan **lowercase** untuk nama file route.

Contoh:

```text
penjualan.js
penerimaan.js
masterbarang.js
orderpenjualan.js
stokbarang.js
laporanpenjualan.js
```

Hubungan penamaan harus konsisten:

```text
Page               Store               Route
-------------------------------------------------------
Penjualan           penjualan           penjualan.js
Penerimaan          penerimaan          penerimaan.js
MasterBarang        masterbarang        masterbarang.js
StokBarang          stokbarang          stokbarang.js
LaporanPenjualan    laporanpenjualan    laporanpenjualan.js
```

DILARANG menggunakan nama yang berbeda untuk module yang sama.

SALAH:

```text
pages/Penjualan/
stores/sales/
router/transaksi.js
```

BENAR:

```text
pages/Penjualan/
stores/penjualan/
router/penjualan.js
```

---

# 5. FOLDER `comp`

Folder `comp` berisi component yang hanya digunakan oleh module tersebut.

Contoh:

```text
Penjualan/
├── comp/
│   ├── FormPenjualan.vue
│   ├── ListPenjualan.vue
│   ├── FilterPenjualan.vue
│   └── DialogBayar.vue
└── IndexPage.vue
```

`IndexPage.vue` bertugas sebagai halaman utama dan pengatur component.

Jangan membuat `IndexPage.vue` terlalu besar.

Jika bagian UI dapat dipisahkan secara logis, pindahkan ke:

```text
comp/
```

Contoh pembagian:

```text
IndexPage.vue
│
├── FormPenjualan.vue
├── ListPenjualan.vue
├── FilterPenjualan.vue
└── DialogBayar.vue
```

Component yang hanya digunakan Penjualan diletakkan di:

```text
pages/Penjualan/comp/
```

Component yang digunakan banyak module boleh diletakkan di:

```text
src/components/
```

Contoh shared component:

```text
src/components/
├── BaseDialog.vue
├── BaseTable.vue
├── BaseSearch.vue
└── LoadingOverlay.vue
```

Jangan memindahkan component khusus module ke `src/components/` tanpa alasan.

---

# 6. PINIA STORE

Setiap module WAJIB memiliki Pinia Store sendiri.

Contoh:

```text
pages/Penjualan/
stores/penjualan/

pages/Penerimaan/
stores/penerimaan/

pages/MasterBarang/
stores/masterbarang/
```

Nama Store:

```javascript
usePenjualanStore()
usePenerimaanStore()
useMasterBarangStore()
useStokBarangStore()
```

Store menangani:

- Request API
- State/data
- Form state
- Loading
- Pagination
- Filter
- Search
- Business logic
- Error handling yang berhubungan dengan data
- Reset state/form bila diperlukan

Request API yang merupakan bagian dari module harus diletakkan di Store.

SALAH:

```javascript
// pages/Penjualan/IndexPage.vue
const response = await api.get('/penjualan')
```

BENAR:

```javascript
// stores/penjualan/index.js
async function getPenjualan() {
  const response = await api.get('/penjualan')
}
```

Page/Component menggunakan Store:

```javascript
const penjualanStore = usePenjualanStore()
```

Alur yang diinginkan:

```text
Page / Component
       ↓
   Pinia Store
       ↓
   Axios / API
       ↓
  Laravel API
```

Hindari:

```text
Page
 ↓
API langsung
```

kecuali ada alasan khusus dan pola existing project memang mengharuskannya.

---

# 7. STRUKTUR ROUTER

Setiap module WAJIB mempunyai file route sendiri.

File route module diletakkan **langsung** di:

```text
src/router/
```

JANGAN membuat struktur:

```text
src/router/modules/
```

Gunakan:

```text
src/
└── router/
    ├── index.js
    ├── routes.js
    ├── penjualan.js
    ├── penerimaan.js
    ├── masterbarang.js
    ├── stokbarang.js
    └── laporanpenjualan.js
```

Hubungan module:

```text
Penjualan
├── pages/Penjualan/
├── stores/penjualan/
└── router/penjualan.js

Penerimaan
├── pages/Penerimaan/
├── stores/penerimaan/
└── router/penerimaan.js

MasterBarang
├── pages/MasterBarang/
├── stores/masterbarang/
└── router/masterbarang.js
```

Jangan menumpuk seluruh route module ke dalam `routes.js`.

`routes.js` hanya digunakan untuk menggabungkan route-route module dan route global yang memang diperlukan.

---

# 8. CONTOH ROUTE MODULE

Contoh:

```javascript
// src/router/penjualan.js

const routes = [
  {
    path: 'penjualan',
    name: 'penjualan',
    component: () =>
      import('pages/Penjualan/IndexPage.vue'),
  },
]

export default routes
```

Penerimaan:

```javascript
// src/router/penerimaan.js

const routes = [
  {
    path: 'penerimaan',
    name: 'penerimaan',
    component: () =>
      import('pages/Penerimaan/IndexPage.vue'),
  },
]

export default routes
```

Master Barang:

```javascript
// src/router/masterbarang.js

const routes = [
  {
    path: 'master-barang',
    name: 'masterbarang',
    component: () =>
      import('pages/MasterBarang/IndexPage.vue'),
  },
]

export default routes
```

Gunakan lazy loading:

```javascript
component: () =>
  import('pages/Penjualan/IndexPage.vue')
```

Sebelum membuat route baru:

1. Periksa `src/router/routes.js`.
2. Periksa file-file route di `src/router/`.
3. Periksa apakah route sudah tersedia.
4. Periksa apakah halaman menggunakan `MainLayout`.
5. Gunakan lazy loading.
6. Gunakan file route module yang sesuai.
7. Jangan membuat duplicate route.
8. Jangan mengubah route existing tanpa perintah.

---

# 9. REGISTRASI ROUTE

Contoh `src/router/routes.js`:

```javascript
import penjualanRoutes from './penjualan'
import penerimaanRoutes from './penerimaan'
import masterBarangRoutes from './masterbarang'

const routes = [
  {
    path: '/',
    component: () =>
      import('layouts/MainLayout.vue'),

    children: [
      ...penjualanRoutes,
      ...penerimaanRoutes,
      ...masterBarangRoutes,
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/ErrorNotFound.vue'),
  },
]

export default routes
```

Jika route menjadi `children` dari parent `/`, gunakan:

```javascript
path: 'penjualan'
```

bukan:

```javascript
path: '/penjualan'
```

Hasil URL tetap:

```text
/penjualan
```

Namun selalu periksa struktur router existing sebelum melakukan perubahan. Jangan merombak route lama yang sudah berjalan hanya untuk menyesuaikan aturan baru jika user tidak meminta migrasi route lama.

---

# 10. MAINLAYOUT

Jika module harus tampil di dalam `MainLayout`, pertahankan satu parent layout.

Contoh:

```text
MainLayout
│
├── Dashboard
├── Penjualan
├── Penerimaan
├── MasterBarang
└── Laporan
```

Jangan membuat `MainLayout` baru untuk setiap module kecuali memang dibutuhkan atau diperintahkan user.

---

# 11. QUASAR

Utamakan component bawaan Quasar.

Contoh:

- `q-page`
- `q-card`
- `q-btn`
- `q-input`
- `q-icon`
- `q-dialog`
- `q-table`
- `q-select`
- `q-checkbox`
- `q-spinner`
- `q-skeleton`
- `q-pagination`
- `q-menu`
- `q-tabs`
- `q-notify`

Jangan membuat component custom jika component Quasar sudah dapat memenuhi kebutuhan dengan baik.

Gunakan Quasar Notify untuk feedback user jika sesuai dengan pola project.

---

# 12. UI / DESIGN

Desain SENTURION harus:

- Profesional
- Modern
- Bersih
- Cocok untuk sistem rumah sakit
- Tidak terlihat seperti template AI
- Desktop friendly
- Responsive untuk tablet dan mobile
- Konsisten antar halaman

Arah warna utama:

- Navy
- Biru
- Putih
- Gold sebagai accent

Jangan mengubah desain global tanpa perintah.

Untuk perubahan UI:

- Pertahankan fungsi existing.
- Jangan mengubah business logic jika user hanya meminta perubahan tampilan.
- Jangan membuat ulang halaman dari nol jika perubahan kecil sudah cukup.
- Pertahankan identitas visual SENTURION.

---

# 13. RESPONSIVE

Setiap halaman/component baru wajib mempertimbangkan:

- Desktop
- Tablet
- Mobile

Jangan membuat layout yang hanya bagus pada satu resolusi.

Pastikan:

- Tidak terjadi overflow yang tidak diinginkan.
- Form tetap dapat digunakan pada layar kecil.
- Table/list mempunyai perilaku responsive yang sesuai.
- Dialog tetap dapat digunakan pada mobile.
- Tombol/action penting tetap dapat dijangkau.

---

# 14. AXIOS DAN API

Semua komunikasi backend harus menggunakan Axios instance project.

Jangan hardcode base URL API di component.

Gunakan konfigurasi environment project.

Contoh, jika project menggunakan:

```javascript
import { api } from 'boot/axios'
```

maka pertahankan pola tersebut.

Sebelum membuat request baru:

1. Periksa konfigurasi Axios existing.
2. Periksa interceptor existing.
3. Periksa pola authentication existing.
4. Periksa struktur response API existing.
5. Periksa endpoint existing.

Jangan membuat Axios instance baru jika instance project sudah tersedia.

---

# 15. DATA DINAMIS

Data yang berasal dari database jangan di-hardcode di frontend jika API/data sebenarnya tersedia.

Termasuk:

- Menu
- User
- Role
- Permission
- Icon
- Warna
- Konfigurasi aplikasi
- Master data

Jika data menu berasal dari API, render menggunakan data tersebut, misalnya dengan `v-for`.

Jangan membuat menu satu per satu secara manual jika menu memang bersifat dinamis.

---

# 16. MENU SSO SENTURION

Menu SSO bersifat dinamis.

Data menu minimal dapat memiliki:

```text
id
nama
deskripsi
icon
warna
route
urutan
aktif
```

Icon disimpan sebagai nama icon yang kompatibel dengan Quasar/Material Icons.

Contoh:

```text
account_balance
badge
medication
description
desktop_windows
health_and_safety
inventory_2
```

Frontend menggunakan pola:

```vue
<q-icon :name="menu.icon" />
```

Jangan hardcode icon menu di template jika icon berasal dari database.

---

# 17. WARNA MENU DINAMIS

Warna menu berasal dari database.

Gunakan format HEX.

Contoh:

```text
#168CFF
#22C77A
#FF9F1C
#8B5CF6
#EC4899
#06B6D4
#EF4444
```

Jangan membatasi warna menu hanya menggunakan class hardcoded seperti:

```text
menu-blue
menu-green
menu-red
```

Jika database mengirim warna HEX, frontend harus menggunakan warna tersebut secara dinamis.

Jika warna kosong atau tidak valid, gunakan fallback/default color yang aman agar UI tidak rusak.

Jangan mempercayai string CSS arbitrary dari database. Validasi/normalisasi nilai warna sebelum digunakan.

---

# 18. AUTHENTICATION

Authentication harus mengikuti mekanisme yang sudah digunakan project.

Jangan membuat sistem authentication baru jika project sudah mempunyai authentication.

Jika endpoint membutuhkan token, gunakan interceptor/pola Axios yang sudah tersedia.

Jangan menyimpan credential sensitif secara hardcoded.

---

# 19. SECURITY

Jangan menyimpan hal berikut langsung di source code:

- Password
- API key
- Client secret
- Token rahasia
- Private key
- Credential database

Gunakan environment variable atau mekanisme secret yang sesuai.

Jangan menampilkan credential ke console/log.

Jangan commit file secret jika seharusnya di-ignore.

Jangan mengubah konfigurasi security tanpa perintah dan tanpa memahami dampaknya.

---

# 20. ERROR HANDLING

Setiap request API harus mempunyai error handling yang sesuai.

Contoh:

```javascript
try {
  const response = await api.get('/endpoint')
} catch (error) {
  console.error(error)
}
```

Untuk pesan kepada user, gunakan Quasar Notify jika tersedia dan sesuai pola project.

Jangan menampilkan raw error backend yang mengandung informasi sensitif kepada end user.

---

# 21. LOADING STATE

Request API yang terlihat oleh user harus mempunyai loading state jika prosesnya dapat terasa oleh user.

Contoh:

```javascript
const loading = ref(false)
```

Gunakan pada UI:

```vue
<q-btn :loading="loading" />
```

atau gunakan:

- `q-spinner`
- `q-skeleton`
- loading table
- loading overlay

sesuai kebutuhan.

Pastikan loading kembali ke kondisi normal pada `finally` jika menggunakan pola `try/catch/finally`.

---

# 22. FORM

Form module sebaiknya diletakkan di:

```text
pages/NamaModule/comp/FormNamaModule.vue
```

Contoh:

```text
pages/Penjualan/comp/FormPenjualan.vue
pages/Penerimaan/comp/FormPenerimaan.vue
pages/MasterBarang/comp/FormMasterBarang.vue
```

State form yang merupakan bagian dari business/data module dikelola melalui Store jika sesuai dengan pola module.

Lakukan validasi input.

Jangan mengirim request berkali-kali saat tombol submit sedang loading.

---

# 23. LIST / TABLE

List module sebaiknya dipisah dari `IndexPage.vue` jika kompleks.

Contoh:

```text
pages/Penjualan/comp/ListPenjualan.vue
```

Jika list membutuhkan:

- Pagination
- Search
- Filter
- Sorting

state dan proses data tersebut dikelola oleh Store.

Jangan menduplikasi logic pagination/search pada banyak component.

---

# 24. DIALOG

Dialog khusus module ditempatkan di:

```text
pages/NamaModule/comp/
```

Contoh:

```text
DialogBayar.vue
DialogDetail.vue
DialogKonfirmasi.vue
```

Dialog yang digunakan banyak module dapat dipindahkan ke:

```text
src/components/
```

Jangan menjadikan seluruh isi dialog sebagai bagian besar di `IndexPage.vue` jika dapat dipisah dengan jelas.

---

# 25. BACKEND LARAVEL

Jika Codex juga mengerjakan backend Laravel:

- Ikuti struktur Laravel existing.
- Gunakan Model.
- Gunakan Controller.
- Gunakan Migration.
- Gunakan validation.
- Gunakan Form Request jika project existing menggunakannya atau validasinya cukup kompleks.
- Gunakan Resource jika project existing menggunakan API Resource.
- Jangan membuat arsitektur baru tanpa kebutuhan.
- Pertahankan pola route API existing.
- Pertahankan format response existing jika memungkinkan.

Sebelum membuat endpoint baru, periksa endpoint dan controller existing.

---

# 26. DATABASE

Jangan melakukan operasi destructive tanpa izin eksplisit user.

Termasuk:

- `DROP TABLE`
- `TRUNCATE`
- `DELETE` massal
- Menghapus column
- Menghapus table
- Mengubah tipe column secara berisiko
- Migration destructive
- Reset database
- Fresh migration pada database yang berisi data

Migration baru harus mempertimbangkan data existing/production.

Jangan menjalankan:

```bash
php artisan migrate:fresh
```

pada database existing tanpa izin eksplisit user.

Sebelum perubahan database berisiko:

1. Jelaskan risikonya.
2. Pastikan user memang meminta perubahan tersebut.
3. Hindari kehilangan data.
4. Gunakan migration yang aman jika memungkinkan.

---

# 27. JANGAN MENEBAK

Jika belum diketahui, periksa project terlebih dahulu untuk:

- Nama tabel
- Nama column
- Endpoint
- Route
- Model
- Controller
- File
- Store
- Response API
- Struktur authentication
- Struktur router
- Axios instance
- Environment variable

Jangan membuat asumsi lalu mengubah banyak file berdasarkan asumsi tersebut.

---

# 28. SEBELUM EDIT

Sebelum melakukan perubahan:

1. Baca file terkait.
2. Cari dependency/penggunaan terkait.
3. Pahami alur existing.
4. Periksa Store terkait.
5. Periksa route terkait jika relevan.
6. Periksa API terkait jika relevan.
7. Periksa component terkait.
8. Baru lakukan perubahan.

Jika perubahan menyentuh frontend dan backend, periksa keduanya jika tersedia.

---

# 29. SETELAH EDIT

Setelah perubahan:

1. Periksa syntax.
2. Periksa import.
3. Periksa variable yang tidak digunakan.
4. Periksa route.
5. Periksa kemungkinan duplicate code.
6. Periksa kemungkinan runtime error.
7. Jalankan lint jika tersedia dan relevan.
8. Jalankan build jika relevan.
9. Jalankan test jika tersedia dan relevan.

Jangan menyatakan perubahan berhasil jika belum diverifikasi.

Jika build/test tidak dapat dijalankan, katakan dengan jelas bahwa bagian tersebut belum diverifikasi.

---

# 30. FORMAT LAPORAN SETELAH TASK

Setelah selesai mengerjakan task, jelaskan secara singkat:

- File yang diubah
- Apa yang diubah
- File baru jika ada
- Apakah lint/build/test berhasil
- Hal yang belum dapat diverifikasi jika ada

Jangan memberikan penjelasan panjang jika tidak diperlukan.

---

# 31. PRIORITAS PENGERJAAN

Prioritas:

1. Jangan merusak fitur existing.
2. Ikuti permintaan user.
3. Pertahankan struktur project.
4. Security.
5. Data safety.
6. Maintainability.
7. UI consistency.
8. Performance.

---

# 32. STRUKTUR PROJECT TARGET

Struktur umum yang diinginkan:

```text
src/
│
├── assets/
│
├── boot/
│   └── axios.js
│
├── components/
│   ├── BaseDialog.vue
│   ├── BaseTable.vue
│   └── ...
│
├── layouts/
│   └── MainLayout.vue
│
├── pages/
│   │
│   ├── Penjualan/
│   │   ├── comp/
│   │   │   ├── FormPenjualan.vue
│   │   │   ├── ListPenjualan.vue
│   │   │   ├── FilterPenjualan.vue
│   │   │   └── DialogBayar.vue
│   │   └── IndexPage.vue
│   │
│   ├── Penerimaan/
│   │   ├── comp/
│   │   │   ├── FormPenerimaan.vue
│   │   │   └── ListPenerimaan.vue
│   │   └── IndexPage.vue
│   │
│   └── MasterBarang/
│       ├── comp/
│       │   ├── FormMasterBarang.vue
│       │   └── ListMasterBarang.vue
│       └── IndexPage.vue
│
├── stores/
│   ├── penjualan/
│   │   └── index.js
│   ├── penerimaan/
│   │   └── index.js
│   └── masterbarang/
│       └── index.js
│
└── router/
    ├── index.js
    ├── routes.js
    ├── penjualan.js
    ├── penerimaan.js
    └── masterbarang.js
```

Tidak menggunakan:

```text
router/modules/
```

File route module langsung berada di:

```text
src/router/
```

---

# 33. PEMBAGIAN TANGGUNG JAWAB

Gunakan pembagian:

```text
IndexPage.vue
│
├── Mengatur layout halaman
├── Memanggil component module
└── Menghubungkan UI utama
        │
        ▼
comp/
│
├── Form
├── List
├── Dialog
├── Filter
└── Component khusus module
        │
        ▼
Pinia Store
│
├── State
├── Form state
├── API request
├── Loading
├── Pagination
├── Search/filter
└── Business logic
        │
        ▼
Axios
        │
        ▼
Laravel API
```

Jangan mencampurkan seluruh tanggung jawab tersebut ke dalam satu `IndexPage.vue`.

---

# 34. SAAT MEMBUAT MODULE BARU

Jika user meminta:

> Buat module Penjualan

Codex harus mempertimbangkan struktur minimal:

```text
pages/Penjualan/
├── comp/
└── IndexPage.vue

stores/penjualan/
└── index.js

router/
└── penjualan.js
```

Jika module membutuhkan Form dan List:

```text
pages/Penjualan/
├── comp/
│   ├── FormPenjualan.vue
│   └── ListPenjualan.vue
└── IndexPage.vue
```

Jangan membuat semua fitur langsung di `IndexPage.vue` hanya karena implementasinya lebih cepat.

---

# 35. ATURAN PALING PENTING

- Baca kode existing sebelum mengubahnya.
- Jangan merusak fitur yang sudah berjalan.
- Jangan mengubah hal di luar scope.
- Jangan refactor besar tanpa permintaan.
- Gunakan struktur module yang telah ditetapkan.
- Component khusus module masuk ke `comp`.
- Setiap module mempunyai Store sendiri.
- Request API module dikelola Store.
- Setiap module mempunyai file route sendiri langsung di `src/router/`.
- Jangan membuat `src/router/modules/`.
- `routes.js` hanya menggabungkan route module dan route global.
- Data database jangan di-hardcode jika data/API tersedia.
- Menu SSO, icon, dan warna harus mendukung data dinamis dari database.
- Jangan menjalankan perubahan database destructive tanpa izin.
- Verifikasi perubahan sebelum menyatakan berhasil.
