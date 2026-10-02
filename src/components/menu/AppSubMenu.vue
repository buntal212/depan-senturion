<template>
  <div class="app-submenu" :class="`app-submenu--${variant}`">
    <!-- =====================================================
         ITEM MENU
    ====================================================== -->
    <q-item
      clickable
      dense
      class="menu-item"
      :class="{
        'menu-active': isActive,
        'menu-child': level > 0,
        'menu-item--master': variant === 'master',
        'menu-home': menu.id === 'beranda',
      }"
      :style="{
        paddingLeft: `${14 + level * 14}px`,
      }"
      @click="handleClick"
    >
      <!-- ICON -->
      <q-item-section avatar class="menu-icon-section">
        <q-icon
          :name="menu.icon || 'circle'"
          :size="level === 0 ? '18px' : '15px'"
          :class="{ 'menu-icon--master': variant === 'master' }"
        />
      </q-item-section>

      <!-- NAMA MENU -->
      <q-item-section>
        <q-item-label class="menu-label">
          {{ menu.nama }}
        </q-item-label>
      </q-item-section>

      <!-- PANAH JIKA ADA SUBMENU -->
      <q-item-section v-if="hasChildren" side class="menu-arrow-section">
        <q-icon
          :name="opened ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          size="17px"
          class="menu-arrow"
        />
      </q-item-section>
    </q-item>

    <!-- =====================================================
         CHILD / SUBMENU
    ====================================================== -->
    <q-slide-transition>
      <div v-show="opened && hasChildren" class="submenu-container">
        <AppSubMenu
          v-for="child in children"
          :key="child.id"
          :menu="child"
          :level="level + 1"
          :variant="variant"
        />
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'AppSubMenu',
})

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },

  level: {
    type: Number,
    default: 0,
  },

  variant: {
    type: String,
    default: 'default',
  },
})

const router = useRouter()
const route = useRoute()

const opened = ref(false)

/**
 * Mendukung response API:
 *
 * children: []
 *
 * atau:
 *
 * children_recursive: []
 */
const children = computed(() => {
  if (Array.isArray(props.menu.children)) {
    return props.menu.children
  }

  if (Array.isArray(props.menu.children_recursive)) {
    return props.menu.children_recursive
  }

  return []
})

const hasChildren = computed(() => {
  return children.value.length > 0
})

/**
 * Cek apakah route menu sedang aktif
 */
const isOwnRouteActive = computed(() => {
  if (!props.menu.route) {
    return false
  }

  return route.path === props.menu.route
})

/**
 * Cek recursive apakah salah satu child aktif
 */
const childHasActiveRoute = (items) => {
  return items.some((item) => {
    if (item.route && route.path === item.route) {
      return true
    }

    const itemChildren = Array.isArray(item.children)
      ? item.children
      : Array.isArray(item.children_recursive)
        ? item.children_recursive
        : []

    if (itemChildren.length > 0) {
      return childHasActiveRoute(itemChildren)
    }

    return false
  })
}

/**
 * Parent ikut dianggap aktif jika salah satu
 * submenu di bawahnya sedang aktif.
 */
const hasActiveChild = computed(() => {
  return childHasActiveRoute(children.value)
})

const isActive = computed(() => {
  return isOwnRouteActive.value || hasActiveChild.value
})

/**
 * Klik menu
 */
const handleClick = () => {
  /**
   * Jika mempunyai submenu,
   * buka/tutup submenu.
   */
  if (hasChildren.value) {
    opened.value = !opened.value
    return
  }

  /**
   * Jika tidak mempunyai submenu
   * dan mempunyai route, buka halaman.
   */
  if (props.menu.route) {
    router.push(props.menu.route)
  }
}

/**
 * Jika route aktif berada di dalam submenu,
 * parent otomatis dibuka.
 */
watch(
  hasActiveChild,
  (active) => {
    if (active) {
      opened.value = true
    }
  },
  {
    immediate: true,
  },
)
</script>

<style scoped>
/* =========================================================
   ROOT
========================================================= */

.app-submenu {
  width: 100%;
}

/* =========================================================
   MENU ITEM
========================================================= */

.menu-item {
  position: relative;

  min-height: 42px;

  margin: 2px 8px;

  padding-top: 4px;
  padding-bottom: 4px;

  border-radius: 5px;

  color: rgba(255, 255, 255, 0.86);

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

/* hover */
.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);

  color: #ffffff;
}

/* =========================================================
   ACTIVE
========================================================= */

.menu-active {
  background: linear-gradient(90deg, #168cff 0%, #0878eb 100%);

  color: #ffffff;

  box-shadow: 0 4px 12px rgba(22, 140, 255, 0.22);
}

.menu-active:hover {
  background: linear-gradient(90deg, #168cff 0%, #0878eb 100%);
}

/* =========================================================
   ICON
========================================================= */

.menu-icon-section {
  min-width: 31px !important;

  padding-right: 0 !important;

  color: inherit;
}

.menu-icon-section .q-icon {
  color: inherit;
}

/* =========================================================
   LABEL
========================================================= */

.menu-label {
  font-size: 13px;

  font-weight: 500;

  line-height: 1.3;

  color: inherit;
}

/* =========================================================
   ARROW
========================================================= */

.menu-arrow-section {
  padding-left: 4px;

  color: rgba(255, 255, 255, 0.7);
}

.menu-arrow {
  transition: transform 0.2s ease;
}

/* =========================================================
   SUBMENU
========================================================= */

.submenu-container {
  position: relative;

  width: 100%;
}

/*
 * Garis tipis untuk membantu membaca
 * struktur submenu bertingkat.
 */
.submenu-container::before {
  content: '';

  position: absolute;

  top: 2px;
  bottom: 2px;

  left: 28px;

  width: 1px;

  background: rgba(255, 255, 255, 0.07);
}

/* child sedikit lebih kecil */
.menu-child {
  min-height: 38px;
}

.menu-child .menu-label {
  font-size: 12.5px;
}

/* =========================================================
   DEEP LEVEL
========================================================= */

.menu-child:hover {
  background: rgba(255, 255, 255, 0.07);
}

/* =========================================================
   QUASAR
========================================================= */

.menu-item :deep(.q-focus-helper) {
  display: none;
}

/* =========================================================
   MASTER LAYOUT
========================================================= */

:global(.master-menu-list) {
  min-height: calc(100% - 58px);
  background: transparent;
}

:global(.menu-item--master) {
  overflow: hidden;
  min-height: 48px;
  margin: 6px 0;
  padding-right: 12px;
  padding-top: 0;
  padding-bottom: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  color: rgba(237, 247, 255, 0.88);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

:global(.menu-item--master:hover) {
  background: rgba(111, 190, 255, 0.13);
  border-color: rgba(190, 229, 255, 0.16);
  color: #ffffff;
  transform: translateX(2px);
}

:global(.menu-item--master.menu-active),
:global(.menu-item--master.menu-active:hover) {
  border-color: rgba(155, 219, 255, 0.38);
  color: #ffffff;
  background: linear-gradient(105deg, #1595f4 0%, #0876dc 100%);
  box-shadow: 0 8px 18px rgba(0, 30, 74, 0.28);
  transform: none;
}

:global(.menu-item--master.menu-active::before) {
  content: '';
  position: absolute;
  top: 13px;
  bottom: 13px;
  left: 9px;
  width: 3px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.88);
}

/* Beranda menjadi akses utama dengan penanda warna berbeda. */
:global(.menu-item--master.menu-home),
:global(.menu-item--master.menu-home:hover),
:global(.menu-item--master.menu-home.menu-active),
:global(.menu-item--master.menu-home.menu-active:hover) {
  border-color: #f2c230;
  color: #ffffff;
  background: linear-gradient(110deg, #122d50 0%, #173e69 100%);
  box-shadow: 0 6px 15px rgba(0, 22, 54, 0.36);
  transform: none;
}

:global(.menu-item--master.menu-home::before) {
  display: none;
}

:global(.menu-item--master.menu-home .menu-icon--master) {
  color: #ffd34c;
  background: rgba(255, 211, 76, 0.12);
}

:global(.menu-item--master .menu-icon-section) {
  min-width: 43px !important;
  color: inherit;
}

:global(.menu-item--master .menu-icon-section .q-icon) {
  font-size: 17px;
}

:global(.menu-item--master .menu-icon--master) {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(147, 210, 255, 0.13);
}

:global(.menu-item--master:hover .menu-icon--master) {
  background: rgba(161, 218, 255, 0.19);
}

:global(.menu-item--master.menu-active .menu-icon--master) {
  background: rgba(255, 255, 255, 0.18);
}

:global(.menu-item--master .menu-label) {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.1px;
}

:global(.app-submenu--master .submenu-container::before) {
  display: none;
}

:global(.menu-item--master .menu-arrow-section) {
  color: rgba(223, 241, 255, 0.8);
}
</style>
