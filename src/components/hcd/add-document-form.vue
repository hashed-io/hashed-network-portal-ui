<template lang="pug">
#container
    .text-subtitle1 Add document
    q-form.q-gutter-sm(@submit="onSubmit")
        q-input(
          label="Name"
          v-model="name"
          outlined
          :rules="[rules.required]"
        )
        q-input(
          label="Description"
          v-model="description"
          outlined
          :rules="[rules.required]"
        )
        q-file(
          v-model="payload"
          outlined
          label="Payload"
          :rules="[rules.required]"
        )
        q-toggle(
          label="Share with other user"
          v-model="isShared"
        )
        q-slide-transition
            account-input(
                label="Polkadot address to share"
                v-model="toUserAddress"
                outlined
                :rules="[rules.required]"
                v-if="isShared"
            )
        .row
            q-btn(
              label="Add"
              no-caps
              color="primary"
              type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'AddDocumentForm',
  mixins: [validation],
  emits: ['onSubmit'],
  data () {
    return {
      name: undefined,
      description: undefined,
      payload: undefined,
      isShared: false,
      toUserAddress: undefined
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', {
        name: this.name,
        description: this.description,
        payload: this.payload,
        isShared: this.isShared,
        toUserAddress: this.toUserAddress
      })
    }
  }
}
</script>
