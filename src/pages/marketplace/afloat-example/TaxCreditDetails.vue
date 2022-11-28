<template lang='pug'>
q-card
  .text-h5.q-pa-md {{$t('pages.nfts.detailsTaxCredit')}}
  .row.justify-between.q-py-lg.q-pa-md
    .col-5
      #header.text-subtitle1.q-pb-lg Tax Credit Information
      h-input(
        label="Title of the Tax Credit"
        v-model="getTitleTaxCredit"
        disable
      )
      h-input(
        label="state"
        v-model="getAttributes.state"
        disable
      )
      h-input(
        label="initial Amount (as shown on Grant)"
        v-model="getAttributes.initialAmount"
        disable
      )
      h-input(
        label="Current Credit Balance"
        v-model="getAttributes.currentBalance"
        disable
      )
      h-input(
        label="Expiration Date"
        v-model="getAttributes.expirationDate"
        disable
      )
      #CaliforniaForm.q-py-md(v-if="isCalifornia")
        .formContainer.q-pt-md
          h-input.q-py-md(
            v-model="getAttributes.SMLLC"
            label="Is a Single Member Limited Liability Company (SMLLC)"
            readonly
          )
          .q-py-sm.q-pl-sm {{'If you are an LLC please choose the appropiate box selecting your election to be treated as a'}}
          q-option-group(
            v-model="getAttributes.LLCTreatedAs"
            type="radio"
            :options="optionsLLC"
            inline
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.CFCTaxCreditCertificate"
            label="Name on CFC Tax Credit Certificate (Legal Name)"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.creditHolderIDNumber"
            label="Credit Holder Identification Number"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.streetAddress"
            label="Street Address or P.O. Box Number"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.CASecretaryNumber"
            label="CA Secretary of State File Number"
            readonly
            maxlength="12"
          )
          h-input.q-py-sm(
            v-model="getAttributes.city"
            label="City"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.state"
            label="State"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.zipCode"
            label="Zip Code"
            readonly
            maxlength="5"
          )
      #WisconsinForm.q-py-md(v-if="isWisconsin")
        .formContainer.q-pt-md
          h-input.q-py-sm(
            v-model="getAttributes.entityLegalName"
            label="Entity Legal Name"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.federalEmployerIDNumber"
            label="Federal Employer ID Number (last 4 digits)"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.legalFirstName"
            label="Legal First Name"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.legalLastName"
            label="Legal Last Name"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.MI"
            label="M.I."
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.city"
            label="City"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.state"
            label="State"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.zipCode"
            label="Zip Code"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.email"
            label="Email"
            readonly
          )
          h-input.q-py-sm(
            v-model="getAttributes.phoneNumber"
            label="Phone Number"
            fill-mask
            mask="(###) ### - ####"
            readonly
          )

    .col-6
      #header.text-subtitle1.q-pb-lg Tax Credit Grant
      .pdf-viewer.full-width.full-height(v-if="!taxCreditFile.isLoading")
        embed(
          v-if="taxCreditFile.file"
          :src="taxCreditFile.file"
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
  data () {
    return {
      taxCreditFile: {
        isLoading: false,
        file: undefined
      },
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
      return this.uniqueData?.titleTaxCredit
    },
    getAttributes () {
      const obj = {}
      this.uniqueData?.attributes?.forEach(attr => {
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
  async beforeMount () {
    const classId = this.$route.query?.classId || '0'
    const instanceId = this.$route.query?.instanceId
    if (classId) {
      try {
        this.showLoading({ message: this.$t('pages.nfts.loadingUniques') })

        const response = await this.$store.$afloatApi.getAsset({
          collectionId: classId,
          instanceId
        })
        const uniques = await this.$store.$afloatApi.getInstancesFromCollection({
          collectionId: classId
        })
        const metadata = uniques.find((unique) => unique.instance === instanceId)
        response.titleTaxCredit = metadata.data
        const index = response.attributes.findIndex((attr) => attr.label === 'taxCredit')
        if (index > -1) {
          try {
            this.taxCreditFile.isLoading = true
            const cid = response.attributes[index].value.slice(4)
            const { payload } = await this.$store.$hcd.viewSharedDataByCID(cid)
            const blob = new Blob([payload], { type: 'application/pdf' })
            const blobURL = URL.createObjectURL(blob)
            this.taxCreditFile.file = blobURL
          } catch (error) {
            this.taxCreditFile.file = undefined
          } finally {
            this.taxCreditFile.isLoading = false
          }
        }
        this.uniqueData = response
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    } else {
      this.$router.push({
        name: 'NFTs'
      })
    }
  },
  methods: {
    isFile (props) {
      if (!props.value || typeof props.value === 'object') return true
      else if (typeof props.value === 'string') return this.identifiers.some(identifier => props.value.includes(identifier))
      return false
    },
    async downloadFile (file) {
      try {
        this.showLoading({ message: this.$t('pages.marketplace.taxCredits.details.downloading') })
        const isFile = file?.payload instanceof File
        const isIPFS = typeof file === 'string' ? file.includes(this.identifiers[0]) : false
        let isBlob = false
        let blob
        if (isIPFS) {
          const stringSplittedArray = file.split(this.identifiers[0])
          const { type, payload } = await this.$store.$afloatApi.getFromIPFS(stringSplittedArray[1])
          blob = new Blob([payload], { type: type })
          isBlob = true
        }
        if (isFile) {
          blob = new Blob([file.payload], { type: file.type })
          isBlob = true
        }
        if (isBlob) {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          window.open(link.href)

          return
        }
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
      const isHCD = typeof file === 'string' ? file.includes(this.identifiers[1]) : false
      const stringSplittedArray = file.split(this.identifiers[1])
      const cid = stringSplittedArray[1]
      let response
      try {
        if (isHCD) {
          response = await this.$store.$hcd.viewSharedDataByCID(cid)
          console.log({ response })
        }
      } catch (error) {
        response = await this.$store.$hcd.viewOwnedDataByCID(cid)
        console.log({ response })
      } finally {
        if (response) {
          const blob = new Blob([response.payload], { type: response.payload.type })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          window.open(link.href)
        }
      }
    }
  }
}
</script>
  <style lang='stylus' scoped>

  </style>
