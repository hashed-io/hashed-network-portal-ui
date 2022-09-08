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
          { name: 'marketplaces', icon: 'storefront' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/marketplaces/details',
      name: 'marketplace-details',
      props: true,
      component: () => import('pages/marketplace/details-market.vue'),
      meta: {
        breadcrumb: [
          { name: 'marketplaces', icon: 'storefront', to: { name: 'marketplacesList' } },
          { name: 'detail', icon: 'info' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/custody',
      name: 'custodian',
      component: () => import('pages/marketplace/custodian/index.vue'),
      meta: {
        breadcrumb: [
          { name: 'custodian', icon: 'shield' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('pages/marketplace/privacy/Index.vue'),
      meta: {
        breadcrumb: [
          { name: 'privacy', icon: 'home' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/NFTs',
      name: 'NFTs',
      component: () => import('pages/marketplace/NFTs/Index.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTCollections', icon: 'article' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/NFTs/details',
      name: 'NTFDetails',
      props: true,
      component: () => import('pages/marketplace/NFTs/DetailsUniquesPage.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTCollections', icon: 'article', to: { name: 'NFTs' } },
          { name: 'detail', icon: 'info' }
        ],
        app: 'marketplace'
      }
    },
    {
      path: '/NFTs/create',
      name: 'NFTCreate',
      props: true,
      component: () => import('pages/marketplace/NFTs/CreateUniquesPage.vue'),
      meta: {
        breadcrumb: [
          { name: 'NFTCollections', icon: 'article', to: { name: 'NFTs' } },
          { name: 'create', icon: 'create' }
        ],
        app: 'marketplace'
      }
    }
  ]
}

export default routes
