import MarketPlacesRoutes from './marketplaces'
import NvbRoutes from './nbv'
import HashedRoutes from './hashed'

const routes = [
  {
    // Login
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    // COINSTR
    name: 'coinstr',
    path: '/coinstr',
    component: () => import('layouts/CoinstrLayout.vue'),
    meta: {
      app: 'coinstr'
    },
    children: [
      {
        name: 'coinstrPolicies',
        path: '',
        component: () => import('pages/coinstr/PoliciesScreen.vue'),
        meta: {
          app: 'coinstr'
        }
      }
    ]
  },
  {
    // Portal Layout
    path: '/',
    component: () => import('layouts/PortalLayout.vue'),
    name: 'root',
    children: [
      NvbRoutes,
      MarketPlacesRoutes,
      HashedRoutes,
      // Hashed Confidential Documents
      {
        path: '/hcd',
        name: 'root_hcd',
        component: () => import('layouts/ConfidentialDocsLayout'),
        children: [
          {
            path: '',
            name: 'hcd',
            component: () => import('pages/hcd/index.vue'),
            meta: {
              breadcrumb: [
                { name: 'confidentialDocuments', icon: 'storage' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/afloat-library/create-asset',
            name: 'create-asset',
            component: () => import('pages/marketplace/afloat-example/create-asset-index.vue'),
            meta: {
              breadcrumb: [
                { name: 'createAsset', icon: 'home' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/afloat-library/get-all-assets',
            name: 'get-all-assets',
            component: () => import('pages/marketplace/afloat-example/get-asset-index.vue'),
            meta: {
              breadcrumb: [
                { name: 'getAllAssets', icon: 'home' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/Collections',
            name: 'collections',
            component: () => import('pages/marketplace/Collections/CollectionScreen.vue'),
            meta: {
              breadcrumb: [
                { name: 'NFTCollections', icon: 'library_books' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/Collections/details',
            name: 'collectionDetails',
            props: true,
            component: () => import('pages/marketplace/Collections/DetailsCollectionPage.vue'),
            meta: {
              breadcrumb: [
                { name: 'NFTCollections', icon: 'library_books', to: { name: 'collections' } },
                { name: 'detail', icon: 'info' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/NFT/details',
            name: 'NFTDetails',
            props: true,
            component: () => import('pages/marketplace/NFTs/DetailsNFTPage.vue'),
            meta: {
              breadcrumb: [
                { name: 'NFTCollections', icon: 'library_books', to: { name: 'collections' } },
                { name: 'detail', icon: 'info' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/Collections/create',
            name: 'collectionCreate',
            props: true,
            component: () => import('pages/marketplace/Collections/CreateCollectionPage.vue'),
            meta: {
              breadcrumb: [
                { name: 'NFTCollections', icon: 'article', to: { name: 'collections' } },
                { name: 'create', icon: 'create' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/NFT/create',
            name: 'NFTCreate',
            props: true,
            component: () => import('pages/marketplace/NFTs/CreateTaxCreditPage.vue'),
            meta: {
              breadcrumb: [
                { name: 'NFTCollections', icon: 'article', to: { name: 'collections' } },
                { name: 'create', icon: 'create' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '',
            name: 'marketplacesList',
            component: () => import('pages/marketplace/index.vue'),
            meta: {
              breadcrumb: [
                { name: 'marketplaces', icon: 'storefront' }
              ],
              app: 'hcd'
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
              app: 'hcd'
            }
          },
          {
            path: '/afloat/TaxCredit',
            name: 'afloat',
            component: () => import('pages/marketplace/afloat-example/TaxCreditsCollections.vue'),
            meta: {
              breadcrumb: [
                { name: 'taxCredits', icon: 'library_books' },
                { name: 'detail', icon: 'info' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/afloat/TaxCredit/details',
            name: 'taxCreditDetails',
            props: true,
            component: () => import('pages/marketplace/afloat-example/TaxCreditScreen.vue'),
            meta: {
              breadcrumb: [
                { name: 'taxCredits', icon: 'library_books', to: { name: 'afloat' } },
                { name: 'detail', icon: 'info' }
              ],
              app: 'hcd'
            }
          },
          {
            path: '/afloat/create',
            name: 'createTaxCredit',
            props: true,
            component: () => import('pages/marketplace/NFTs/CreateTaxCreditPage.vue'),
            meta: {
              breadcrumb: [
                { name: 'taxCredits', icon: 'article', to: { name: 'afloat' } },
                { name: 'create', icon: 'create' }
              ],
              app: 'hcd'
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
              app: 'hcd'
            }
          }
        ]
      },
      // Sign Test
      {
        path: '/signTest',
        name: 'signTest',
        component: () => import('pages/signTest.vue'),
        meta: {
          app: 'sign'
        }
      },
      // General not accounts page
      {
        path: 'not-accounts',
        name: 'notAccounts',
        component: () => import('pages/NotAccounts.vue'),
        meta: {
          breadcrumb: [
            { name: 'Vaults', icon: 'storage', to: { name: 'manageVaults' } },
            { name: 'Details', icon: 'summarize' }
          ]
        }
      }
    ]
  },
  {
    path: '/participants',
    component: () => import('pages/hashed/ParticipantsScreen.vue'),
    name: 'participantsRewards'
  },
  // {
  //   path: '/examples',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: 'polkadot',
  //       name: 'polkadot-example',
  //       component: () => import('components/template/polkadot-example.vue'),
  //       meta: {
  //         breadcrumb: [
  //           { name: 'Examples', icon: 'home' }
  //         ]
  //       }
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
