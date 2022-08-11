<template lang="pug">
#container
    .text-subtitle1 Search document
    q-form.q-gutter-sm(@submit="onSubmit")
        q-input(
            label="CID"
            v-model="cid"
            outlined
            :rules="[rules.required]"
        )
        .row
            q-btn(
                label="Search document"
                no-caps
                color="primary"
                type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'SearchDocumentForm',
  mixins: [validation],
  emits: ['onSubmit'],
  data () {
    return {
      cid: undefined
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.cid)
    }
  }
}
</script>
