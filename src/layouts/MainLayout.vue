<template lang="pug">
#container.full-height
  q-layout.containerLayout(view="lHh lpR lFf" container)
    q-header
      q-toolbar
        q-btn.lt-lg(flat @click="toggleDrawer" round dense icon="menu")
        .row.q-gutter-x-sm.q-ml-md
          q-item.routerItems(
            v-for="option in pageOptions"
            clickable
            :to="option.to"
            :class="{ 'activeRouter': isActive(option.keyActive)}"
            dense
          )
            q-item-section.q-pa-sm
              q-item-label {{ $t(option.label) }}
        q-space
        q-btn.q-mr-md(flat padding="0px 0px 0px 0px" no-caps text-color="white")
          selected-account-btn(:selectedAccount="selectedAccount")
          //- accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
        q-btn(:label="$t('login.logout')" no-caps @click="logout")
        //- q-toolbar-title.q-ml-md Hashed Template App
        //- div Quasar v{{ $q.version }}
      q-toolbar(class="bg-white text-primary")
        q-breadcrumbs(active-color="primary" style="font-size: 16px")
          q-breadcrumbs-el.q-ml-md(v-for="(breadcrumb, index) in breadcrumbList" :label="$t(`pages.${app}.breadcrumbs.${breadcrumb.name}`)" :icon="breadcrumb.icon" tag="div" :to="breadcrumb.to"  :class="{ 'hasLink': (!!breadcrumb.to || breadcrumb.back), }" @click="handlerBreadcrumb(index)")

    q-page-container
      .row.justify-center
        .col-10
          .q-px-lg.q-pa-lg
            not-connected(v-if="!isConnectedToServer")
            not-accounts(v-else-if="!selectedAccount")
            router-view(v-else)
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import NotAccounts from '~/pages/NotAccounts.vue'
import NotConnected from '~/pages/NotConnected.vue'
// import { useI18n } from 'vue-i18n'
// import { TreasuryApi } from '~/services/polkadot-pallets'
export default defineComponent({
  name: 'MainLayout',

  components: {
    AccountsMenu,
    SelectedAccountBtn,
    NotAccounts,
    NotConnected
  },

  setup () {
    const { showNotification } = useNotifications()
    const $store = useStore()
    const $route = useRoute()
    const $router = useRouter()
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
    const availableAccounts = computed(() => $store.getters['polkadotWallet/availableAccounts'])
    const isConnectedToServer = computed(() => $store.$connectedToServer)
    // const { t } = useI18n()

    // Dynamic options for each app
    const pageOptionsDictionary = {
      nbv: [
        {
          to: { name: 'manageVaults' },
          keyActive: 'My Vaults',
          label: 'pages.nbv.mainOptions.myVaults'
        },
        {
          to: { name: 'manageXpub' },
          keyActive: 'Extended Keys',
          label: 'pages.nbv.mainOptions.extendedKeys'
        }
      ],
      marketplace: [
        {
          to: { name: 'marketplacesList' },
          keyActive: 'Marketplaces',
          label: 'pages.marketplace.mainOptions.marketplaces'
        },
        {
          to: { name: 'custodian' },
          keyActive: 'Custodian',
          label: 'pages.marketplace.mainOptions.custodian'
        },
        {
          to: { name: 'privacy' },
          keyActive: 'Privacy',
          label: 'pages.marketplace.mainOptions.privacy'
        },
        {
          to: { name: 'NFTs' },
          keyActive: 'NFTCollections',
          label: 'pages.marketplace.mainOptions.nftCollections'
        }
      ]
    }

    const app = ref(undefined)
    const breadcrumbList = ref(undefined)
    const pageOptions = ref([])
    watchEffect(() => updateBreadcrumbs($route))

    onMounted(async () => {
      try {
        // await connectPolkadot()
        // requestUsers()
      } catch (e) {
        console.error(e)
        showNotification({ color: 'red', message: e.message || e })
      }
    })

    function logout () {
      $store.dispatch('polkadotWallet/hashedLogout')
    }

    function onSelectAccount (account) {
      $store.commit('polkadotWallet/setSelectedAccount', account)
    }

    function updateBreadcrumbs (v) {
      // Dynamic breadcrumb
      breadcrumbList.value = v.meta.breadcrumb
      // Dynamic options
      if (v.meta.app) {
        app.value = v.meta.app
        console.log('v.meta.app', v.meta.app)
        pageOptions.value = pageOptionsDictionary[v.meta.app]
      }
    }

    function isActive (module) {
      if (module && breadcrumbList.value.length > 0) {
        const fund = breadcrumbList.value.find(v => v.name.toLowerCase() === module.toLowerCase())
        return !!fund
      }
      return false
    }

    function handlerBreadcrumb (index) {
      // console.log('handlerBreadcrumb', breadcrumb, index)
      const breadUpdated = $route.meta.breadcrumb[index]
      if (breadUpdated.back) {
        $router.back()
      } else if (breadUpdated.to) {
        $router.push(breadUpdated.to)
      }
    }

    function toggleDrawer () {
      const currentState = localStorage.getItem('hashed-leftDrawer') || true
      const newState = currentState !== 'true'
      localStorage.setItem('hashed-leftDrawer', newState)
      window.dispatchEvent(new CustomEvent('hashed-leftDrawer', {
        detail: {
          status: newState
        }
      }))
    }

    return {
      availableAccounts,
      onSelectAccount,
      selectedAccount,
      breadcrumbList,
      isActive,
      handlerBreadcrumb,
      isConnectedToServer,
      pageOptions,
      toggleDrawer,
      logout,
      app
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'

.routerItems
  border-radius: 5px
  color: white

.routerItems:hover
  background-color: $secondary
  color: white

.activeRouter
  color: $primary
  background-color: white

.hasLink
  color: $primary
  text-decoration: underline
  cursor: pointer

.containerLayout
 height: 100vh

@media (max-width: $breakpoint-md-min)
  .routerItems
    padding: 0px
    font-size: 12px
</style>
