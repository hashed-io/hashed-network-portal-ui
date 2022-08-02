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
            v-for="option in optionsMenu"
            clickable
            v-ripple
            :to="option.to"
            :class="{ 'activeRouter': routerKeyApp === option.key, 'defaultRouter': routerKeyApp !== option.key }"
        )
            q-item-section(avatar)
                q-icon(:name="option.icon")
            q-item-section(avatar) {{ option.label }}
      .fixed-bottom.q-mb-md.q-px-md
        q-btn.text-primary.full-width.q-ma-md(:label="selectedLang.label" color="white" icon-right="arrow_drop_down" no-caps)
          q-menu(fit auto-close)
            q-list
              #langOption(v-for="lang in availableLanguages")
                q-item(clickable @click="changeLanguage(lang.key)") {{ lang.label }}
                q-separator

        .row.full-width.justify-around
          q-icon(
              name="discord"
              color="accent"
          )
          q-icon(
              name="telegram"
              color="accent"
          )
          i.twitterIcon.icon
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
          label: 'NBV',
          icon: 'currency_bitcoin',
          key: 'nbv',
          to: {
            name: 'manageVaults'
          }
        },
        {
          label: 'Marketplaces',
          icon: 'store',
          key: 'marketplaces',
          to: {
            name: 'marketplacesList'
          }
        },
        {
          label: 'Sign Test',
          icon: 'border_color',
          key: 'sign',
          to: {
            name: 'signTest'
          }
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
</style>
