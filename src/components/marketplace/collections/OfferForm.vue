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
        :label="$t('pages.nfts.sellingLabel')"
        typeProp="number"
        testid="HInput"
      )
      h-input.q-pt-lg(
        v-model="percentage"
        :label="'Percent of the Tax Credit'"
      )
      //- pre {{ percent }}
      //- .row.justify-center
      //-   q-slider.col-11(
      //-     :model-value="percent"
      //-     :max="80"
      //-     :step="0.01"
      //-     label
      //-     @change="val => { percent = val}"
      //-   )
      .row.justify-start.q-py-md
        q-btn(
          type="submit"
          :label="$t('pages.nfts.submitOffer')"
          outline
          color="primary"
          data-testid="btn"
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
    },
    maxWeight: {
      type: String,
      default: '100.00%'
    }
  },
  emits: ['onSubmitForm'],
  data () {
    return {
      offerInput: undefined,
      percentage: undefined
    }
  },
  computed: {
    // getMaxPercent () {
    //   return
    // }
  },
  methods: {
    onSubmitForm () {
      this.$emit('onSubmitForm', { collectionId: this.collectionId, itemId: this.instanceId, offer: this.offerInput, percentage: this.percentage })
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
