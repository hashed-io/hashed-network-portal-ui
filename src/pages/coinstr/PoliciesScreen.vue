<template lang="pug">
#PoliciesScreen
  .row
    .col-9
      coinstr-blockly(ref="blocklyRef" @onChangedPolicy="validatePolicy")
    .col.q-pa-md.box
      .text-body2.text-bold Policy code:
      .text-body2.text-weight-light {{ policy }}
</template>

<script setup>
import { ref } from 'vue'
import CoinstrBlockly from '~/components/coinstr/coinstr-blockly'

const blocklyRef = ref(undefined)
const policy = ref(undefined)

function generateCode () {
  const result = blocklyRef.value.generateCode()
  policy.value = result
  console.log('result', result)
}

function validatePolicy (code) {
  console.log('validatingPolicy', code)
  policy.value = code
}
</script>

<style lang="stylus" scoped>
.box {
    inline-size: 150px;
    overflow-wrap: break-word;
}
</style>
