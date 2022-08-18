<template lang="pug">
q-card(
  v-ripple
  @click="onClicked"
  data-testid="marketplaceItem"
  ).q-pa-sm.container.card-btn.animated-item
  .row.justify-center
    q-icon(name="store" size="4em" color="primary")
  #labels
    .text-subtitle2.text-weight-bold {{ marketplace?.value.label }}
    q-separator.q-my-sm
    .text-subtitle2.text-weight-bold {{ $t('pages.marketplace.role.administrator') }}
    account-item(:address="marketplace?.administrator" flat shortDisplay inherit)
    .text-subtitle2.text-weight-bold {{ $t('pages.marketplace.role.owner') }}
    account-item(:address="marketplace?.owner" flat shortDisplay inherit)
</template>

<script>
import { AccountItem } from '~/components/common'

/**
 * This component display all marketplace info in a list
 */
export default {
  name: 'MarketplaceItem',
  components: { AccountItem },
  props: {
    marketplace: {
      type: Object,
      default: undefined
    }
  },
  emits: ['onClickItem'],
  methods: {
    onClicked () {
      const marketplace = {
        id: this.marketplace.id,
        label: this.marketplace.value.label,
        administrator: this.marketplace.administrator
      }
      this.$emit('onClickItem', marketplace)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  min-height: 35vh
</style>
