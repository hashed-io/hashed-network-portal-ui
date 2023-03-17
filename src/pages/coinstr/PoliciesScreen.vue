<template lang="pug">
#PoliciesScreen
  .text Policies Screen
  .row
    .col-8
      coinstr-blockly(ref="blocklyRef" @onChangedPolicy="validatePolicy")
    .col
      q-btn(
        label="Generate Code"
        @click="generateCode"
      )
</template>

<script setup>
import { ref } from 'vue'
import CoinstrBlockly from '~/components/coinstr/coinstr-blockly'

const blocklyRef = ref(undefined)
function generateCode () {
  const result = blocklyRef.value.generateCode()
  console.log('result', result)
}

function validatePolicy (code) {
  console.log('validatingPolicy', code)
}
</script>
