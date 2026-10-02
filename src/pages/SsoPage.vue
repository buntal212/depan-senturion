<template>
  <q-page class="sso-page">
    <!-- =====================================================
         BACKGROUND
    ====================================================== -->
    <div class="hospital-bg"></div>
    <div class="page-overlay"></div>

    <!-- DEKORASI -->
    <div class="decoration decoration-top"></div>
    <div class="decoration decoration-bottom"></div>

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->
    <main class="main-content">
      <!-- ===================================================
           HERO / WELCOME
      ==================================================== -->
      <section class="welcome-section">
        <!-- LEFT -->
        <div class="welcome-content">
          <div class="welcome-label">
            <q-icon name="waving_hand" size="18px" />

            <span> Selamat datang kembali </span>
          </div>

          <h1 class="welcome-name">Arie Setiawan</h1>

          <div class="welcome-description">
            Silakan pilih layanan yang ingin Anda akses melalui Single Sign On (SSO)
          </div>
        </div>

        <!-- RIGHT -->
        <div class="portal-info">
          <div class="portal-icon">
            <q-icon name="apps" size="38px" />
          </div>

          <div class="portal-text">
            <div class="portal-label">Portal Aplikasi</div>

            <div class="portal-name">SENTURION</div>

            <div class="portal-description">Satu akses untuk seluruh layanan</div>
          </div>
        </div>
      </section>

      <!-- ===================================================
           APPLICATION
      ==================================================== -->
      <section class="application-section">
        <!-- HEADER -->
        <div class="section-heading">
          <div>
            <div class="section-title">Pilih Aplikasi</div>

            <div class="section-description">Akses cepat ke seluruh layanan yang tersedia</div>
          </div>

          <!-- JUMLAH MENU DINAMIS -->
          <div class="application-count">
            <q-icon name="grid_view" size="16px" />

            <span> {{ menus.length }} Aplikasi </span>
          </div>
        </div>

        <!-- =================================================
             LOADING
        ================================================== -->
        <div v-if="loadingMenu" class="row justify-center q-py-xl">
          <q-spinner color="primary" size="42px" />
        </div>

        <!-- =================================================
             MENU DINAMIS
        ================================================== -->
        <div v-else-if="menus.length > 0" class="menu-grid">
          <button
            v-for="menu in menus"
            :key="menu.id"
            type="button"
            class="menu-card"
            @click="openMenu(menu)"
          >
            <!-- =============================================
                 GARIS WARNA KIRI
                 WARNA DARI DATABASE
            ============================================== -->
            <div
              class="card-accent"
              :style="{
                background: getAccentGradient(menu.warna),
              }"
            ></div>

            <div class="menu-left">
              <!-- ===========================================
                   ICON BOX
                   ICON + WARNA DARI DATABASE
              ============================================ -->
              <div
                class="icon-box"
                :style="{
                  background: getIconGradient(menu.warna),
                  boxShadow: getIconShadow(menu.warna),
                }"
              >
                <q-icon :name="menu.icon || 'apps'" size="27px" />
              </div>

              <!-- ===========================================
                   NAMA + DESKRIPSI
              ============================================ -->
              <div class="menu-content">
                <div class="menu-title">
                  {{ menu.nama }}
                </div>

                <div class="menu-description">
                  {{ menu.deskripsi }}
                </div>
              </div>
            </div>

            <!-- ARROW -->
            <div class="menu-arrow">
              <q-icon name="arrow_forward" size="17px" />
            </div>
          </button>
        </div>

        <!-- =================================================
             DATA KOSONG
        ================================================== -->
        <div v-else class="empty-menu">
          <q-icon name="apps" size="46px" color="grey-5" />

          <div class="empty-menu-title">Belum ada aplikasi</div>

          <div class="empty-menu-description">Belum ada aplikasi yang tersedia untuk Anda.</div>
        </div>
      </section>
    </main>

    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer class="sso-footer">
      <span> © {{ currentYear }} SENTURION </span>

      <span class="footer-dot"></span>

      <span> Sistem Informasi Manajemen Rumah Sakit </span>

      <span class="footer-dot"></span>

      <span> Altura Consulting </span>
    </footer>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

/* =========================================================
   STATE
========================================================= */

const menus = ref([])

const loadingMenu = ref(false)

/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = computed(() => {
  return new Date().getFullYear()
})

/* =========================================================
   VALIDASI WARNA HEX

   Database boleh menyimpan:
   #168CFF
   #22C77A
   #FF9F1C
   #8B5CF6
   dst.

   Kalau warna DB kosong / tidak valid,
   otomatis pakai warna default.
========================================================= */

const normalizeColor = (color) => {
  const defaultColor = '#168CFF'

  if (!color) {
    return defaultColor
  }

  const value = String(color).trim()

  /*
   * HEX 6 digit:
   * #168CFF
   */
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value
  }

  /*
   * HEX 3 digit:
   * #09F
   *
   * Diubah menjadi:
   * #0099FF
   */
  if (/^#[0-9A-Fa-f]{3}$/.test(value)) {
    const r = value[1]
    const g = value[2]
    const b = value[3]

    return `#${r}${r}${g}${g}${b}${b}`
  }

  return defaultColor
}

/* =========================================================
   HEX -> RGB
========================================================= */

const hexToRgb = (color) => {
  const hex = normalizeColor(color).replace('#', '')

  return {
    r: parseInt(hex.substring(0, 2), 16),

    g: parseInt(hex.substring(2, 4), 16),

    b: parseInt(hex.substring(4, 6), 16),
  }
}

/* =========================================================
   MEMBUAT WARNA LEBIH GELAP

   Dipakai untuk gradient icon.
========================================================= */

const darkenColor = (color, percent = 18) => {
  const { r, g, b } = hexToRgb(color)

  const factor = 1 - percent / 100

  const newR = Math.max(0, Math.round(r * factor))

  const newG = Math.max(0, Math.round(g * factor))

  const newB = Math.max(0, Math.round(b * factor))

  return '#' + [newR, newG, newB].map((value) => value.toString(16).padStart(2, '0')).join('')
}

/* =========================================================
   GRADIENT ICON

   Contoh DB:
   warna = #EC4899

   Otomatis menghasilkan gradient pink.
========================================================= */

const getIconGradient = (color) => {
  const baseColor = normalizeColor(color)

  const darkColor = darkenColor(baseColor, 18)

  return `
    linear-gradient(
      145deg,
      ${baseColor},
      ${darkColor}
    )
  `
}

/* =========================================================
   GRADIENT GARIS KIRI
========================================================= */

const getAccentGradient = (color) => {
  const baseColor = normalizeColor(color)

  const darkColor = darkenColor(baseColor, 25)

  return `
    linear-gradient(
      180deg,
      ${baseColor},
      ${darkColor}
    )
  `
}

/* =========================================================
   SHADOW ICON

   Shadow juga mengikuti warna database.
========================================================= */

const getIconShadow = (color) => {
  const { r, g, b } = hexToRgb(color)

  return `
    0 8px 18px
    rgba(${r}, ${g}, ${b}, 0.30)
  `
}

/* =========================================================
   GET MENU
========================================================= */

const getMenus = async () => {
  loadingMenu.value = true

  try {
    /*
     * =====================================================
     * DATA DUMMY SEMENTARA
     * =====================================================
     *
     * Nanti struktur ini dibuat sama dengan
     * response API Laravel.
     *
     * FIELD WARNA SUDAH MENGGUNAKAN HEX.
     */

    menus.value = [
      {
        id: 1,

        nama: 'Master',

        deskripsi: 'Manajemen Data Master',

        icon: 'account_balance',

        warna: '#168CFF',

        route: '/master',

        urutan: 1,
      },

      {
        id: 2,

        nama: 'Kepegawaian',

        deskripsi: 'Data pegawai dan administrasi',

        icon: 'badge',

        warna: '#22C77A',

        route: '/kepegawaian',

        urutan: 2,
      },

      {
        id: 3,

        nama: 'Layanan',

        deskripsi: 'Layanan publik dan layanan internal',

        icon: 'health_and_safety',

        warna: '#FF9F1C',

        route: '/layanan',

        urutan: 3,
      },

      {
        id: 4,

        nama: 'Persediaan',

        deskripsi: 'Stok, aset dan pengadaan',

        icon: 'inventory_2',

        warna: '#8B5CF6',

        route: '/persediaan',

        urutan: 4,
      },

      {
        id: 5,

        nama: 'Monitoring',

        deskripsi: 'Dashboard dan monitoring real-time',

        icon: 'desktop_windows',

        warna: '#06B6D4',

        route: '/monitoring',

        urutan: 5,
      },

      {
        id: 6,

        nama: 'Dokumen',

        deskripsi: 'Arsip, dokumen dan manajemen file',

        icon: 'description',

        warna: '#EF4444',

        route: '/dokumen',

        urutan: 6,
      },
    ]

    /*
     * Urutkan berdasarkan field urutan.
     */
    menus.value.sort((a, b) => {
      return Number(a.urutan || 0) - Number(b.urutan || 0)
    })

    /*
     * =====================================================
     * NANTI KALAU API LARAVEL SUDAH ADA
     * =====================================================
     *
     * Data dummy di atas tinggal dihapus.
     *
     * Contoh:
     *
     * const response =
     *   await api.get('/v1/sso/menu')
     *
     * menus.value =
     *   response.data?.data ?? []
     *
     * menus.value.sort(
     *   (a, b) =>
     *     Number(a.urutan || 0) -
     *     Number(b.urutan || 0)
     * )
     */
  } catch (error) {
    console.error('Gagal mengambil menu SSO:', error)

    menus.value = []
  } finally {
    loadingMenu.value = false
  }
}

/* =========================================================
   OPEN MENU
========================================================= */

const openMenu = (menu) => {
  if (!menu?.route) {
    return
  }

  router.push(menu.route)
}

/* =========================================================
   ON MOUNTED
========================================================= */

onMounted(() => {
  getMenus()
})
</script>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.sso-page {
  position: relative;

  min-height: calc(100vh - 75px);

  display: flex;
  flex-direction: column;

  overflow: hidden;

  color: #10375f;

  background: #ffffff;

  font-family: Inter, Arial, Helvetica, sans-serif;
}

/* =========================================================
   BACKGROUND RUMAH SAKIT

   PENTING:
   opacity dinaikkan supaya gambar terlihat.
========================================================= */

.hospital-bg {
  position: absolute;

  inset: 0;

  z-index: 0;

  background-image: url('@/assets/images/bg-hospital.png');

  background-repeat: no-repeat;

  background-position: center center;

  background-size: cover;

  /*
   * Sebelumnya terlalu tipis.
   * Sekarang dibuat lebih terlihat.
   */
  opacity: 0.42;

  filter: saturate(0.8) brightness(1.06);
}

/* =========================================================
   WHITE OVERLAY

   Dibuat jauh lebih transparan supaya background
   rumah sakit tidak hilang.
========================================================= */

.page-overlay {
  position: absolute;

  inset: 0;

  z-index: 1;

  pointer-events: none;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.67) 0%,
    rgba(255, 255, 255, 0.74) 22%,
    rgba(255, 255, 255, 0.66) 50%,
    rgba(255, 255, 255, 0.71) 75%,
    rgba(255, 255, 255, 0.83) 100%
  );
}

/* =========================================================
   CORNER DECORATION
========================================================= */

.decoration {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

/* =========================================================
   POJOK KANAN ATAS
   Bidang biru muda seperti contoh
========================================================= */

.decoration-top {
  top: -145px;
  right: -135px;

  width: 300px;
  height: 300px;

  border-radius: 50%;

  background: linear-gradient(145deg, rgba(212, 236, 253, 0.75), rgba(181, 221, 250, 0.52));

  box-shadow: inset 20px 20px 50px rgba(255, 255, 255, 0.25);
}

/* lingkaran kedua supaya bentuk kanan atas lebih berlapis */
.decoration-top::before {
  content: '';

  position: absolute;

  left: -55px;
  bottom: -40px;

  width: 190px;
  height: 190px;

  border-radius: 50%;

  background: rgba(224, 242, 255, 0.42);
}

/* =========================================================
   POJOK KIRI BAWAH
   Lingkaran kuning muda seperti contoh
========================================================= */

.decoration-bottom {
  left: -105px;
  bottom: -105px;

  width: 240px;
  height: 240px;

  border-radius: 50%;

  background: linear-gradient(145deg, rgba(255, 230, 160, 0.58), rgba(255, 201, 72, 0.28));

  box-shadow: inset -20px -20px 50px rgba(255, 255, 255, 0.28);
}

/* =========================================================
   MAIN CONTENT
========================================================= */

.main-content {
  position: relative;

  z-index: 10;

  flex: 1;

  width: 100%;

  margin: 0;

  padding: 38px 70px 45px;
}

/* =========================================================
   WELCOME SECTION
========================================================= */

.welcome-section {
  position: relative;

  width: 100%;

  min-height: 145px;

  padding: 27px 36px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  overflow: hidden;

  border: 1px solid rgba(215, 229, 241, 0.88);

  border-radius: 20px;

  background: linear-gradient(
    110deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.92) 52%,
    rgba(225, 244, 255, 0.87) 100%
  );

  box-shadow: 0 10px 30px rgba(27, 79, 126, 0.1);

  backdrop-filter: blur(7px);

  -webkit-backdrop-filter: blur(7px);
}

/* =========================================================
   HERO LEFT ACCENT
========================================================= */

.welcome-section::before {
  content: '';

  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;

  width: 6px;

  background: linear-gradient(180deg, #1ba6f7 0%, #0d7fd6 62%, #f2bb29 100%);
}

/* =========================================================
   HERO DECORATION
========================================================= */

.welcome-section::after {
  content: '';

  position: absolute;

  right: -90px;
  bottom: -190px;

  width: 400px;
  height: 400px;

  border-radius: 50%;

  background: radial-gradient(circle, rgba(18, 142, 235, 0.14), rgba(18, 142, 235, 0));

  pointer-events: none;
}

/* =========================================================
   WELCOME
========================================================= */

.welcome-content {
  position: relative;

  z-index: 3;
}

.welcome-label {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #4c6d8c;

  font-size: 13px;

  font-weight: 700;
}

.welcome-label .q-icon {
  color: #f2b724;
}

.welcome-name {
  margin: 10px 0 0;

  color: #07366a;

  font-size: 33px;

  line-height: 1.05;

  font-weight: 800;

  letter-spacing: -0.7px;
}

.welcome-description {
  margin-top: 10px;

  color: #6e8499;

  font-size: 12px;

  line-height: 1.5;

  font-weight: 500;
}

/* =========================================================
   PORTAL
========================================================= */

.portal-info {
  position: relative;

  z-index: 3;

  display: flex;

  align-items: center;

  gap: 15px;

  margin-right: 15px;
}

.portal-icon {
  width: 68px;
  height: 68px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 19px;

  color: #ffffff;

  background: linear-gradient(145deg, #169cf5, #0758b9);

  box-shadow: 0 10px 24px rgba(5, 105, 200, 0.24);
}

.portal-text {
  min-width: 160px;
}

.portal-label {
  color: #55738f;

  font-size: 11px;

  font-weight: 600;
}

.portal-name {
  margin-top: 5px;

  color: #0755a8;

  font-size: 20px;

  line-height: 1;

  font-weight: 800;

  letter-spacing: 0.8px;
}

.portal-description {
  margin-top: 7px;

  color: #8295a7;

  font-size: 9px;
}

/* =========================================================
   APPLICATION SECTION
========================================================= */

.application-section {
  width: 100%;

  margin-top: 27px;
}

/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
  width: 100%;

  margin-bottom: 15px;

  display: flex;

  align-items: flex-end;

  justify-content: space-between;
}

.section-title {
  color: #07396d;

  font-size: 21px;

  line-height: 1.2;

  font-weight: 800;
}

.section-description {
  margin-top: 5px;

  color: #74899d;

  font-size: 11px;
}

/* =========================================================
   APPLICATION COUNT
========================================================= */

.application-count {
  display: flex;

  align-items: center;

  gap: 7px;

  padding: 7px 13px;

  border: 1px solid rgba(215, 226, 236, 0.95);

  border-radius: 20px;

  color: #617c96;

  background: rgba(255, 255, 255, 0.9);

  box-shadow: 0 4px 12px rgba(27, 76, 123, 0.07);

  font-size: 10px;

  font-weight: 600;
}

/* =========================================================
   MENU GRID

   5 CARD BARIS PERTAMA
   DOKUMEN BARIS KEDUA
========================================================= */

.menu-grid {
  width: 100%;

  display: grid;

  grid-template-columns: repeat(5, minmax(0, 1fr));

  gap: 15px;
}

/* =========================================================
   MENU CARD
========================================================= */

.menu-card {
  position: relative;

  width: 100%;

  height: 105px;

  padding: 15px 14px 15px 18px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  overflow: hidden;

  border: 1px solid rgba(8, 75, 137, 0.8);

  border-radius: 15px;

  outline: none;

  color: #ffffff;

  text-align: left;

  font-family: inherit;

  background: linear-gradient(135deg, #07386b 0%, #08477f 48%, #07396e 100%);

  box-shadow: 0 7px 18px rgba(4, 48, 93, 0.2);

  cursor: pointer;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

/* =========================================================
   CARD DECORATION
========================================================= */

.menu-card::after {
  content: '';

  position: absolute;

  right: -55px;
  bottom: -75px;

  width: 160px;
  height: 160px;

  border-radius: 50%;

  background: radial-gradient(circle, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0));

  transition: transform 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-4px);

  border-color: rgba(58, 169, 255, 0.75);

  background: linear-gradient(135deg, #06427e, #075294, #06417b);

  box-shadow: 0 14px 28px rgba(4, 57, 108, 0.26);
}

.menu-card:hover::after {
  transform: scale(1.3);
}

/* =========================================================
   CARD ACCENT
========================================================= */

.card-accent {
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;

  width: 5px;
}

/* =========================================================
   MENU LEFT
========================================================= */

.menu-left {
  position: relative;

  z-index: 3;

  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
}

/* =========================================================
   ICON BOX
========================================================= */

.icon-box {
  width: 52px;
  height: 52px;

  flex: 0 0 52px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 14px;

  color: #ffffff;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.menu-card:hover .icon-box {
  transform: translateY(-2px) scale(1.05);
}

/* =========================================================
   MENU CONTENT
========================================================= */

.menu-content {
  min-width: 0;
}

.menu-title {
  color: #ffffff;

  font-size: 14px;

  line-height: 1.2;

  font-weight: 800;

  white-space: nowrap;
}

.menu-description {
  margin-top: 5px;

  color: rgba(226, 240, 253, 0.84);

  font-size: 9px;

  line-height: 1.35;

  font-weight: 500;
}

/* =========================================================
   MENU ARROW
========================================================= */

.menu-arrow {
  position: relative;

  z-index: 3;

  width: 30px;
  height: 30px;

  flex: 0 0 30px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-left: 7px;

  border-radius: 50%;

  color: rgba(255, 255, 255, 0.9);

  background: rgba(255, 255, 255, 0.14);

  transition:
    color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.menu-card:hover .menu-arrow {
  color: #07549c;

  background: #ffffff;

  transform: translateX(3px);
}

/* =========================================================
   FOOTER
========================================================= */

.sso-footer {
  position: relative;

  z-index: 10;

  margin-top: auto;

  padding: 15px 20px 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  color: #6d8398;

  font-size: 10px;

  line-height: 1.4;
}

.footer-dot {
  width: 4px;
  height: 4px;

  flex: 0 0 4px;

  border-radius: 50%;

  background: #dda328;
}

/* =========================================================
   LARGE MONITOR
========================================================= */

@media (min-width: 1600px) {
  .main-content {
    padding: 40px 80px 55px;
  }

  .welcome-section {
    min-height: 150px;

    padding: 28px 40px;
  }

  .welcome-name {
    font-size: 35px;
  }

  .menu-card {
    height: 110px;

    padding: 17px 16px 17px 20px;
  }

  .menu-title {
    font-size: 15px;
  }

  .menu-description {
    font-size: 10px;
  }
}

/* =========================================================
   EXTRA LARGE MONITOR
========================================================= */

@media (min-width: 1900px) {
  .main-content {
    padding-left: 95px;

    padding-right: 95px;
  }

  .menu-grid {
    gap: 16px;
  }
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1100px) {
  .main-content {
    padding: 25px 25px 45px;
  }

  .welcome-section {
    min-height: 145px;

    padding: 25px 28px;
  }

  .portal-info {
    margin-right: 0;
  }

  .portal-description {
    display: none;
  }

  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 14px;
  }

  .menu-card {
    height: 105px;
  }
}

/* =========================================================
   SMALL TABLET
========================================================= */

@media (max-width: 750px) {
  .portal-info {
    display: none;
  }

  .welcome-section {
    min-height: 135px;
  }

  .welcome-name {
    font-size: 28px;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 650px) {
  .sso-page {
    min-height: calc(100vh - 67px);

    overflow: visible;
  }

  .hospital-bg {
    background-position: center center;

    opacity: 0.32;
  }

  .page-overlay {
    background: rgba(255, 255, 255, 0.72);
  }

  .main-content {
    padding: 16px 12px 35px;
  }

  .welcome-section {
    min-height: auto;

    padding: 21px 20px;

    border-radius: 16px;
  }

  .welcome-section::before {
    width: 4px;
  }

  .welcome-label {
    font-size: 11px;
  }

  .welcome-name {
    margin-top: 8px;

    font-size: 24px;
  }

  .welcome-description {
    margin-top: 7px;

    max-width: 300px;

    font-size: 10px;
  }

  .application-section {
    margin-top: 23px;
  }

  .section-heading {
    margin-bottom: 13px;
  }

  .section-title {
    font-size: 17px;
  }

  .section-description {
    font-size: 10px;
  }

  .application-count {
    display: none;
  }

  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .menu-card {
    height: 125px;

    padding: 13px;

    display: block;

    border-radius: 14px;
  }

  .menu-left {
    display: block;
  }

  .icon-box {
    width: 44px;
    height: 44px;

    margin-bottom: 10px;

    border-radius: 12px;
  }

  .menu-title {
    font-size: 13px;
  }

  .menu-description {
    margin-top: 4px;

    padding-right: 15px;

    font-size: 9px;
  }

  .menu-arrow {
    position: absolute;

    top: 14px;
    right: 12px;

    width: 25px;
    height: 25px;

    margin: 0;
  }

  .sso-footer {
    flex-wrap: wrap;

    padding: 12px 15px 15px;

    font-size: 8px;

    text-align: center;
  }
}

/* =========================================================
   VERY SMALL MOBILE
========================================================= */

@media (max-width: 390px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }

  .menu-card {
    height: 100px;

    display: flex;
  }

  .menu-left {
    display: flex;
  }

  .icon-box {
    margin-bottom: 0;
  }

  .menu-arrow {
    position: relative;

    top: auto;
    right: auto;

    width: 27px;
    height: 27px;
  }
}
</style>
