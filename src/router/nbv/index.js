const routes = {
  path: 'nbv',
  name: 'nbv',
  // component: () => import('layouts/MainLayout.vue'),
  component: () => import('layouts/ConfidentialDocsLayout'),
  children: [
    // Vaults
    {
      path: '/vaults',
      name: 'manageVaults',
      component: () => import('src/pages/nbv/vaults/manage-vaults.vue'),
      meta: {
        breadcrumb: [
          { name: 'myVaults', icon: 'storage' }
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
          { name: 'extendedKeys', icon: 'key' }
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
          { name: 'myVaults', icon: 'storage', to: { name: 'manageVaults' } },
          { name: 'vaultDetails', icon: 'summarize' }
        ],
        app: 'nbv'
      }
    },
    {
      path: 'vaults/proof_of_reserves',
      name: 'vaultProofOfReserves',
      props: true,
      component: () => import('pages/nbv/vaults/vault-proof-of-reserves.vue'),
      meta: {
        breadcrumb: [
          { name: 'myVaults', icon: 'storage', to: { name: 'manageVaults' } },
          { name: 'proofOfReserves', icon: 'summarize' }
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
          { name: 'myVaults', icon: 'storage', to: { name: 'manageVaults' } },
          { name: 'vaultDetails', icon: 'summarize', back: true },
          { name: 'proposalDetails', icon: 'history_edu' }
        ],
        app: 'nbv'
      }
    }
  ]
}

export default routes
