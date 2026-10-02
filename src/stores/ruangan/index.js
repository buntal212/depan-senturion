import { defineStore } from 'pinia'

const DEFAULT_PER_PAGE = 12

const dummyRooms = Array.from({ length: 27 }, (_, index) => {
  const number = index + 1
  const roomNames = ['Mawar', 'Melati', 'Anggrek', 'Flamboyan', 'Teratai', 'Kenanga']
  const roomName = roomNames[index % roomNames.length]

  return {
    id: number,
    nama: `Ruang ${roomName} ${String(number).padStart(2, '0')}`,
    deskripsi:
      index % 3 === 0 ? 'Ruang perawatan intensif' : `Rawat inap lantai ${(index % 3) + 1}`,
    kode: `RG-${String(number).padStart(3, '0')}`,
    lantai: String((index % 3) + 1),
    kapasitas: (index % 4) + 1,
    jenisKelamin: index % 2 === 0 ? 'P' : 'L',
    icon: 'meeting_room',
    aktif: index % 5 !== 0,
    createdAt: `2026-09-${String((index % 28) + 1).padStart(2, '0')}`,
  }
})

export const useRuanganStore = defineStore('ruangan', {
  state: () => ({
    rooms: [],
    loading: false,
    hasMore: false,
    currentPage: 0,
    perPage: DEFAULT_PER_PAGE,
    filters: {
      search: '',
      dateFrom: '',
      dateTo: '',
    },
  }),

  actions: {
    async getRooms({ reset = false, perPage = this.perPage } = {}) {
      if (this.loading || (!reset && !this.hasMore && this.currentPage > 0)) {
        return
      }

      this.loading = true

      try {
        const nextPage = reset ? 1 : this.currentPage + 1
        const search = this.filters.search.trim().toLowerCase()
        const filteredRooms = dummyRooms.filter((room) => {
          const matchSearch =
            !search || `${room.nama} ${room.deskripsi} ${room.kode}`.toLowerCase().includes(search)
          const matchFrom = !this.filters.dateFrom || room.createdAt >= this.filters.dateFrom
          const matchTo = !this.filters.dateTo || room.createdAt <= this.filters.dateTo

          return matchSearch && matchFrom && matchTo
        })
        const start = (nextPage - 1) * perPage
        const pageItems = filteredRooms.slice(start, start + perPage)

        this.rooms = reset ? pageItems : [...this.rooms, ...pageItems]
        this.currentPage = nextPage
        this.perPage = perPage
        this.hasMore = start + pageItems.length < filteredRooms.length

        /*
         * Saat endpoint tersedia, ganti blok dummy di atas dengan API simple paginate:
         * const response = await api.get('/endpoint-ruangan', {
         *   params: { page: nextPage, per_page: perPage, ...this.filters },
         * })
         * const result = response.data
         * this.rooms = reset ? result.data : [...this.rooms, ...result.data]
         * this.currentPage = result.current_page
         * this.hasMore = Boolean(result.next_page_url)
         */
      } finally {
        this.loading = false
      }
    },

    async setFilters(filters) {
      this.filters = {
        ...this.filters,
        ...filters,
      }

      await this.getRooms({ reset: true })
    },

    async addRoom(room) {
      const nextId = Math.max(...dummyRooms.map((item) => item.id), 0) + 1

      dummyRooms.unshift({
        id: nextId,
        icon: 'meeting_room',
        aktif: true,
        ...room,
      })

      await this.getRooms({ reset: true })
    },
  },
})
