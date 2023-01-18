<template lang='pug'>
q-card.full-width
  q-card-section
    .text-h6.q-py-md {{ labelText }}
    q-form(
      ref="offerForm"
      @submit="onSubmitForm"
    )
      MoneyInput(
        v-model="offerInput"
        isMoney
        :rules="[rules.required, rules.greaterOrEqualThan(1001)]"
        :label="$t('pages.nfts.sellingLabel')"
        testId="price-input"

      )
      .label(v-if="showMarketSelect") {{'Where marketplace does you want to sell your Tax Credit?'}}
      q-select.q-pt-lg(
        v-if="showMarketSelect"
        outlined
        v-model="marketplace"
        :options="marketOptions"
        label="Choose a marketplace"
        :rules="[rules.required]"
        data-testid="selector-market"
      )
        template(v-slot:option='scope')
          q-item(v-bind='scope.itemProps')
            q-item-section
              q-item-label {{ scope.opt.label }}
              q-item-label.text-red(caption) fee of the market: {{ getPercentage(scope.opt.description) }}
      .text-red.text-caption.q-pl-xs(v-if="hasFee") fee of the market selected: {{ getPercentage(marketplace.description) }}
      .row.items-center
        q-slider.col-8.q-px-md.q-pt-xl(
          v-model="percentage"
          :max="100"
          :step="1"
          label
          inner-track-color="blue-grey-12"
          :label-value="percentage + ' %'"
          label-always
          data-testid="slider-percent"
        )
        .col-4.text-primary.q-pt-xl of the {{getMaxLimit + '%'}} of the {{taxCredit || 'tax credit'}}
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
import MoneyInput from '~/components/common/input/money-input.vue'
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
    labelText: {
      type: String,
      default: ''
    },
    showMarketSelect: {
      type: Boolean,
      default: true
    },
    taxCredit: {
      type: String,
      default: undefined
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
      percentage: 0,
      marketplace: undefined
    }
  },
  computed: {
    getMaxLimit () {
      return parseFloat(this.maxWeight.substring(0, this.maxWeight.length - 1))
    },
    hasFee () {
      return this.marketplace?.description
    }
  },
  methods: {
    onSubmitForm () {
      this.$emit('onSubmitForm', {
        collectionId: this.collectionId,
        itemId: this.instanceId,
        offer: this.offerInput,
        marketplace: this.marketplace?.value,
        percentage: this.percentage
      })
    },
    getPercentage (percentage) {
      return percentage
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
