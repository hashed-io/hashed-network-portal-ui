const routes = {
  path: 'marketplaces',
  name: 'marketplaceRoot',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'marketplacesList',
      component: () => import('pages/marketplace/index.vue'),
      meta: {
        breadcrumb: [
          { name: 'Marketplaces', icon: 'storefront' }
        ],
        app: 'marketplaces'
      }
    },
    {
      path: '/marketplaces/details',
      name: 'marketplace-details',
      props: true,
      component: () => import('pages/marketplace/details-market.vue'),
      meta: {
        breadcrumb: [
          { name: 'Marketplaces', icon: 'storefront', to: { name: 'marketplacesList' } },
          { name: 'Detail', icon: 'info' }
        ],
        app: 'marketplaces'
      }
    }
  ]
}

export default routes
