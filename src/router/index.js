import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? undefined : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const app = to.meta.app
    if (to.name === 'participantsRewards' || app === 'coinstr') {
      next()
      return
    }
    if (to.name === 'hashed') {
      next({ name: 'wallet' })
      return
    }
    const isAuthenticated = store.getters['profile/isLogged']

    if (!isAuthenticated && to.name !== 'login') {
      next({
        name: 'login',
        query: {
          returnUrl: to.name,
          returnQuery: JSON.stringify(to.query)
        }
      })
      return
    }
    if (to.name === 'root' || to.name === 'home') {
      next({ name: 'manageVaults' })
    } else {
      // Validation by Apps
      const loginType = store.getters['profile/loginType']

      if (app === 'nbv' && store.getters['profile/xpub'] === undefined) {
        store.dispatch('profile/getXpub')
        // next()
      }

      if (app === 'hcd' && loginType === 'polkadotjs') {
        next({ name: 'nbv' })
      // } else if ((app === 'nbv' || app === 'marketplaces') && loginType === 'hcd') {
      } else if ((app === 'marketplaces') && loginType === 'hcd') {
        next({ name: 'hcd' })
      } else next()
    }
  })

  return Router
})
