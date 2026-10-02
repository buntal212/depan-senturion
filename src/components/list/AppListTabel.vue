<template>
  <q-table
    class="app-list-large"
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :loading="loading"
    :filter="filter"
    :pagination="pagination"
    :rows-per-page-options="rowsPerPageOptions"
    :visible-columns="visibleColumns"
    :hide-pagination="hidePagination"
    :binary-state-sort="binaryStateSort"
    :flat="flat"
    :bordered="bordered"
    :dense="dense"
    @update:pagination="emit('update:pagination', $event)"
    @request="emit('request', $event)"
  >
    <template v-if="$slots.top || title" #top>
      <slot name="top">
        <div class="app-list-large__title">{{ title }}</div>
      </slot>
    </template>

    <template #body-cell="slotProps">
      <q-td :props="slotProps">
        <slot :name="`body-cell-${slotProps.col.name}`" v-bind="slotProps">
          <slot name="body-cell" v-bind="slotProps">
            {{ slotProps.value ?? '-' }}
          </slot>
        </slot>
      </q-td>
    </template>

    <template #loading>
      <slot name="loading">
        <q-inner-loading showing color="primary" />
      </slot>
    </template>

    <template #no-data="slotProps">
      <slot name="no-data" v-bind="slotProps">
        <div class="app-list-large__empty">
          <q-icon name="inbox" size="34px" />
          <span>{{ noDataLabel }}</span>
        </div>
      </slot>
    </template>
  </q-table>
</template>

<script setup>
defineOptions({
  name: 'AppListLarge',
})

defineProps({
  title: {
    type: String,
    default: '',
  },

  rows: {
    type: Array,
    default: () => [],
  },

  /*
   * Mengikuti format kolom q-table Quasar.
   * Parent bebas menentukan nama, label, field, align, sortable, dan format.
   */
  columns: {
    type: Array,
    default: () => [],
  },

  rowKey: {
    type: String,
    default: 'id',
  },

  loading: {
    type: Boolean,
    default: false,
  },

  filter: {
    type: String,
    default: '',
  },

  pagination: {
    type: Object,
    default: undefined,
  },

  rowsPerPageOptions: {
    type: Array,
    default: () => [10, 25, 50, 0],
  },

  visibleColumns: {
    type: Array,
    default: undefined,
  },

  hidePagination: {
    type: Boolean,
    default: false,
  },

  binaryStateSort: {
    type: Boolean,
    default: true,
  },

  flat: {
    type: Boolean,
    default: false,
  },

  bordered: {
    type: Boolean,
    default: true,
  },

  dense: {
    type: Boolean,
    default: false,
  },

  noDataLabel: {
    type: String,
    default: 'Belum ada data.',
  },
})

const emit = defineEmits(['update:pagination', 'request'])
</script>

<style scoped>
.app-list-large {
  overflow: hidden;
  border-color: #d9e3ec;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(16, 55, 95, 0.06);
}

.app-list-large :deep(thead tr) {
  background: #f4f8fb;
}

.app-list-large :deep(th) {
  height: 46px;
  color: #315777;
  font-size: 12px;
  font-weight: 700;
}

.app-list-large :deep(td) {
  height: 52px;
  color: #284863;
  font-size: 13px;
}

.app-list-large :deep(tbody tr:hover) {
  background: #f7fbff;
}

.app-list-large__title {
  color: #12365d;
  font-size: 17px;
  font-weight: 700;
}

.app-list-large__empty {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #8a9bad;
  font-size: 13px;
}
</style>
