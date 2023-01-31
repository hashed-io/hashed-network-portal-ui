<template lang='pug'>
.row.justify-between.q-py-lg.q-pa-md
  .col-5
    #header.text-subtitle1.q-pb-lg Tax Credit Information
    .text-subtitle2 Owner of the Tax Credit
    AccountItem.q-mb-md(
      :address="uniquesData.owner"
      flat
      bordered
    )
    .row.q-col-gutter-sm
      h-input.col-auto(
        label="Title of the Tax Credit"
        v-model="getTitleTaxCredit"
        disable
        dense
      )
      h-input.col-auto(
        label="state"
        v-model="getAttributes.state"
        disable
        dense
      )
      h-input.col-auto(
        label="initial Amount (as shown on Grant)"
        v-model="getAttributes.initialAmount"
        disable
        dense
      )
      h-input.col-auto(
        label="Current Credit Balance"
        v-model="getAttributes.currentBalance"
        disable
        dense
      )
      h-input.col-auto(
        label="Expiration Date"
        v-model="getAttributes.expirationDate"
        disable
        dense
      )
    #CaliforniaForm.q-py-md(v-if="isCalifornia")
      .formContainer.q-pt-md
        .row.q-gutter-md.items-start
          h-input.col-4.q-py-md(
            v-model="getAttributes.SMLLC"
            label="Is a Single Member Limited Liability Company (SMLLC)"
            readonly
            dense
          )
          .col-6
            .q-py-sm.q-pl-sm {{'If you are an LLC please choose the appropiate box selecting your election to be treated as a'}}
            q-option-group(
              v-model="getAttributes.LLCTreatedAs"
              type="radio"
              :options="optionsLLC"
              inline
              disable
            )
        .row.justify-between.items-center.q-col-gutter-sm
          h-input.col-6.q-py-sm(
            v-model="getAttributes.CFCTaxCreditCertificate"
            label="Name on CFC Tax Credit Certificate (Legal Name)"
            disable
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.creditHolderIDNumber"
            label="Credit Holder Identification Number"
            disable
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.streetAddress"
            label="Street Address or P.O. Box Number"
            disable
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.CASecretaryNumber"
            label="CA Secretary of State File Number"
            disable
            dense
            maxlength="12"
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.city"
            label="City"
            disable
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.state"
            label="State"
            disable
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.zipCode"
            label="Zip Code"
            disable
            dense
            maxlength="5"
          )
    #WisconsinForm.q-py-md(v-if="isWisconsin")
      .row.items-center.formContainer.q-pt-md.q-col-gutter-sm
        h-input.col-6.q-py-sm(
          v-model="getAttributes.entityLegalName"
          label="Entity Legal Name"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.federalEmployerIDNumber"
          label="Federal Employer ID Number (last 4 digits)"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.legalFirstName"
          label="Legal First Name"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.legalLastName"
          label="Legal Last Name"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.MI"
          label="M.I."
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.city"
          label="City"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.state"
          label="State"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.zipCode"
          label="Zip Code"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.email"
          label="Email"
          disable
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.phoneNumber"
          label="Phone Number"
          fill-mask
          mask="(###) ### - ####"
          disable
          dense
        )
  .col-6
    #header.text-h6.q-pb-lg Tax Credit Grant
    div(v-if="isLoading") Loading the Tax Credit
    .pdf-viewer.full-width.full-height(v-else-if="!isLoading && file")
      embed(
        v-if="file"
        :src="file"
        height="600px"
        width="100%"
      )
    .not-file.text-red.text-h6.text-bold(v-else-if="!isLoading && file === undefined")
      | You do not have access to the Tax Credit File
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'TaxCreditDetails',
  components: {
    AccountItem
  },
  props: {
    uniquesData: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    /**
     * Use Blob ['blob:adasdsd.pdf'] or URL
     * Do not use Type File
     */
    file: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      uniqueData: undefined,
      identifiers: ['IPFS:', 'HCD:'],
      optionsLLC: [
        {
          label: 'Partnership',
          value: 'partnership'
        },
        {
          label: 'Corporation',
          value: 'corporation'
        },
        {
          label: 'N/A',
          value: 'n/a'
        }
      ]

    }
  },
  computed: {
    getTitleTaxCredit () {
      return this.uniquesData?.metadata
    },
    getAttributes () {
      const obj = {}
      this.uniquesData?.attributes?.forEach(attr => {
        obj[attr.label] = attr.value
      })
      return obj
    },
    getColumnsi18n () {
      return [
        {
          name: 'attribute',
          label: this.$t('pages.marketplace.taxCredits.details.attribute'),
          value: 'attribute',
          field: row => row.label,
          align: 'left',
          width: '50%'
        },
        {
          name: 'value',
          label: this.$t('pages.marketplace.taxCredits.details.value'),
          field: row => row.value,
          value: 'value',
          align: 'right',
          width: '50%'
        }
      ]
    },
    isCalifornia () {
      return this.getAttributes.state === 'California' || this.getAttributes.rootState === 'California'
    },
    isWisconsin () {
      return this.getAttributes.state === 'Wisconsin' || this.getAttributes.rootState === 'Wisconsin'
    }
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>

</style>
