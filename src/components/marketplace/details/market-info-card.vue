<template lang="pug">
#container
  q-card(class="bg-inherit" flat)
    q-card-section
      .row.justify-center
        .text-h5 {{market.label}}
    q-card-section
      .row.text-center
        .col-6
          .text-subtitle1.text-weight-regular.q-my-md {{ $t('pages.marketplace.details.numberPaparticipantsTitle') }}
            .headline2 {{participants.length}}
        .col-6
          .row.q-col-gutter-md
            .col-6.q-pb-md
              .text-subtitle1.text-weight-regular {{ $t('pages.marketplace.role.administrator') }}
              account-item(
                class="q-mt-md"
                :address="market.admin?.address"
                shortDisplay
              )
            .col-6.q-pb-md
              .text-subtitle1.text-weight-regular {{ $t('pages.marketplace.role.owner') }}
              account-item(
                class="q-mt-md"
                :address="market.owner?.address"
                shortDisplay
              )
  .row.text-center.q-pa-md
    .text-subtitle1.text-weight-regular.q-py-md {{$t('pages.marketplace.details.participantsTitle')}}
    .col-12
      div(v-if="participants.length > 0 ")
        .row(v-for="participant in participants")
          account-item(
            class="account-item-style"
            :address="participant"
            bordered
            flat
            shortDisplay
          )
      .row.q-gutter-md(v-else)
        .col-12
          .text-subtitle2.text-weight-regular {{$t('pages.marketplace.details.noParticipants')}}
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'MarketInfoCard',
  components: { AccountItem },
  props: {
    /**
     * This props contains the market information to display [Required]
     * @type {Object}
     */
    market: {
      type: Object,
      required: true
    },
    /**
     * This props contains the participants of the market [Required]
     * @type {Array}
     */
    participants: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      marketInfo: {
        owner: undefined,
        admin: undefined,
        appraiser: undefined,
        label: undefined
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-item-style
  width : 100%
  margin-top: 1rem
  margin-left: 5px
  margin-right: 5px
</style>
