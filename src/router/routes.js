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
            path: '/afloat-library',
            name: 'afloat',
            component: () => import('pages/marketplace/afloat-example/index.vue'),
            meta: {
              breadcrumb: [
                { name: 'afloat', icon: 'home' }
              ],
              app: 'marketplace'
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
