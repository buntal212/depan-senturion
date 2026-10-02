import { defineStore } from 'pinia'

export const useMasterStore = defineStore('master', {
  state: () => ({
    moduleName: 'Master',
    title: 'Data Master',
    description: 'Kelola data dasar yang digunakan oleh seluruh layanan SENTURION.',
    homeMenu: { id: 'beranda', nama: 'Beranda', icon: 'home', route: '/' },
    menuItems: [],
    loadingMenu: false,
  }),

  actions: {
    async getMenuItems() {
      this.loadingMenu = true

      try {
        /*
         * Data dummy sementara.
         * Nanti ganti dengan request API menu sesuai hak akses user.
         */
        this.menuItems = [
          {
            id: 'ruangan',
            nama: 'Ruangan',
            icon: 'meeting_room',
            route: '/master/ruangan',
          },
          {
            id: 'service-item',
            nama: 'Service Item',
            icon: 'medical_services',
          },
          {
            id: 'payer-guarantor',
            nama: 'Payer / Guarantor',
            icon: 'business',
          },
          {
            id: 'tariff-price-list',
            nama: 'Tariff / Price List',
            icon: 'sell',
          },
          {
            id: 'tariff-mapping-payer',
            nama: 'Tariff Mapping per Payer',
            icon: 'account_tree',
          },
          {
            id: 'other-revenue-item-tariff',
            nama: 'Other Revenue Item / Tariff',
            icon: 'receipt_long',
          },
          {
            id: 'discount-package',
            nama: 'Discount & Package',
            icon: 'local_offer',
          },
          {
            id: 'billing-parameter',
            nama: 'Billing Parameter',
            icon: 'tune',
          },
        ]
      } finally {
        this.loadingMenu = false
      }
    },
  },
})
