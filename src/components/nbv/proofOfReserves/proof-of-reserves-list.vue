<template lang="pug">
#container
  #notSupported(v-if="!isSupported")
    q-card
      q-card-section
        .text-body2.text-caption Blue Wallet currently does not support not spendable PSBT signatures. This feature is only available in HCD with Google. We will provide updates on any changes to this matter.
  #supported(v-if="isSupported")
    #empty(v-if="!proofOfReserves")
      q-card.q-pa-md
        .text-body2.text-center {{ $t('pages.nbv.proofOfReserves.emptyProofOfReserves') }}
        .row.justify-center.q-mt-xs
          q-btn.q-px-md(
            label="Create proof of reserves"
            color="positive"
            no-caps
            dense
            @click="emits('onCreateProofOfReserves')"
            :disabled="disabled"
          )
    proof-of-reserves-item.full-width.q-mt-md(
      v-else
      v-bind="proofOfReserves"
      @proofOfReservesClicked="proofOfReservesClicked"
    )
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import ProofOfReservesItem from '~/components/nbv/proofOfReserves/proof-of-reserves-item'

const props = defineProps({
  /**
   * Proof of reserves list to render for proof-of-reserves-item component
   */
  proofOfReserves: {
    type: Object,
    default: () => undefined
  },
  disabled: {
    type: Boolean,
    default: true
  },
  isSupported: {
    type: Boolean
  }
})

const emits = defineEmits(['onProofOfReservesSelected', 'onCreateProofOfReserves'])

function proofOfReservesClicked (data) {
  /**
   * Emit the data of selected proof of reserves
   */
  emits('onProofOfReservesSelected', data)
}
</script>
