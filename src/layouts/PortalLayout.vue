<template lang="pug">
q-layout(view="lHh lpR lFf")
    q-drawer(
        v-model="drawerLeft"
        show-if-above
        :width="225"
        :breakpoint="800"
        class="drawerBackground"
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
      .row.full-width.justify-around.fixed-bottom.q-mb-md
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
      drawerLeft: true,
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
  watch: {
    '$route' () {
      this.routerKeyApp = this.$route.meta.app
    }
  },
  beforeMount () {
    this.routerKeyApp = this.$route.meta.app
  },
  methods: {
  }
}
</script>

// TO DO - Icons SVG Component
<style lang="stylus">
@import '~/css/colors.styl'
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
