const routes = {
  path: '',
  name: 'hashed',
  // component: () => import('layouts/MainLayout.vue'),
  component: () => import('layouts/ConfidentialDocsLayout'),
  children: [
    // Proposals Details
    {
      path: 'wallet',
      name: 'wallet',
      props: true,
      component: () => import('src/pages/hashed/WalletScreen.vue'),
      meta: {
        breadcrumb: [
          { name: 'wallet', icon: 'account_balance_wallet' }
        ],
        app: 'hashed'
      }
    },
    {
      path: '/vesting',
      component: () => import('pages/hashed/ParticipantsScreen.vue'),
      name: 'vesting',
      meta: {
        breadcrumb: [
          { name: 'vesting', icon: 'account_balance_wallet' }
        ],
        app: 'hashed'
      }
    }
  ]
}

export default routes
