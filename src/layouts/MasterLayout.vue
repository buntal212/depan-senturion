<template>
  <q-layout view="lHh Lpr fFf" class="master-layout">
    <q-header class="master-header" :class="{ 'master-header--drawer-closed': !leftDrawerOpen }">
      <q-toolbar class="master-toolbar">
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Buka atau tutup menu"
          class="master-menu-toggle"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div class="master-toolbar-divider" aria-hidden="true"></div>

        <q-toolbar-title class="master-title">
          <span>{{ masterStore.moduleName }}</span>
          <span class="master-title__context">Data master</span>
        </q-toolbar-title>

        <div class="master-header-actions">
          <q-btn flat round dense class="master-notification" aria-label="Notifikasi">
            <q-icon name="notifications_none" size="23px" />
            <q-badge
              floating
              rounded
              color="negative"
              label="1"
              class="master-notification__badge"
            />
          </q-btn>

          <div class="master-header-separator"></div>

          <div class="master-user">
            <q-avatar size="38px" class="master-user__avatar">
              <q-icon name="person" size="23px" />
            </q-avatar>

            <div class="master-user__information">
              <div class="master-user__name">Arie Setiawan</div>
              <div class="master-user__role">Administrator</div>
            </div>

            <q-icon name="keyboard_arrow_down" size="19px" class="master-user__arrow" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <div v-show="leftDrawerOpen" class="master-sidebar-accent" aria-hidden="true"></div>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240" class="master-drawer">
      <q-scroll-area class="fit master-scroll-area">
        <q-list class="master-menu-list">
          <AppSubMenu :menu="masterStore.homeMenu" variant="master" />

          <AppSubMenu
            v-for="item in masterStore.menuItems"
            :key="item.id"
            :menu="item"
            variant="master"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="master-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import AppSubMenu from '@/components/menu/AppSubMenu.vue'
import { useMasterStore } from '@/stores/master'

const masterStore = useMasterStore()
const leftDrawerOpen = ref(true)

onMounted(() => {
  masterStore.getMenuItems()
})
</script>

<style scoped>
.master-layout,
.master-page-container {
  background: #f1f3f5;
}

.master-header {
  left: 240px;
  height: 53px;
  background: #ffffff;
  border-top: 1px solid #e4edf5;
  border-bottom: 2px solid #f2c230;
  box-shadow: 0 3px 10px rgba(21, 58, 96, 0.06);
}

.master-header--drawer-closed {
  left: 0;
}

.master-sidebar-accent {
  position: fixed;
  z-index: 3002;
  top: 0;
  left: 237px;
  width: 3px;
  height: 100vh;
  background: #f2c230;
}

.master-toolbar {
  min-height: 51px;
  padding: 0 20px 0 16px;
}

.master-menu-toggle {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  color: #12365d;
  background: #edf6fe;
}

.master-menu-toggle:hover {
  color: #075ba6;
  background: #dceefe;
}

.master-toolbar-divider {
  width: 1px;
  height: 25px;
  margin-left: 12px;
  background: #dce7ef;
}

.master-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 14px;
  color: #12365d;
  font-size: 19px;
  font-weight: 700;
}

.master-title__context {
  padding: 3px 8px;
  border-radius: 5px;
  color: #4b779f;
  background: #eef6fd;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.master-header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.master-notification {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  color: #1d4f7b;
  background: #f2f8fd;
}

.master-notification:hover {
  color: #075ba6;
  background: #e5f2fc;
}

.master-notification__badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border: 2px solid #ffffff;
  font-size: 9px;
}

.master-header-separator {
  width: 1px;
  height: 32px;
  background: #dbe6ee;
}

.master-user {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 4px 8px 4px 5px;
  border: 1px solid #e3edf5;
  border-radius: 9px;
  background: #fbfdff;
}

.master-user__avatar {
  color: #16496e;
  background: linear-gradient(145deg, #ffe0bc, #f1b577);
  border: 2px solid #e5edf5;
  box-shadow: 0 2px 7px rgba(31, 80, 125, 0.12);
}

.master-user__information {
  min-width: 104px;
}

.master-user__name {
  color: #173c60;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
}

.master-user__role {
  margin-top: 3px;
  color: #8192a3;
  font-size: 9px;
  line-height: 1;
}

.master-user__arrow {
  color: #7e93a6;
}

@media (max-width: 599px) {
  .master-toolbar {
    padding-right: 10px;
  }

  .master-title__context,
  .master-header-separator,
  .master-user__information,
  .master-user__arrow {
    display: none;
  }

  .master-header-actions {
    gap: 8px;
  }

  .master-user {
    padding: 3px;
  }
}

.master-scroll-area {
  background: transparent;
}

.master-drawer {
  background:
    radial-gradient(circle at -18% 108%, rgba(38, 153, 255, 0.3) 0 17%, transparent 17.3%),
    radial-gradient(circle at -18% 108%, rgba(38, 153, 255, 0.15) 0 27%, transparent 27.3%),
    linear-gradient(180deg, #075092 0%, #003b7c 48%, #002c63 100%);
}

/* Sidebar berdiri penuh dari atas layar, tidak mengikuti tinggi header. */
:global(.q-layout .master-drawer.q-drawer--top-padding) {
  top: 0 !important;
  height: 100vh !important;
}

.master-drawer :deep(.q-drawer__content),
.master-scroll-area :deep(.q-scrollarea__container),
.master-scroll-area :deep(.q-scrollarea__content) {
  background:
    radial-gradient(circle at -18% 108%, rgba(38, 153, 255, 0.3) 0 17%, transparent 17.3%),
    radial-gradient(circle at -18% 108%, rgba(38, 153, 255, 0.15) 0 27%, transparent 27.3%),
    linear-gradient(180deg, #075092 0%, #003b7c 48%, #002c63 100%);
}

.master-menu-list {
  position: relative;
  z-index: 1;
  padding: 14px 12px 40px;
}

@media (max-width: 1023px) {
  .master-header {
    left: 0;
  }

  .master-sidebar-accent {
    display: none;
  }
}

@media (min-width: 1024px) {
  :global(.q-drawer--left.q-drawer--top-padding) {
    top: 0 !important;
    height: 100vh !important;
  }
}
</style>
