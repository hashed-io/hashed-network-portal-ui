<template lang="pug">
q-card.q-pa-sm.animated-item(@click="emitClick")
  q-item
    q-item-section.q-gutter-y-xs
      .row.justify-between
        .label-container
          .text-subtitle2.text-primary.hoverView Click to see details
        q-chip(v-bind="chipStatus")
      .title.text-subtitle2.text-overline {{ description }}
      .row.items-center
        .col-sm-12.col-md-6.min-h
          .row
            q-icon.q-mr-md(name="fak fa-satoshisymbol-solid" size="sm" color="secondary")
            .text-subtitle2 Satoshi Amount:
              span.text-body2.q-ml-sm {{ amount }}
        .col-sm-12.col-md-6.min-h
          .row
            q-icon.q-mr-md(name="fak fa-satoshisymbol-solid" size="sm" color="secondary")
            .col
             .text-subtitle2 Fee Per Virtual Byte:
              span.text-body2.q-ml-sm {{ feeSatPerVb }}
      .row.items-center.one-line
        q-icon.q-mr-md(name="currency_bitcoin" size="sm" color="secondary")
        .col
         .text-subtitle2.one-line To Address:
          span.text-body2.q-ml-sm {{ toAddress }}
      .text-subtitle2 Proposer
      account-item(:address="proposer" flat inherit)
</template>

<script>
import { AccountItem } from '~/components/common'

/**
 * This component show proposal item info
 */
export default {
  name: 'ProposalItem',
  components: { AccountItem },
  props: {
    /**
     * Proposal's Vault Id
     */
    vaultId: {
      type: String,
      default: undefined
    },
    /**
     * Proposal Id
     */
    proposalId: {
      type: String,
      default: undefined
    },
    /**
     * Recipient address
     */
    toAddress: {
      type: String,
      default: undefined
    },
    /**
     * Proposal status
     */
    status: {
      type: String,
      default: undefined
    },
    /**
     * Proposal Description
     */
    description: {
      type: String,
      default: undefined
    },
    /**
     * Proposal Amount
     */
    amount: {
      type: String,
      default: undefined
    },
    /**
     * Proposal address
     */
    proposer: {
      type: String,
      default: undefined
    },
    /**
     * Fee in Satoshi Per Vault Bitcoin
     */
    feeSatPerVb: {
      type: String,
      default: undefined
    },
    offchainStatus: {
      type: [String, Object],
      default: () => undefined
    },
    txId: {
      type: String,
      default: undefined
    },
    psbt: {
      type: String,
      default: undefined
    },
    threshold: {
      type: [String, Number],
      default: undefined
    },
    signedPsbts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['proposalClicked'],
  computed: {
    chipStatus () {
      const chip = {
        color: 'yellow-8',
        'text-color': 'white',
        // icon: 'error',
        label: this.$t('pages.nbv.proposals.pendingStatus'),
        size: '1.2em',
        ripple: false,
        clickable: false
      }
      if (this.status && this.canFinalize && this.status.toLowerCase() !== 'broadcasted') {
        return {
          ...chip,
          label: 'Ready to finalize'
        }
      }
      if (this.status && this.status.toLowerCase() === 'pending') {
        return chip
      } else if (this.status && this.status.toLowerCase() === 'finalized') {
        return {
          ...chip,
          color: 'positive',
          icon: 'cloud_done',
          label: this.$t('pages.nbv.proposals.finalizedStatus')
        }
      } else if (this.status && this.status.toLowerCase() === 'broadcasted') {
        return {
          ...chip,
          color: 'positive',
          icon: 'cloud_done',
          label: this.$t('pages.nbv.proposals.broadcastedStatus')
        }
      }
      return undefined
    },
    canFinalize () {
      // const signers = this.signedPsbts.filter(v => v.signed)
      return !!(this.signedPsbts.length >= this.threshold)
    }
  },
  methods: {
    emitClick () {
      const data = {
        vaultId: this.vaultId,
        proposalId: this.proposalId,
        toAddress: this.toAddress,
        status: this.status,
        description: this.description,
        amount: this.amount,
        proposer: this.proposer,
        feeSatPerVb: this.feeSatPerVb,
        offchainStatus: this.offchainStatus,
        signedPsbts: this.signedPsbts,
        txId: this.txId,
        psbt: this.psbt
      }
      /**
       * Emit proposal data when the card is clicked
       */
      this.$emit('proposalClicked', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.min-h
  height: auto
  min-height: 5px
  max-height: 25px

.hoverView
  display: none

.animated-item:hover .hoverView
  display: block

.title
  font-size: 20px
</style>
