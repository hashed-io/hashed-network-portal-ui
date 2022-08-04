<template lang='pug'>
.row.q-gutter-md
  #Title
    .text-h4 {{'Tax credit form'}}
  q-btn.col-12(label='Retrieve Uniques' @click='getUniques' color='primary' no-caps)
  TaxcreditForm(class="col-12" @onSubmitTax="onSubmitTaxCredit")
  TaxcreditList(class="col-12" :uniquesList="uniques")
</template>
<script>
import TaxcreditForm from '~/components/marketplace/TaxCredits/taxcredit-form.vue'
import TaxcreditList from '~/components/marketplace/TaxCredits/taxcredit-list.vue'
export default {
  name: 'Index',
  components: {
    TaxcreditForm,
    TaxcreditList
  },
  data () {
    return {
      uniques: undefined,
      taxCredit: {
        lastClass: undefined,
        lastInstance: undefined
      }
    }
  },
  mounted () {

  },
  methods: {
    async getUniques () {
      const taxcredit = await this.$store.$uniquesApi.getAsset({
        accountId: '',
        classId: '1',
        instanceId: '0'
      })
      console.log(taxcredit)
      this.uniques = [taxcredit]
    },
    async onSubmitTaxCredit (attributes) {
      console.log('onSubmitTaxCredit', attributes)
      // this.$store.$fruniquesApi.createWithAttributes({
      //   classId: '1',
      //   instanceId: '0',
      //   numericValue: undefined,
      //   admin: {

      //   },
      //   atrributes: {

      //   }
      // })
    }
  }
}
</script>
<style lang='styl'>

</style>
