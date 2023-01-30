<template lang="pug">
#container
  q-stepper(
    v-model="step"
    animated
    ref="stepper"
    flat
    vertical
  )
    q-step.minH(
      :name="steps.signPsbt"
      :title="$t('pages.nbv.proposals.signPsbt')"
      icon="qr_code"
      :done="step === steps.uploadPsbt"
    )
        p {{ $t('pages.nbv.proposals.signPsbtDescription') }}
    q-step.minH(
      :name="steps.uploadPsbt"
      :title="$t('pages.nbv.proposals.saveSignedPsbt')"
      icon="qr_code"
      :done="step > steps.uploadPsbt"
    )
        p {{ $t('pages.nbv.proposals.saveSignedPsbtDescription') }}
    template(v-slot:navigation)
      q-stepper-navigation
        .row.justify-end.q-gutter-sm
          q-btn(color="negative" :label="$t('pages.nbv.proposals.exitWithoutSave')" no-caps v-close-popup)
          q-btn(@click="dispatchStep" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" no-caps)
</template>

<script setup>
import { ref, toRefs, defineProps, onMounted, defineEmits } from 'vue'

// Props
const props = defineProps({
  psbt: {
    type: String,
    required: true
  }
})

const { psbt } = toRefs(props)

// Events
const emits = defineEmits(['onSignPsbt', 'onSavePsbt'])

// eslint-disable-next-line no-unused-vars
const stepper = ref(undefined)
const step = ref('sign')
const steps = ref({
  signPsbt: 'signPsbt',
  uploadPsbt: 'uploadPsbt'
})

onMounted(() => {
  step.value = steps.value.signPsbt
})

// eslint-disable-next-line no-unused-vars
const dispatchStep = () => {
  try {
    const next = stepper.value.next

    if (step.value === steps.value.signPsbt) {
      console.log('step 1', step.value)
      emits('onSignPsbt', { next, psbt: psbt.value })
    } else if (step.value === steps.value.uploadPsbt) {
      emits('onSavePsbt', { next, psbt: psbt.value })
      console.log('step 2', step.value)
    }
  } catch (e) {
    console.error(e)
  }
}

</script>
