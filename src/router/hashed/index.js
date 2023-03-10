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
      path: '/members',
      component: () => import('pages/hashed/ParticipantsScreen.vue'),
      name: 'members',
      meta: {
        breadcrumb: [
          { name: 'members', icon: 'people' }
        ],
        app: 'hashed'
      }
    }
  ]
}

export default routes
