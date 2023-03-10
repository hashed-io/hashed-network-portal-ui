<template lang="pug">
q-layout(view="lHh lpR lFf")
    q-drawer(
        v-model="drawerLeft"
        show-if-above
        :width="225"
        :breakpoint="900"
        class="drawerBackground"
        @hide="updateLocalDrawer(false)"
    )
      q-list.q-pa-md.q-gutter-sm
        .q-pa-lg.q-mt-lg
            q-img(src="~/assets/portal/logo-gradient-white.png")
        q-item(
            v-for="option in optionsMenuByApp"
            clickable
            v-ripple
            :to="option.to"
            :class="{ 'activeRouter': routerKeyApp === option.key, 'defaultRouter': routerKeyApp !== option.key }"
        )
            //- v-if="(option.login === loginType || !option.login)"
            q-item-section(avatar)
                q-icon(class="material-icons-outlined" :name="option.icon")
            q-item-section(avatar) {{ $t(option.label) }}
      .fixed-bottom.q-mb-md.q-px-md
        q-btn.text-primary.full-width.q-ma-md(:label="selectedLang.label" color="white" icon-right="arrow_drop_down" no-caps)
          q-menu(fit auto-close)
            q-list
              #langOption(v-for="lang in availableLanguages")
                q-item(clickable @click="changeLanguage(lang.key)") {{ lang.label }}
                q-separator

        //- .row.full-width.justify-around
        //-   q-icon(
        //-       name="discord"
        //-       color="accent"
        //-   )
        //-   q-icon(
        //-       name="telegram"
        //-       color="accent"
        //-   )
        //-   i.twitterIcon.icon
    q-page-container
        router-view
</template>

<script>
export default {
  name: 'PortalLayout',
  data () {
    return {
      drawerLeft: false,
      optionsMenu: [
        {
          label: 'pages.hashed.wallet.wallet',
          icon: 'account_balance_wallet',
          key: 'hashed',
          to: {
            name: 'wallet'
          },
          // login: 'polkadotjs'
          login: 'all'
        },
        {
          label: 'pages.nbv.appName',
          icon: 'currency_bitcoin',
          key: 'nbv',
          to: {
            name: 'manageVaults'
          },
          // login: 'polkadotjs'
          login: 'all'
        },
        // {
        //   label: 'pages.marketplace.appName',
        //   icon: 'store',
        //   key: 'marketplace',
        //   to: {
        //     name: 'marketplacesList'
        //   },
        //   login: 'hcd'
        // },
        // {
        //   label: 'pages.sign.appName',
        //   icon: 'border_color',
        //   key: 'sign',
        //   to: {
        //     name: 'signTest'
        //   },
        //   login: 'polkadotjs'
        // },
        {
          label: 'HCD',
          icon: 'storage',
          key: 'hcd',
          to: {
            name: 'hcd'
          },
          login: 'hcd'
        }
      ],
      routerKeyApp: undefined
    }
  },
  computed: {
    availableLanguages () {
      return this.$i18n.availableLocales.map(v => {
        return {
          key: v,
          label: this.$t(`lang.${v}`)
        }
      })
    },
    selectedLang () {
      return this.availableLanguages.find(v => v.key === this.$i18n.locale)
    },
    loginType () {
      // if (this.$store.getters['polkadotWallet/isLoggedIn']) {
      //   return 'polkadotjs'
      // }
      // if (this.$store.getters['hcdWallet/isLogged']) {
      //   return 'hcd'
      // }
      return this.$store.getters['profile/loginType']
    },
    optionsMenuByApp () {
      if (this.loginType) {
        return this.optionsMenu.filter(v => (v.login === this.loginType || v.login === 'all'))
      }
      return this.optionsMenu
    }
  },
  watch: {
    '$route' () {
      this.routerKeyApp = this.$route.meta.app
    }
  },
  beforeMount () {
    this.routerKeyApp = this.$route.meta.app
    window.addEventListener('hashed-leftDrawer', (event) => this.updateLocalDrawer(event.detail.status))
  },
  beforeUnmount () {
    window.removeEventListener('hashed-leftDrawer', this.updateLocalDrawer)
  },
  methods: {
    updateLocalDrawer (status) {
      this.drawerLeft = status
      localStorage.setItem('hashed-leftDrawer', false)
    },
    changeLanguage (lang) {
      this.$i18n.locale = lang
      localStorage.setItem('hashed-langKey', lang)
    }
  }
}
</script>

// TO DO - Icons SVG Component
<style lang="stylus">
@import '~/css/app.styl'
.drawerBackground
   background: transparent linear-gradient(147deg, var(--unnamed-color-290266) 0%, #150133 100%) 0% 0% no-repeat padding-box
   background: transparent linear-gradient(147deg, #290266 0%, #150133 100%) 0% 0% no-repeat padding-box
   opacity: 1
.activeRouter
  background-color: $accent
  border-radius: 10px
.defaultRouter
  color: white
  border-radius: 10px
.twitterIcon
  mask: url(../assets/common/customIcons/twitter-brands.svg)
  mask-size: cover
.icon
  display: inline-block
  width: 15px
  height: 15px
  background: $accent
// .material-icons-outlined
//   font-family: "Material Icons Outlined"
//   font-weight: normal
//   font-style: normal
//   font-size: 24px /* ajuste el tamaño del icono según sea necesario */
//   line-height: 1
//   letter-spacing: normal
//   text-transform: none
//   display: inline-block
//   white-space: nowrap
//   word-wrap: normal
//   direction: ltr
//   -webkit-font-feature-settings: "liga"
//   -webkit-font-smoothing: antialiased
</style>
