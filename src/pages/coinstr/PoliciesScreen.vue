<template lang="pug">
#PoliciesScreen
  .text Policies Screen
  .row
    .col-8
      blockly(ref="blocklyRef")
    .col
      q-btn(
        label="Generate Code"
        @click="generateCode"
      )
</template>

<script setup>
import { ref } from 'vue'
import Blockly from '~/components/coinstr/blockly'

const blocklyRef = ref(undefined)
function generateCode () {
  const result = blocklyRef.value.readBlockly()
  console.log('result', result)
}
</script>
