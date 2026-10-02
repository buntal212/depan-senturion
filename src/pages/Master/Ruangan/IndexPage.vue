<template>
  <q-page class="ruangan-page">
    <AppFilterHeder v-model="filters" @filter="getRoomsByFilter">
      <template #actions>
        <AppAddButton label="Tambah Ruangan" @click="openCreateDialog" />
      </template>
    </AppFilterHeder>

    <AppListItem
      class="ruangan-page__list"
      :items="rooms"
      :loading="loading"
      :has-more="hasMore"
      :per-page="perPage"
      :avatar-field="getRoomAvatar"
      :show-avatar="true"
      :show-edit="true"
      :show-delete="true"
      no-data-label="Data ruangan tidak ditemukan."
      @load="loadMoreRooms"
    >
      <template #item="{ item }">
        <q-item-label>{{ item.nama }}</q-item-label>
        <q-item-label caption>{{ item.deskripsi }}</q-item-label>
        <div class="ruangan-page__room-info">
          <span><q-icon name="tag" /> {{ item.kode }}</span>
          <span><q-icon name="layers" /> Lantai {{ item.lantai }}</span>
          <span><q-icon name="bed" /> {{ item.kapasitas }} bed</span>
          <span><q-icon name="event" /> {{ item.createdAt }}</span>
        </div>
      </template>

      <template #side="{ item }">
        <q-badge
          :color="item.aktif ? 'positive' : 'grey-6'"
          rounded
          class="ruangan-page__status"
          :class="{ 'ruangan-page__status--inactive': !item.aktif }"
        >
          {{ item.aktif ? 'Aktif' : 'Tidak aktif' }}
        </q-badge>
      </template>
    </AppListItem>

    <AppDialog
      v-model="createDialogOpen"
      title="Tambah Ruangan"
      subtitle="Lengkapi informasi ruangan yang akan ditambahkan."
      icon="meeting_room"
      :max-width="620"
    >
      <div class="ruangan-page__form">
        <div class="ruangan-page__form-title">Informasi ruangan</div>

        <q-input v-model="roomForm.nama" outlined dense stack-label label="Nama ruangan" />

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="roomForm.kode" outlined dense stack-label label="Kode ruangan" />
          </div>

          <div class="col-12 col-sm-6">
            <q-input
              v-model.number="roomForm.kapasitas"
              outlined
              dense
              stack-label
              type="number"
              min="1"
              label="Kapasitas bed"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="roomForm.lantai" outlined dense stack-label label="Lantai" />
          </div>

          <div class="col-12 col-sm-6">
            <q-select
              v-model="roomForm.jenisKelamin"
              outlined
              dense
              stack-label
              emit-value
              map-options
              label="Jenis kelamin pasien"
              :options="genderOptions"
            />
          </div>
        </div>

        <q-input
          v-model="roomForm.deskripsi"
          outlined
          dense
          stack-label
          type="textarea"
          autogrow
          label="Deskripsi"
        />
      </div>

      <template #actions="{ close }">
        <q-btn flat no-caps color="grey-7" label="Batal" @click="close" />
        <q-btn
          unelevated
          no-caps
          color="primary"
          icon="save"
          label="Simpan"
          :loading="savingRoom"
          @click="saveRoom"
        />
      </template>
    </AppDialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import AppAddButton from '@/components/button/AppAddButton.vue'
import AppDialog from '@/components/dialog/AppDialog.vue'
import AppFilterHeder from '@/components/heder/AppFilterHeder.vue'
import AppListItem from '@/components/list/AppListItem.vue'
import avatarPria from '@/assets/avatars/avatar-pria.png'
import avatarWanita from '@/assets/avatars/avatar-wanita.png'
import { useRuanganStore } from '@/stores/ruangan'

defineOptions({
  name: 'MasterRuanganIndexPage',
})

const filters = ref({
  search: '',
  dateFrom: '',
  dateTo: '',
})

const $q = useQuasar()
const createDialogOpen = ref(false)
const savingRoom = ref(false)
const roomForm = ref(createEmptyRoomForm())
const genderOptions = [
  { label: 'Perempuan', value: 'P' },
  { label: 'Laki-laki', value: 'L' },
]

const ruanganStore = useRuanganStore()
const { rooms, loading, hasMore, perPage } = storeToRefs(ruanganStore)

function getRoomsByFilter(nextFilters) {
  ruanganStore.setFilters(nextFilters)
}

function getRoomAvatar(room) {
  return room.jenisKelamin === 'L' ? avatarPria : avatarWanita
}

function createEmptyRoomForm() {
  return {
    nama: '',
    kode: '',
    deskripsi: '',
    lantai: '',
    kapasitas: 1,
    jenisKelamin: 'P',
  }
}

function openCreateDialog() {
  roomForm.value = createEmptyRoomForm()
  createDialogOpen.value = true
}

async function saveRoom() {
  savingRoom.value = true

  try {
    await ruanganStore.addRoom({
      ...roomForm.value,
      createdAt: new Date().toISOString().slice(0, 10),
    })

    createDialogOpen.value = false
    $q.notify({
      type: 'positive',
      message: 'Ruangan berhasil ditambahkan.',
    })
  } finally {
    savingRoom.value = false
  }
}

async function loadMoreRooms({ perPage: pageSize, done }) {
  await ruanganStore.getRooms({ perPage: pageSize })
  done()
}

onMounted(() => {
  ruanganStore.getRooms({ reset: true })
})
</script>

<style scoped>
.ruangan-page {
  min-height: 100%;
  padding: 20px;
  background: #f1f3f5;
}

.ruangan-page__list {
  margin-top: 16px;
}

.ruangan-page__room-info {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 8px;
  margin-top: 7px;
}

.ruangan-page__room-info span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border: 1px solid #e3edf5;
  border-radius: 5px;
  color: #668199;
  background: #f7fafc;
  font-size: 11px;
  line-height: 1.25;
}

.ruangan-page__room-info :deep(.q-icon) {
  color: #2377bb;
  font-size: 13px;
}

.ruangan-page__status {
  min-height: 20px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1px;
}

.ruangan-page__status--inactive {
  color: #ffffff;
  background: #8a96a2 !important;
}

.ruangan-page__form {
  display: grid;
  gap: 16px;
}

.ruangan-page__form-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #e8eef4;
  color: #315777;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1px;
  text-transform: uppercase;
}

.ruangan-page__form :deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}

.ruangan-page__form :deep(.q-field__label) {
  color: #587188;
  font-size: 11px;
}

.ruangan-page__form :deep(.q-field__native) {
  color: #284863;
  font-size: 13px;
}
</style>
