<template lang="pug">
q-card.q-pa-sm.animated-item(@click="emitClick")
  q-item
    q-item-section.q-gutter-y-xs
      .row.justify-between
        .label-container
          .text-subtitle2.text-primary.hoverView Click to see details
        q-chip(v-bind="chipStatus")
      .text-subtitle2.one-line Message:
      .title.text-subtitle2.text-overline {{ message }}
      .row.items-center.one-line
        //- q-icon.q-mr-md(name="currency_bitcoin" size="sm" color="secondary")
        //- .col
        //-  .text-subtitle2.one-line Message:
        //-   span.text-body2.q-ml-sm {{ message }}
      //- .text-subtitle2 Proposer
      //- account-item(:address="proposer" flat inherit)
</template>

<script setup>
import { defineEmits, defineProps, computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { AccountItem } from '~/components/common'

/**
 * This component show proposal item info
 */
const props = defineProps({
  /**
   * Proposal's Vault Id
   */
  vaultId: {
    type: String,
    default: undefined
  },
  /**
   * Proposal status
   */
  status: {
    type: [String, Object],
    default: undefined
  },
  /**
   * Proof of reserves Description
   */
  message: {
    type: String,
    default: undefined
  },
  psbt: {
    type: String,
    default: undefined
  },
  threshold: {
    type: String,
    default: undefined
  },
  signedPsbts: {
    type: Array,
    default: () => []
  }
})

const { t: $t } = useI18n()

const { vaultId, status, message, psbt, threshold, signedPsbts } = toRefs(props)

const emits = defineEmits(['proofOfReservesClicked'])

const labelStatus = computed(() => {
  if (canFinalize.value && status.value && status.value !== 'Broadcasted') {
    return $t('pages.nbv.proposals.readyToFinalize')
  }
  if (status.value === 'Broadcasted') {
    return 'Finalized'
  }
  if (status.value && status.value.ReadyToFinalize === true) {
    return $t('pages.nbv.proposals.finalizing')
  } else if (status.value && status.value.ReadyToFinalize === false) {
    return $t('pages.nbv.proposals.broadcasting')
  } else if (status.value === 'Pending') {
    return $t('pages.nbv.proposals.pendingStatus')
  }
  return status.value
})

const chipStatus = computed(() => {
  const chip = {
    color: 'yellow-8',
    'text-color': 'white',
    // icon: 'error',
    label: $t('pages.nbv.proposals.pendingStatus'),
    size: '1.2em',
    ripple: false,
    clickable: false
  }
  if (labelStatus.value === 'Finalized') {
    chip.color = 'positive'
  }
  chip.label = labelStatus.value

  return chip
})

const canFinalize = computed(() => {
  // const signers = this.signedPsbts.filter(v => v.signed)
  return !!(signedPsbts.value.length >= threshold.value)
})

function emitClick () {
  // const data = {
  //   vaultId: this.vaultId,
  //   proposalId: this.proposalId,
  //   toAddress: this.toAddress,
  //   status: this.status,
  //   description: this.description,
  //   amount: this.amount,
  //   proposer: this.proposer,
  //   feeSatPerVb: this.feeSatPerVb,
  //   offchainStatus: this.offchainStatus,
  //   signedPsbts: this.signedPsbts,
  //   txId: this.txId,
  //   psbt: this.psbt
  // }
  /**
   * Emit proposal data when the card is clicked
   */
  emits('proofOfReservesClicked')
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
