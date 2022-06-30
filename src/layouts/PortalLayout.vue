<template lang="pug">
q-layout(view="lHh lpR lFf")
    q-drawer(
        v-model="drawerLeft"
        show-if-above
        :width="200"
        :breakpoint="700"
        class="bg-primary text-white"
    )
      q-list
        q-item(
            v-for="option in optionsMenu"
            clickable
            v-ripple
            :to="option.to"
        )
            q-item-section(avatar)
                q-icon(:name="option.icon")
            q-item-section(avatar) {{ option.label }}
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
          to: {
            name: 'manageVaults'
          }
        },
        {
          label: 'Marketplaces',
          icon: 'store',
          to: {
            name: 'marketplaceHome'
          }
        }
      ]
    }
  }
}
</script>
