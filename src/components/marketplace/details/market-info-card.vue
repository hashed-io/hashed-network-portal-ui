<template lang="pug">
#container
  q-card(class="bg-inherit" flat)
    q-card-section
      .row.justify-center
        .text-h5(data-testid="market_label") {{market.label}}
    q-card-section
      .row.text-center
        .col-6
          .text-subtitle1.text-weight-regular.q-my-md {{ $t('pages.marketplace.details.numberPaparticipantsTitle') }}
            .headline2(data-testid="number_participants") {{participants.length}}
          q-btn(
            label="invite an account"
            no-caps
            color="primary"
            outline
            size="sm"
            @click="() => {this.modal.show = true}"
          )
        .col-6
          .row.q-col-gutter-md
            .col-6.q-pb-md
              .text-subtitle1.text-weight-regular {{ $t('pages.marketplace.role.administrator') }}
              account-item(
                class="q-mt-md"
                :address="market.admin?.address"
                shortDisplay
                data-testid="admin_account"
              )
            .col-6.q-pb-md
              .text-subtitle1.text-weight-regular {{ $t('pages.marketplace.role.owner') }}
              account-item(
                class="q-mt-md"
                :address="market.owner?.address"
                shortDisplay
                data-testid="owner_account"
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
            data-testid="participant_item"
          )
      .row.q-gutter-md(v-else)
        .col-12
          .text-subtitle2.text-weight-regular(data-testid="no_participants") {{$t('pages.marketplace.details.noParticipants')}}
  q-dialog(v-model="modal.show")
    q-card
      q-card-section
          .q-pa-xl
            .text-subtitle1 Enter the address of the participant to invite him into the marketplace
              q-form(ref="inviteForm" @submit="onInvite")
                AccountInput.q-pt-xl(
                  v-model="modal.address"
                  outlined
                  label="Enter the address of the participant"
                  :rules="[rules.isValidPolkadotAddress]"
                )
                .row.justify-center
                  q-btn(
                    type="submit"
                    label="Invite the account"
                    color="primary"
                    outline
                    no-caps
                    size="md"
                  )

</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import AccountInput from '~/components/common/account-input.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'MarketInfoCard',
  components: { AccountItem, AccountInput },
  mixins: [validation],
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
      modal: {
        show: false,
        address: undefined
      },
      marketInfo: {
        owner: undefined,
        admin: undefined,
        appraiser: undefined,
        label: undefined
      }
    }
  },
  methods: {
    async onInvite () {
      try {
        await this.$store.$afloatApi.inviteToMarketplace({
          marketplaceId: this.market.marketId,
          account: this.modal.address,
          fields: [['Invited of the admin', 'invited']],
          custodiansFields: null
        })
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
        this.modal.show = false
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
