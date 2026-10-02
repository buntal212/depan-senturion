<template>
  <section class="app-filter-heder">
    <div class="app-filter-heder__fields">
      <q-input
        v-if="showSearch"
        :model-value="filterValue.search"
        class="app-filter-heder__search"
        outlined
        dense
        clearable
        :debounce="searchDebounce"
        :placeholder="searchPlaceholder"
        @update:model-value="updateValue('search', $event || '')"
      >
        <template #prepend>
          <q-icon name="search" class="app-filter-heder__field-icon" />
        </template>
      </q-input>

      <q-input
        v-if="showDateRange"
        :model-value="filterValue.dateFrom"
        class="app-filter-heder__date"
        outlined
        dense
        readonly
        :label="fromDateLabel"
        placeholder="Pilih tanggal"
      >
        <template #prepend>
          <q-icon name="calendar_month" class="app-filter-heder__field-icon" />
        </template>

        <template #append>
          <q-icon
            v-if="filterValue.dateFrom"
            class="cursor-pointer"
            name="close"
            @click.stop="updateValue('dateFrom', '')"
          />
          <q-icon class="cursor-pointer" name="expand_more">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                :model-value="filterValue.dateFrom"
                :mask="dateMask"
                @update:model-value="updateValue('dateFrom', $event)"
              >
                <div class="row items-center justify-end q-pa-sm">
                  <q-btn v-close-popup flat color="primary" label="Selesai" />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-if="showDateRange"
        :model-value="filterValue.dateTo"
        class="app-filter-heder__date"
        outlined
        dense
        readonly
        :label="toDateLabel"
        placeholder="Pilih tanggal"
      >
        <template #prepend>
          <q-icon name="calendar_month" class="app-filter-heder__field-icon" />
        </template>

        <template #append>
          <q-icon
            v-if="filterValue.dateTo"
            class="cursor-pointer"
            name="close"
            @click.stop="updateValue('dateTo', '')"
          />
          <q-icon class="cursor-pointer" name="expand_more">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                :model-value="filterValue.dateTo"
                :mask="dateMask"
                @update:model-value="updateValue('dateTo', $event)"
              >
                <div class="row items-center justify-end q-pa-sm">
                  <q-btn v-close-popup flat color="primary" label="Selesai" />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <slot name="additional-filters" :filters="filterValue" :update-filter="updateValue" />
    </div>

    <div v-if="$slots.actions || showReset" class="app-filter-heder__actions">
      <slot name="actions" :filters="filterValue" :reset="resetFilters" />
      <q-btn
        v-if="showReset"
        flat
        no-caps
        class="app-filter-heder__reset"
        color="primary"
        icon="restart_alt"
        label="Reset"
        @click="resetFilters"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'AppFilterHeder',
})

const props = defineProps({
  /*
   * Format v-model:
   * { search: '', dateFrom: '2026-09-01', dateTo: '2026-09-30' }
   */
  modelValue: {
    type: Object,
    default: () => ({}),
  },

  showSearch: {
    type: Boolean,
    default: true,
  },

  showDateRange: {
    type: Boolean,
    default: true,
  },

  showReset: {
    type: Boolean,
    default: true,
  },

  searchPlaceholder: {
    type: String,
    default: 'Cari data...',
  },

  searchDebounce: {
    type: Number,
    default: 400,
  },

  fromDateLabel: {
    type: String,
    default: 'Dari tanggal',
  },

  toDateLabel: {
    type: String,
    default: 'Sampai tanggal',
  },

  dateMask: {
    type: String,
    default: 'YYYY-MM-DD',
  },
})

const emit = defineEmits(['update:modelValue', 'filter', 'reset'])

const filterValue = computed(() => ({
  search: '',
  dateFrom: props.modelValue.dateRange?.from || '',
  dateTo: props.modelValue.dateRange?.to || '',
  ...props.modelValue,
}))

function updateValue(key, value) {
  const nextValue = {
    ...filterValue.value,
    [key]: value,
  }

  emit('update:modelValue', nextValue)
  emit('filter', nextValue)
}

function resetFilters() {
  const nextValue = {
    ...filterValue.value,
    search: '',
    dateFrom: '',
    dateTo: '',
  }

  emit('update:modelValue', nextValue)
  emit('filter', nextValue)
  emit('reset', nextValue)
}
</script>

<style scoped>
.app-filter-heder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
  padding: 13px 16px;
  border: 1px solid #d9e5ef;
  border-radius: 12px;
  background: linear-gradient(100deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 6px 18px rgba(16, 55, 95, 0.06);
}

.app-filter-heder__fields,
.app-filter-heder__actions {
  min-height: 42px;
  margin-left: auto;
  padding-left: 14px;
  border-left: 1px solid #e2ebf2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-filter-heder__search {
  width: min(100%, 310px);
}

.app-filter-heder__date {
  width: 230px;
}

.app-filter-heder :deep(.q-field--outlined .q-field__control) {
  min-height: 40px;
  border-radius: 9px;
  background: #ffffff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.app-filter-heder :deep(.q-field--outlined .q-field__control:before) {
  border-color: #c8d7e4;
}

.app-filter-heder :deep(.q-field--outlined:hover .q-field__control:before) {
  border-color: #7caed5;
}

.app-filter-heder :deep(.q-field--focused .q-field__control) {
  box-shadow: 0 0 0 3px rgba(30, 126, 211, 0.1);
}

.app-filter-heder :deep(.q-field__native),
.app-filter-heder :deep(.q-field__label) {
  color: #49647d;
  font-size: 13px;
}

.app-filter-heder :deep(.q-field__marginal) {
  height: 40px;
  color: #537896;
}

.app-filter-heder__field-icon {
  color: #237abe;
}

.app-filter-heder__reset {
  min-height: 38px;
  padding: 0 11px;
  border-radius: 8px;
  background: #edf6fd;
  font-size: 12px;
  font-weight: 700;
}

.app-filter-heder__reset:hover {
  background: #e0f0fc;
}

@media (max-width: 600px) {
  .app-filter-heder,
  .app-filter-heder__fields {
    align-items: stretch;
    flex-direction: column;
  }

  .app-filter-heder__search,
  .app-filter-heder__date {
    width: 100%;
  }

  .app-filter-heder__actions {
    justify-content: flex-end;
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
  }
}
</style>
