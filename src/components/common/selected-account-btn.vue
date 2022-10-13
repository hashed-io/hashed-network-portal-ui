<template lang="pug">
.q-pa-xs.round(flat class="bg-primary")
  q-item
    //-   .row.q-gutter-x-sm.items-center
    q-item-section.vertical-middle(v-if="address")
      account-icon.vertical-middle(:address="address" size="2.5em")
    q-item-section.title-section
        q-item-label.text-body2.text-white(v-if="isSelector && !address") Choose an account
        q-item-label.title-section.text-body2.text-white {{ username }}
    q-item-section(v-if="isSelector")
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
    // selectedAccount: {
    //   type: Object,
    //   default: () => {}
    // },
    username: {
      type: String,
      default: undefined
    },
    isSelector: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: undefined
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
