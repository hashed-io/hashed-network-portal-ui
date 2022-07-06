<template lang="pug">
.q-pa-xs.round(flat class="bg-primary")
  q-item
    //-   .row.q-gutter-x-sm.items-center
    q-item-section.vertical-middle(v-if="selectedAccount")
      account-icon.vertical-middle(:address="selectedAccount.address" size="2.5em")
    q-item-section.title-section
        q-item-label.text-body2.text-white(v-if="!selectedAccount") Choose an account
        q-item-label.title-section.text-body2.text-white(v-else) {{ selectedAccount.meta.name }}
    q-item-section(v-if="arrow")
        q-icon.q-ml-sm(name="arrow_drop_down" color="white")

</template>

<script>
import AccountIcon from '~/components/common/account-icon.vue'

/**
 *
 * ### Component used to show selected account and trigger available accounts
 *
 *
 */
export default {
  name: 'SelectedAccountBtn',
  components: { AccountIcon },
  props: {
    /**
     * Selected Account Info
     */
    selectedAccount: {
      type: Object,
      default: () => {}
    },
    arrow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-section
    min-width: 90px !important
.round
  border-radius: 5px
</style>
