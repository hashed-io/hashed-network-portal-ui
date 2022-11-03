<template lang='pug'>
q-card.full-width
  q-card-section
    q-form(
      ref="offerForm"
      @submit="onSubmitForm"
    )
      h-input.q-pt-lg(
        v-model="offerInput"
        :rules="[rules.required, rules.greaterOrEqualThan(1001)]"
        label="Enter the selling price of the NFT"
        typeProp="number"
      )
      .row.justify-start.q-py-md
        q-btn(
          type="submit"
          label="Submit Offer"
          rounded
          color="primary"
        )
</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'OfferForm',
  mixins: [validation],
  props: {
    collectionId: {
      type: String,
      default: '0'
    },
    instanceId: {
      type: String,
      default: '0'
    }
  },
  emits: ['onSubmitForm'],
  data () {
    return {
      offerInput: undefined
    }
  },
  methods: {
    async onSubmitForm () {
      if (await this.$refs.offerForm.validate()) {
        this.$emit('onSubmitForm', { collectionId: this.collectionId, itemId: this.instanceId, offer: this.offerInput })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
