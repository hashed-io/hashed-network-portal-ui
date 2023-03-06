const routes = {
  path: 'hashed',
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
    }
  ]
}

export default routes
