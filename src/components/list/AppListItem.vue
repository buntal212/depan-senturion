<template>
  <div class="app-list-item">
    <q-infinite-scroll
      :disable="!infiniteScroll || !hasMore"
      :offset="infiniteScrollOffset"
      @load="handleLoad"
    >
      <q-list class="app-list-item__list">
        <template v-if="loading && items.length === 0">
          <q-item v-for="index in skeletonCount" :key="index">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" size="38px" />
            </q-item-section>

            <q-item-section>
              <q-skeleton type="text" width="35%" />
              <q-skeleton type="text" width="60%" />
            </q-item-section>
          </q-item>
        </template>

        <template v-else-if="items.length > 0">
          <template v-for="(item, index) in items" :key="getItemKey(item, index)">
            <q-item
              :clickable="clickable"
              :class="{
                'app-list-item__row--clickable': clickable,
                'app-list-item__row': true,
              }"
              @click="handleItemClick(item, index)"
            >
              <q-item-section
                v-if="
                  showAvatar &&
                  ($slots.avatar || getValue(item, avatarField) || getValue(item, iconField))
                "
                avatar
              >
                <slot name="avatar" :item="item" :index="index">
                  <q-avatar color="blue-1" text-color="primary">
                    <img
                      v-if="getValue(item, avatarField)"
                      :src="getValue(item, avatarField)"
                      :alt="getValue(item, titleField)"
                    />
                    <q-icon v-else :name="getValue(item, iconField)" />
                  </q-avatar>
                </slot>
              </q-item-section>

              <q-item-section>
                <slot name="item" :item="item" :index="index">
                  <q-item-label>{{ getValue(item, titleField) }}</q-item-label>
                  <q-item-label v-if="getValue(item, captionField)" caption lines="1">
                    {{ getValue(item, captionField) }}
                  </q-item-label>
                </slot>
              </q-item-section>

              <q-item-section
                v-if="$slots.side || showEdit || showDelete"
                side
                class="app-list-item__actions"
              >
                <slot name="side" :item="item" :index="index" />
                <q-btn
                  v-if="showEdit"
                  flat
                  round
                  dense
                  class="app-list-item__action app-list-item__action--edit"
                  color="primary"
                  icon="edit"
                  aria-label="Ubah data"
                  @click.stop="emit('edit', item, index)"
                />
                <q-btn
                  v-if="showDelete"
                  flat
                  round
                  dense
                  class="app-list-item__action app-list-item__action--delete"
                  color="negative"
                  icon="delete_outline"
                  aria-label="Hapus data"
                  @click.stop="emit('delete', item, index)"
                />
              </q-item-section>
            </q-item>
          </template>
        </template>

        <q-item v-else class="app-list-item__empty">
          <q-item-section class="items-center q-py-lg">
            <q-icon name="inbox" size="34px" />
            <q-item-label class="q-mt-sm">{{ noDataLabel }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <template #loading>
        <div class="app-list-item__loading row justify-center q-pa-md">
          <q-spinner color="primary" size="28px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
defineOptions({
  name: 'AppListItem',
})

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },

  itemKey: {
    type: [String, Function],
    default: 'id',
  },

  titleField: {
    type: [String, Function],
    default: 'nama',
  },

  captionField: {
    type: [String, Function],
    default: 'deskripsi',
  },

  iconField: {
    type: [String, Function],
    default: 'icon',
  },

  avatarField: {
    type: [String, Function],
    default: 'avatar',
  },

  showAvatar: {
    type: Boolean,
    default: true,
  },

  showEdit: {
    type: Boolean,
    default: false,
  },

  showDelete: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  infiniteScroll: {
    type: Boolean,
    default: true,
  },

  hasMore: {
    type: Boolean,
    default: false,
  },

  infiniteScrollOffset: {
    type: Number,
    default: 250,
  },

  perPage: {
    type: Number,
    default: 12,
  },

  clickable: {
    type: Boolean,
    default: false,
  },

  skeletonCount: {
    type: Number,
    default: 3,
  },

  noDataLabel: {
    type: String,
    default: 'Belum ada data.',
  },
})

const emit = defineEmits(['item-click', 'edit', 'delete', 'load'])

const getValue = (item, field) => {
  if (typeof field === 'function') {
    return field(item)
  }

  return item?.[field] ?? ''
}

const getItemKey = (item, index) => {
  return getValue(item, props.itemKey) || index
}

const handleItemClick = (item, index) => {
  if (props.clickable) {
    emit('item-click', item, index)
  }
}

const handleLoad = (index, done) => {
  if (!props.hasMore) {
    done()
    return
  }

  emit('load', {
    index,
    perPage: props.perPage,
    done,
  })
}
</script>

<style scoped>
.app-list-item {
  overflow: hidden;
  border: 1px solid #dce6ef;
  border-radius: 12px;
  background: #f6f9fc;
  box-shadow: 0 7px 22px rgba(16, 55, 95, 0.07);
}

.app-list-item__list {
  padding: 5px;
  background: #f6f9fc;
}

.app-list-item :deep(.q-item) {
  min-height: 72px;
  margin: 3px 0;
  padding: 9px 13px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: #ffffff;
  color: #284863;
}

.app-list-item :deep(.q-item__label) {
  color: #193c5c;
  font-size: 13px;
  font-weight: 700;
}

.app-list-item :deep(.q-item__label--caption) {
  margin-top: 3px;
  color: #748ba1;
  font-size: 12px;
  font-weight: 400;
}

.app-list-item :deep(.q-item__section--avatar) {
  min-width: 50px;
}

.app-list-item :deep(.q-avatar) {
  border: 2px solid #e7f1f9;
  box-shadow: 0 2px 7px rgba(28, 83, 126, 0.1);
}

.app-list-item__row {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.app-list-item__row:hover {
  z-index: 1;
  border-color: #bcdcf7;
  background: linear-gradient(90deg, #f2f9ff 0%, #ffffff 42%);
  box-shadow: 0 4px 13px rgba(21, 92, 149, 0.1);
  transform: translateX(2px);
}

.app-list-item__actions {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
  padding-left: 14px;
}

.app-list-item__action {
  width: 32px;
  height: 32px;
}

.app-list-item__action--edit {
  background: #edf6ff;
}

.app-list-item__action--delete {
  background: #fff0f1;
}

.app-list-item__action:hover {
  filter: brightness(0.96);
}

.app-list-item__empty {
  color: #8a9bad;
  font-size: 13px;
}

.app-list-item__loading {
  background: #f6f9fc;
}
</style>
