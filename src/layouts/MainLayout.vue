<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ==========================================
         HEADER SENTURION
    =========================================== -->
    <q-header class="senturion-header">
      <q-toolbar class="senturion-toolbar">
        <!-- BRAND -->
        <div class="header-brand cursor-pointer" @click="goHome">
          <img :src="logoSenturion" alt="SENTURION" class="header-logo" />

          <div class="brand-text">
            <div class="brand-name">SENTURION</div>

            <div class="brand-subtitle">Sistem Informasi Manajemen Rumah Sakit</div>
          </div>
        </div>

        <!-- SEARCH -->
        <div v-if="showMenuSearch" class="header-search">
          <q-input
            v-model="search"
            dense
            outlined
            hide-bottom-space
            placeholder="Cari menu disini..."
            class="search-input"
          >
            <template #prepend>
              <q-icon name="search" size="19px" />
            </template>

            <template v-if="search" #append>
              <q-icon name="close" size="17px" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>
        </div>

        <q-space />

        <!-- RIGHT -->
        <div class="header-actions">
          <!-- NOTIFICATION -->
          <q-btn flat round dense class="notification-button">
            <q-icon name="notifications_none" size="25px" />

            <q-badge
              v-if="notificationCount > 0"
              floating
              rounded
              color="red"
              :label="notificationCount"
              class="notification-badge"
            />

            <q-tooltip> Notifikasi </q-tooltip>

            <q-menu anchor="bottom right" self="top right" :offset="[0, 10]">
              <q-list class="notification-menu">
                <q-item-label header> Notifikasi </q-item-label>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="blue-1" text-color="primary" icon="info_outline" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label> Selamat datang di SENTURION </q-item-label>

                    <q-item-label caption> Sistem siap digunakan </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- SEPARATOR -->
          <div class="header-separator"></div>

          <!-- USER -->
          <div class="user-area">
            <q-avatar size="39px" class="user-avatar">
              <q-icon name="person" size="24px" />
            </q-avatar>

            <div class="user-information">
              <div class="user-name">Arie Setiawan</div>

              <div class="user-role">Administrator</div>
            </div>

            <q-icon name="keyboard_arrow_down" size="20px" class="user-arrow" />

            <!-- USER MENU -->
            <q-menu anchor="bottom right" self="top right" :offset="[0, 12]">
              <q-list class="user-menu">
                <!-- USER INFO -->
                <q-item class="user-menu-header">
                  <q-item-section avatar>
                    <q-avatar size="42px" class="user-avatar">
                      <q-icon name="person" size="26px" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-weight-bold"> Arie Setiawan </q-item-label>

                    <q-item-label caption> Administrator </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />

                <!-- PROFILE -->
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="person_outline" color="blue-grey-7" />
                  </q-item-section>

                  <q-item-section> Profil Saya </q-item-section>
                </q-item>

                <!-- SETTINGS -->
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="settings" color="blue-grey-7" />
                  </q-item-section>

                  <q-item-section> Pengaturan </q-item-section>
                </q-item>

                <q-separator />

                <!-- LOGOUT -->
                <q-item clickable v-close-popup class="logout-item" @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" color="negative" />
                  </q-item-section>

                  <q-item-section class="text-negative"> Keluar </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </q-toolbar>

      <!-- GARIS AKSEN -->
      <div class="header-accent">
        <div class="accent-blue"></div>
        <div class="accent-gold"></div>
        <div class="accent-blue-end"></div>
      </div>
    </q-header>

    <!-- ==========================================
         CONTENT
    =========================================== -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import logoSenturion from '@/assets/images/logo-senturion.png'

const router = useRouter()
const route = useRoute()

const search = ref('')

const notificationCount = ref(1)

const showMenuSearch = computed(() => {
  return route.path === '/'
})

const goHome = () => {
  router.push('/')
}

const logout = () => {
  /*
   * NANTI TOKEN LOGIN DIHAPUS DI SINI
   *
   * contoh:
   * localStorage.removeItem('token')
   */

  router.push('/login')
}
</script>

<style scoped>
/* =========================================================
   HEADER
========================================================= */

.senturion-header {
  background: rgba(255, 255, 255, 0.97);

  color: #12365d;

  border-bottom: 1px solid rgba(210, 225, 239, 0.85);

  box-shadow: 0 3px 18px rgba(16, 67, 119, 0.09);

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);
}

.senturion-toolbar {
  min-height: 72px;

  padding: 0 30px;

  gap: 28px;
}

/* =========================================================
   BRAND
========================================================= */

.header-brand {
  display: flex;

  align-items: center;

  flex-shrink: 0;
}

.header-logo {
  width: 48px;
  height: 48px;

  object-fit: contain;
}

.brand-text {
  margin-left: 10px;

  padding-left: 11px;

  border-left: 1px solid #dce7f1;
}

.brand-name {
  color: #063b78;

  font-size: 17px;

  line-height: 1;

  font-weight: 800;

  letter-spacing: 0.6px;
}

.brand-subtitle {
  margin-top: 5px;

  color: #70849a;

  font-size: 10px;

  line-height: 1.1;

  white-space: nowrap;
}

/* =========================================================
   SEARCH
========================================================= */

.header-search {
  width: 420px;

  max-width: 34vw;

  margin-left: 25px;
}

.search-input :deep(.q-field__control) {
  height: 40px;

  border-radius: 9px;

  background: linear-gradient(180deg, #f8fbfe, #f0f6fb);
}

.search-input :deep(.q-field__control::before) {
  border-color: #dce7f1;
}

.search-input :deep(.q-field__control:hover::before) {
  border-color: #a9c5df;
}

.search-input :deep(.q-field__prepend) {
  color: #7088a1;
}

.search-input :deep(.q-field__native) {
  color: #36546f;

  font-size: 12px;
}

/* =========================================================
   ACTIONS
========================================================= */

.header-actions {
  display: flex;

  align-items: center;

  gap: 15px;

  flex-shrink: 0;
}

.notification-button {
  color: #315777;
}

.notification-badge {
  min-width: 17px;

  height: 17px;

  padding: 0 4px;

  font-size: 9px;

  border: 2px solid white;
}

.header-separator {
  width: 1px;
  height: 32px;

  margin: 0 2px;

  background: #e1eaf2;
}

/* =========================================================
   USER
========================================================= */

.user-area {
  display: flex;

  align-items: center;

  gap: 9px;

  padding: 5px 7px;

  border-radius: 10px;

  cursor: pointer;

  transition: background 0.2s ease;
}

.user-area:hover {
  background: #f2f7fc;
}

.user-avatar {
  color: #16496e;

  background: linear-gradient(145deg, #ffe0bc, #f1b577);

  border: 2px solid #e5edf5;

  box-shadow: 0 2px 8px rgba(31, 80, 125, 0.12);
}

.user-information {
  min-width: 105px;
}

.user-name {
  color: #173c60;

  font-size: 12px;

  line-height: 1.2;

  font-weight: 700;
}

.user-role {
  margin-top: 3px;

  color: #8192a3;

  font-size: 9px;

  line-height: 1;
}

.user-arrow {
  color: #7e93a6;
}

/* =========================================================
   HEADER ACCENT
========================================================= */

.header-accent {
  width: 100%;
  height: 3px;

  display: flex;
}

.accent-blue {
  width: 48%;

  background: linear-gradient(90deg, #004c9d, #0792f1);
}

.accent-gold {
  width: 12%;

  background: linear-gradient(90deg, #e5a217, #ffd55a, #d8930b);
}

.accent-blue-end {
  flex: 1;

  background: linear-gradient(90deg, #0792f1, #004c9d);
}

/* =========================================================
   MENU
========================================================= */

.notification-menu {
  width: 330px;

  max-width: calc(100vw - 30px);
}

.user-menu {
  width: 230px;
}

.user-menu-header {
  padding: 14px 16px;
}

.logout-item {
  margin-top: 3px;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1050px) {
  .senturion-toolbar {
    padding: 0 20px;

    gap: 16px;
  }

  .brand-subtitle {
    display: none;
  }

  .brand-text {
    border-left: 0;

    padding-left: 0;
  }

  .header-search {
    margin-left: 10px;

    max-width: 40vw;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 650px) {
  .senturion-toolbar {
    min-height: 64px;

    padding: 0 12px;

    gap: 8px;
  }

  .header-logo {
    width: 38px;
    height: 38px;
  }

  .brand-text {
    display: none;
  }

  .header-search {
    flex: 1;

    width: auto;

    max-width: none;

    margin-left: 4px;
  }

  .search-input :deep(.q-field__control) {
    height: 38px;
  }

  .header-actions {
    gap: 5px;
  }

  .header-separator {
    display: none;
  }

  .user-information,
  .user-arrow {
    display: none;
  }

  .user-area {
    padding: 2px;
  }

  .user-avatar {
    width: 34px;
    height: 34px;
  }
}
</style>
