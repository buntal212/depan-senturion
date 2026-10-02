const routes = [
  {
    path: '/master',
    component: () => import('@/layouts/MasterLayout.vue'),
    children: [
      {
        path: '',
        name: 'master',
        component: () => import('@/pages/Master/IndexPage.vue'),
      },
      {
        path: 'ruangan',
        name: 'master-ruangan',
        component: () => import('@/pages/Master/Ruangan/IndexPage.vue'),
      },
    ],
  },
]

export default routes
