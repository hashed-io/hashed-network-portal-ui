<template lang='pug'>
.text-h5.q-pa-md {{$t('pages.nfts.detailsTaxCredit')}}
.row.justify-between.q-py-lg.q-pa-md
  .col-5
    #header.text-subtitle1.q-pb-lg Tax Credit Information
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
              readonly
            )
        .row.justify-between.items-center.q-col-gutter-sm
          h-input.col-6.q-py-sm(
            v-model="getAttributes.CFCTaxCreditCertificate"
            label="Name on CFC Tax Credit Certificate (Legal Name)"
            readonly
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.creditHolderIDNumber"
            label="Credit Holder Identification Number"
            readonly
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.streetAddress"
            label="Street Address or P.O. Box Number"
            readonly
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.CASecretaryNumber"
            label="CA Secretary of State File Number"
            readonly
            dense
            maxlength="12"
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.city"
            label="City"
            readonly
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.state"
            label="State"
            readonly
            dense
          )
          h-input.col-6.q-py-sm(
            v-model="getAttributes.zipCode"
            label="Zip Code"
            readonly
            dense
            maxlength="5"
          )
    #WisconsinForm.q-py-md(v-if="isWisconsin")
      .row.items-center.formContainer.q-pt-md.q-col-gutter-sm
        h-input.col-6.q-py-sm(
          v-model="getAttributes.entityLegalName"
          label="Entity Legal Name"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.federalEmployerIDNumber"
          label="Federal Employer ID Number (last 4 digits)"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.legalFirstName"
          label="Legal First Name"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.legalLastName"
          label="Legal Last Name"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.MI"
          label="M.I."
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.city"
          label="City"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.state"
          label="State"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.zipCode"
          label="Zip Code"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.email"
          label="Email"
          readonly
          dense
        )
        h-input.col-6.q-py-sm(
          v-model="getAttributes.phoneNumber"
          label="Phone Number"
          fill-mask
          mask="(###) ### - ####"
          readonly
          dense
        )
  .col-6
    #header.text-subtitle1.q-pb-lg Tax Credit Grant
    .pdf-viewer.full-width.full-height(v-if="!isLoading")
      embed(
        v-if="file"
        :src="file"
        height="600px"
        width="100%"
      )
    .not-file.text-red.text-subtitle1(v-else) You do not have access to the Tax Credit File
</template>
<script>
export default {
  name: 'TaxCreditDetails',
  components: {
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
      return this.getAttributes.state === 'California'
    },
    isWisconsin () {
      return this.getAttributes.state === 'Wisconsin'
    }
  },
  methods: {
  }
}
</script>
  <style lang='stylus' scoped>

  </style>
