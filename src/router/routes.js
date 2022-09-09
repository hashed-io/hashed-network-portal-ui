import MarketPlacesRoutes from './marketplaces'
import NvbRoutes from './nbv'

const routes = [
  {
    // Login
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    // Portal Layout
    path: '/',
    component: () => import('layouts/PortalLayout.vue'),
    name: 'root',
    children: [
      NvbRoutes,
      MarketPlacesRoutes,
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
