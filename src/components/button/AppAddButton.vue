<template>
  <q-btn
    class="app-add-button"
    :class="{ 'app-add-button--full-width': fullWidth }"
    unelevated
    no-caps
    :color="color"
    :icon="icon"
    :label="label"
    :loading="loading"
    :disable="disable"
    :outline="outline"
    @click="emit('click', $event)"
  />
</template>

<script setup>
defineOptions({
  name: 'AppAddButton',
})

defineProps({
  label: {
    type: String,
    default: 'Tambah Data',
  },

  icon: {
    type: String,
    default: 'add',
  },

  color: {
    type: String,
    default: 'primary',
  },

  loading: {
    type: Boolean,
    default: false,
  },

  disable: {
    type: Boolean,
    default: false,
  },

  outline: {
    type: Boolean,
    default: false,
  },

  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.app-add-button {
  min-height: 42px;
  padding: 0 17px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  box-shadow: 0 5px 12px rgba(15, 111, 196, 0.2);
}

.app-add-button--full-width {
  width: 100%;
}
</style>
