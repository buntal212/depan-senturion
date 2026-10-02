<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    :maximized="maximized"
    :position="position"
    @update:model-value="emit('update:modelValue', $event)"
    @hide="emit('hide')"
  >
    <q-card class="app-dialog" :style="dialogStyle">
      <q-card-section class="app-dialog__header">
        <slot name="header" :close="close">
          <div v-if="icon" class="app-dialog__icon">
            <q-icon :name="icon" :color="color" size="22px" />
          </div>

          <div class="app-dialog__heading">
            <div class="app-dialog__title">{{ title }}</div>
            <div v-if="subtitle" class="app-dialog__subtitle">{{ subtitle }}</div>
          </div>

          <q-space />

          <q-btn
            v-if="showClose"
            flat
            round
            dense
            icon="close"
            aria-label="Tutup dialog"
            class="app-dialog__close"
            @click="close"
          />
        </slot>
      </q-card-section>

      <q-separator />

      <q-card-section class="app-dialog__content">
        <slot :close="close" />
      </q-card-section>

      <q-card-actions v-if="$slots.actions" align="right" class="app-dialog__actions">
        <slot name="actions" :close="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'AppDialog',
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: 'Dialog',
  },

  subtitle: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },

  color: {
    type: String,
    default: 'primary',
  },

  maxWidth: {
    type: [String, Number],
    default: 640,
  },

  position: {
    type: String,
    default: 'standard',
  },

  persistent: {
    type: Boolean,
    default: false,
  },

  maximized: {
    type: Boolean,
    default: false,
  },

  showClose: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'hide'])

const dialogStyle = computed(() => ({
  width: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
}))

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.app-dialog {
  position: relative;
  max-width: calc(100vw - 32px);
  overflow: hidden;
  border: 1px solid #d9e4ee;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(16, 55, 95, 0.2);
}

.app-dialog::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #07549c 0%, #168cff 68%, #f2c230 100%);
}

.app-dialog__header {
  min-height: 76px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px 20px;
  background: linear-gradient(105deg, #ffffff 0%, #f4f9fd 100%);
}

.app-dialog__icon {
  width: 38px;
  height: 38px;
  display: grid;
  flex: 0 0 38px;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(145deg, #eaf5ff, #dceefa);
  box-shadow: inset 0 0 0 1px rgba(22, 115, 200, 0.1);
}

.app-dialog__heading {
  min-width: 0;
}

.app-dialog__title {
  color: #173c60;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
}

.app-dialog__subtitle {
  margin-top: 4px;
  color: #8293a4;
  font-size: 12px;
  line-height: 1.45;
}

.app-dialog__close {
  color: #6e8499;
  border-radius: 8px;
}

.app-dialog__close:hover {
  background: #edf4fa;
}

.app-dialog__content {
  padding: 20px;
  background: #ffffff;
}

.app-dialog__actions {
  min-height: 64px;
  padding: 12px 20px;
  border-top: 1px solid #e8eef4;
  background: #f8fafc;
}

.app-dialog__actions :deep(.q-btn) {
  min-height: 38px;
  padding: 0 15px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 600px) {
  .app-dialog {
    max-width: calc(100vw - 20px);
  }

  .app-dialog__header,
  .app-dialog__content,
  .app-dialog__actions {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
