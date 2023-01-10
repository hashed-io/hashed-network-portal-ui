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
      .label {{'Where marketplace does you want to sell your Tax Credit?'}}
      q-select.q-pt-lg(
        outlined
        v-model="marketplace"
        :options="marketOptions"
        label="Choose a marketplace"
        emit-value
        map-options
        :rules="[rules.required]"
      )
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
    marketOptions: {
      type: Array,
      default: () => [
        {
          label: 'Label marketplace',
          value: '0x00'
        }
      ]
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
      percentage: undefined,
      marketplace: undefined
    }
  },
  computed: {
    // getMaxPercent () {
    //   return
    // }
  },
  methods: {
    onSubmitForm () {
      this.$emit('onSubmitForm', { collectionId: this.collectionId, itemId: this.instanceId, offer: this.offerInput, marketplace: this.marketplace })
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
