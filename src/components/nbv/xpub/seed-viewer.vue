<template lang="pug">
#container.q-pa-md
  .text-body2.text-bold.text-negative.q-mb-md Save your seed in a safe place, you won't be able to see it later.
  q-chip(
    v-for="word in seed.split(' ')"
    :label="word"
    :clickable="false"
  )
  .row.q-mt-md.reverse.q-gutter-sm
    q-btn(
      label="I saved my seed in a safe place"
      color="negative"
      no-caps
      @click="confirm"
    )
    q-btn(
      label="Cancel"
      color="negative"
      no-caps
      @click="cancel"
      outline
    )
</template>

<script>
export default {
  name: 'SeedViewer',
  props: {
    seed: {
      type: String,
      required: true
    }
  },
  emits: ['onConfirm', 'onCancel'],
  methods: {
    confirm () {
      this.$emit('onConfirm')
    },
    cancel () {
      this.$emit('onCancel')
    }
  }
}
</script>
