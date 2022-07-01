
const routes = [
  {
    // Portal Layout
    path: '/',
    component: () => import('layouts/PortalLayout.vue'),
    name: 'root',
    children: [
      // Native Bitcoin Vault layout and routes
      {
        path: 'nbv',
        name: 'nbv',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          // Vaults
          {
            path: '',
            name: 'manageVaults',
            component: () => import('src/pages/nbv/vaults/manage-vaults.vue'),
            meta: {
              breadcrumb: [
                { name: 'Vaults', icon: 'storage' }
              ],
              app: 'nbv'
            }
          },
          // XPubs
          {
            path: 'xpub',
            name: 'manageXpub',
            component: () => import('pages/nbv/xpub/manage-xpub.vue'),
            meta: {
              breadcrumb: [
                { name: 'XPUB', icon: 'key' }
              ],
              app: 'nbv'
            }
          },
          // Vault details
          {
            path: 'vaults/details',
            name: 'vaultDetails',
            props: true,
            component: () => import('pages/nbv/vaults/vault-details.vue'),
            meta: {
              breadcrumb: [
                { name: 'Vaults', icon: 'storage', to: { name: 'manageVaults' } },
                { name: 'Details', icon: 'summarize' }
              ],
              app: 'nbv'
            }
          },
          // Proposals Details
          {
            path: 'proposal',
            name: 'proposalDetails',
            props: true,
            component: () => import('src/pages/nbv/proposals/proposal-details.vue'),
            meta: {
              breadcrumb: [
                { name: 'Vaults', icon: 'storage', to: { name: 'manageVaults' } },
                { name: 'Details', icon: 'summarize', back: true },
                { name: 'Proposal', icon: 'history_edu' }
              ],
              app: 'nbv'
            }
          }
        ]
      },
      // Marketplaces
      {
        path: 'marketplaces',
        name: 'marketplaceRoot',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: 'home',
            name: 'marketplaceHome',
            component: () => import('pages/Error404.vue'),
            meta: {
              breadcrumb: [
                { name: 'Home', icon: 'home' }
              ],
              app: 'marketplaces'
            }
          }
        ]
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
