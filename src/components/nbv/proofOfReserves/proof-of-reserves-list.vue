<template lang="pug">
#container
  #empty(v-if="!proofOfReserves || proofOfReserves.length === 0")
    q-card.q-pa-md
      .text-body2.text-center {{ $t('pages.nbv.proofOfReserves.emptyProofOfReserves') }}
//-   #list(v-if="proofOfReserves && proofOfReserves.length > 0")
    //- proposal-item.full-width.q-mt-md(v-for="proposal in proofOfReserves" v-bind="proposal" @proposalClicked="proposalClicked")
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import ProofOfReservesItem from '~/components/nbv/proofOfReserves/proof-of-reserves-item'

const props = defineProps({
  /**
   * Proof of reserves list to render for proof-of-reserves-item component
   */
  proofOfReserves: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['onProofOfReservesSelected'])

function proofOfReservesClicked (data) {
  /**
   * Emit the data of selected proof of reserves
   */
  this.$emit('onProofOfReservesSelected', data)
}
</script>
