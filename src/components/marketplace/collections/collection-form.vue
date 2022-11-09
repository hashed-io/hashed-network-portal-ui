<template lang="pug">
#container
  .text-h5.q-pb-lg {{$t('pages.marketplace.taxCredits.createCollectionFormTitle')}}
  q-card(flat)
    q-card-section
      q-form(ref="taxCreditForm" @submit="onSubmitTaxCredit")
        h-input(
          v-model="collectionName"
          :label="$t('pages.collections.element.input')"
          :rules="[rules.required]"
        )
        q-btn.col-6.q-mt-md(
          :label="$t('pages.marketplace.taxCredits.buttons.createCollection')"
          type="submit"
          color='primary'
          icon="add"
          outline
          no-caps
          :disable="!collectionName"
          data-testid="submit-btn"
          )
</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'CollectionForm',
  mixins: [validation],
  emits: ['onSubmitForm'],
  data () {
    return {
      collectionName: undefined
    }
  },
  methods: {
    onSubmitTaxCredit () {
      /**
       * Emit the data from the Form with the correct structure
       */
      this.$emit('onSubmitForm', this.collectionName)
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
