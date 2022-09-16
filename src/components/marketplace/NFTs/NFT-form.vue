<template lang="pug">
#container
  .text-h5.q-pb-lg {{$t('pages.marketplace.taxCredits.createFormTitle')}}
  q-card(flat)
    q-card-section
      q-btn(
        data-testid="add-attribute"
        :label="$t('pages.marketplace.taxCredits.buttons.addAttribute')"
        color="primary"
        rounded
        no-caps
        icon="add"
        @click="onAddAttribute"
      ).q-my-lg
      q-form(ref="taxCreditForm" @submit="onSubmitTaxCredit")
        NFTInput(
          v-for="(attribute, index) in attributes"
          :key="index"
          :index="index"
          :rulesLabel="[rules.required]"
          :rulesValue="[rules.required]"
          v-model:label="attributes[index].label"
          v-model:value="attributes[index].value"
          @onRemoveAttribute="onRemoveAttribute"
        )
        q-btn.col-6.q-mt-md(
          :label="$t('pages.marketplace.taxCredits.buttons.createUnique')"
          type="submit"
          color='primary'
          icon="add"
          rounded
          no-caps
          data-testid="submit-btn"
          )
</template>
<script>
import { validation } from '~/mixins/validation'
import NFTInput from '~/components/marketplace/NFTs/NFT-input.vue'
export default {
  name: 'NFTForm',
  components: {
    NFTInput
  },
  mixins: [validation],
  emits: ['onSubmitForm'],
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
      if (this.attributes.length > 1) {
        this.attributes.splice(index, 1)
      } else {
        this.showNotification({ message: 'You must have at least one attribute', color: 'negative' })
      }
    },
    onAddAttribute () {
      this.attributes.push({
        label: undefined,
        value: undefined
      })
    },
    async onSubmitTaxCredit () {
      let containFile = false
      const processedData = this.attributes.map(attribute => {
        if (attribute.value instanceof File) {
          containFile = true
        }
        return [
          attribute.label,
          attribute.value
        ]
      })
      /**
       * Emit the data from the Form with the correct structure
       */
      this.$emit('onSubmitForm', { attributes: processedData, containFile })
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
