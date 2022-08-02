const routes = {
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
          { name: 'My Vaults', icon: 'storage' }
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
          { name: 'Extended Keys', icon: 'key' }
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
          { name: 'My Vaults', icon: 'storage', to: { name: 'manageVaults' } },
          { name: 'Vault Details', icon: 'summarize' }
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
          { name: 'My Vaults', icon: 'storage', to: { name: 'manageVaults' } },
          { name: 'Vault Details', icon: 'summarize', back: true },
          { name: 'Proposal Details', icon: 'history_edu' }
        ],
        app: 'nbv'
      }
    }
  ]
}

export default routes