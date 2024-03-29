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
              q-item-label {{ option.label }}
        q-space
        q-btn.q-mr-md(v-if="loginType === 'polkadotjs'" flat padding="0px 0px 0px 0px" no-caps text-color="white")
            selected-account-btn(v-bind="polkadotUserInfo")
        //- .text-caption Hola
        q-btn.no-padding(no-caps v-if="loginType === 'hcd'")
          SSOAccountItem( v-bind="ssoAccountInfo")
          q-menu
            q-list
              q-item(clickable v-close-popup @click="copyTextToClipboard(ssoAccountInfo.polkadotAddress)")
                q-item-section
                  q-item-label {{ $t('layouts.polkadotAddress') }}
                  q-item-label {{ ssoAccountInfo.polkadotAddress }}
          //- accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
        q-btn(:label="$t('layouts.logout')" no-caps @click="logout")
        //- q-toolbar-title.q-ml-md Hashed Template App
        //- div Quasar v{{ $q.version }}
      q-toolbar(class="bg-white text-primary")
        q-breadcrumbs(active-color="primary" style="font-size: 16px")
          q-breadcrumbs-el.q-ml-md(v-for="(breadcrumb, index) in breadcrumbList" :label="$t(`breadcrumb.${breadcrumb.name}`)" :icon="breadcrumb.icon" tag="div" :to="breadcrumb.to"  :class="{ 'hasLink': (!!breadcrumb.to || breadcrumb.back), }" @click="handlerBreadcrumb(index)")
        q-toolbar-title
        .text-caption(v-if="xpub && $route && $route.meta?.app === 'nbv'") XPUB: ...{{ xpub.substr(-8) }}
          q-tooltip {{ xpub }}
        q-toolbar-title
        .text-caption.q-mr-md(v-if="$route && ['hashed','nbv'].includes($route.meta?.app)") {{ encodedAddress }}
            q-tooltip Polkadot address encoded with prefix '9072'
      q-toolbar(class="bg-white text-warning text-center" v-if="$route && ['nbv'].includes($route.meta?.app)")
        q-toolbar-title.text-center
          .text-caption.warningText WARNING: BETA grade - do not use with large amounts
    q-page-container
      .row.justify-center
        .col-12
          q-page.q-py-md.q-px-lg
            not-connected(v-if="!isConnectedToServer")
            not-accounts(v-else-if="!selectedAccount")
            router-view(v-else)
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import NotAccounts from '~/pages/NotAccounts.vue'
import NotConnected from '~/pages/NotConnected.vue'
import SSOAccountItem from '~/components/common/login/sso-account-item'
// import { TreasuryApi } from '~/services/polkadot-pallets'
export default defineComponent({
  name: 'ConfidentialDocsLayout',

  components: {
    AccountsMenu,
    SelectedAccountBtn,
    NotAccounts,
    NotConnected,
    SSOAccountItem
  },

  setup () {
    const { showNotification, copyTextToClipboard } = useNotifications()
    const $store = useStore()
    const $route = useRoute()
    const $router = useRouter()
    const { t: $t } = useI18n()
    const selectedAccount = computed(() => $store.getters['polkadotWallet/selectedAccount'])
    const availableAccounts = computed(() => $store.getters['polkadotWallet/availableAccounts'])
    const isConnectedToServer = computed(() => $store.$connectedToServer)
    const xpub = computed(() => $store.getters['profile/xpub'])
    const encodedAddress = computed(() => $store.getters['profile/encodedAddress'])

    const ssoAccountInfo = computed(() => {
      if ($store.getters['hcdWallet/isLogged']) {
        return {
          displayName: $store.getters['hcdWallet/accountInfo'].given_name,
          profilePicture: $store.getters['hcdWallet/accountInfo'].picture,
          polkadotAddress: $store.getters['hcdWallet/polkadotAddress']
        }
      }
      return undefined
    })
    const polkadotUserInfo = computed(() => {
      if ($store.getters['polkadotWallet/isLoggedIn']) {
        return {
          username: $store.getters['profile/profileInfo'].profileName,
          address: $store.getters['profile/profileInfo'].polkadotAddress
        }
      }
      return undefined
    })
    const loginType = computed(() => {
      return $store.getters['profile/loginType']
    })

    // Dynamic options for each app
    const pageOptionsDictionary = {
      hashed: [
        {
          to: { name: 'wallet' },
          keyActive: 'wallet',
          label: $t('pages.hashed.wallet.wallet')
        },
        {
          to: { name: 'members' },
          keyActive: 'members',
          label: $t('pages.hashed.members.members')
        }
      ],
      nbv: [
        {
          to: { name: 'manageVaults' },
          keyActive: 'myVaults',
          label: 'My Vaults'
        },
        {
          to: { name: 'manageXpub' },
          keyActive: 'extendedKeys',
          label: 'Extended Keys'
        }
      ],
      marketplaces: [
        {
          to: { name: 'marketplacesList' },
          keyActive: 'Marketplaces',
          label: 'Marketplaces'
        },
        {
          to: { name: 'custodian' },
          keyActive: 'Custodian',
          label: 'Custodian'
        },
        {
          to: { name: 'privacy' },
          keyActive: 'Privacy',
          label: 'Privacy'
        }
      ],
      hcd: [
        {
          to: { name: 'hcd' },
          keyActive: 'confidentialDocuments',
          label: $t('pages.hcd.documents.documents')
        },
        {
          to: { name: 'create-asset' },
          keyActive: 'createAsset',
          label: $t('pages.hcd.afloat.tab')
        },
        {
          to: { name: 'get-all-assets' },
          keyActive: 'getAllAssets',
          label: $t('pages.hcd.afloat.tabGetAllAssets')
        },
        {
          to: { name: 'collections' },
          keyActive: 'NFTCollections',
          label: $t('pages.marketplace.mainOptions.nftCollections')
        },
        {
          to: { name: 'marketplacesList' },
          keyActive: 'marketplaces',
          label: $t('pages.marketplace.mainOptions.marketplaces')
        },
        {
          to: { name: 'afloat' },
          keyActive: 'taxCredits',
          label: $t('pages.marketplace.mainOptions.afloat')
        }
      ]
    }

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

    async function logout () {
      // eslint-disable-next-line no-undef
      google.accounts.id.disableAutoSelect()
      $store.dispatch('hcdWallet/logout')
      $store.dispatch('polkadotWallet/hashedLogout')
      $store.commit('profile/cleanProfile')
      $store.$hcd.logout()

      await $router.push({ name: 'login' })
    }

    function onSelectAccount (account) {
      $store.commit('polkadotWallet/setSelectedAccount', account)
    }

    function updateBreadcrumbs (v) {
      // Dynamic breadcrumb
      breadcrumbList.value = v.meta.breadcrumb
      // Dynamic options
      if (v.meta.app) {
        pageOptions.value = pageOptionsDictionary[v.meta.app]
      }
    }

    function isActive (module) {
      if (module && breadcrumbList?.value?.length > 0) {
        const fund = breadcrumbList.value.find(v => v.name.toLowerCase() === module.toLowerCase())
        return !!fund
      }
      return false
    }

    function handlerBreadcrumb (index) {
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
      loginType,
      ssoAccountInfo,
      copyTextToClipboard,
      polkadotUserInfo,
      xpub,
      encodedAddress
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'

.warningText
  font-size: 1.2rem

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
