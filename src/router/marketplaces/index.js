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
    },
    {
      path: '/custody',
      name: 'custodian',
      component: () => import('pages/marketplace/custodian/index.vue'),
      meta: {
        breadcrumb: [
          { name: 'Custodian', icon: 'shield' }
        ],
        app: 'marketplaces'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('pages/marketplace/privacy/Index.vue'),
      meta: {
        breadcrumb: [
          { name: 'Privacy', icon: 'home' }
        ],
        app: 'marketplaces'
      }
    },
    {
      path: '/NFTs',
      name: 'NFTs',
      component: () => import('pages/marketplace/NFTs/Index.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTs Collections', icon: 'article' }
        ],
        app: 'marketplaces'
      }
    },
    {
      path: '/NFTs/details',
      name: 'NTFDetails',
      props: true,
      component: () => import('pages/marketplace/NFTs/DetailsUniquesPage.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTs Collections', icon: 'article', to: { name: 'NFTs' } },
          { name: 'Detail', icon: 'info' }
        ],
        app: 'marketplaces'
      }
    },
    {
      path: '/NFTs/create',
      name: 'NFTCreate',
      props: true,
      component: () => import('pages/marketplace/NFTs/CreateUniquesPage.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTs Collections', icon: 'article', to: { name: 'NFTs' } },
          { name: 'Create', icon: 'create' }
        ],
        app: 'marketplaces'
      }
    }
  ]
}

export default routes
