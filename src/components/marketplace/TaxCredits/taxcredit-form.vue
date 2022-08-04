<template lang="pug">
#container
  q-card
    q-card-section
      q-form(ref="taxCreditForm" @submit="onSubmitTaxCredit")
        q-btn(
          class="q-my-md"
          label="Add attribute"
          color="primary"
          no-caps
          @click="onAddAttribute"
        )
        TaxcreditInput(
          v-for="(attribute, index) in attributes"
          :key="index"
          :index="index"
          :rulesLabel="[rules.required, rules.isValidPolkadotAddress]"
          :rulesValue="[rules.required]"
          v-model:label="attributes[index].label"
          v-model:value="attributes[index].value"
          @onRemoveAttribute="onRemoveAttribute"
        )
        q-btn.col-6.q-mt-md(label='Create Tax Credit' type="submit" color='primary' no-caps)
</template>
<script>
import { validation } from '~/mixins/validation'
import TaxcreditInput from '~/components/marketplace/TaxCredits/taxcredit-input.vue'
export default {
  name: 'TaxcreditForm',
  components: {
    TaxcreditInput
  },
  mixins: [validation],
  emits: ['onSubmitTax'],
  data () {
    return {
      attributes: [
        {
          label: undefined,
          value: undefined
        }
      ]

    }
  },
  methods: {
    onRemoveAttribute (index) {
      console.log(index)
      this.attributes.splice(index, 1)
    },
    onAddAttribute () {
      this.attributes.push({
        label: undefined,
        value: undefined
      })
    },
    async onSubmitTaxCredit () {
      const isValid = await this.$refs.taxCreditForm.validate()
      if (isValid) {
        this.$emit('onSubmitTax', this.attributes)
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
