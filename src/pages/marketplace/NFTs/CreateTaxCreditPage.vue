<template lang='pug'>
q-card
  q-card-section
    TaxcreditSelector(@onSubmit="onFilled")
  q-card-section
    TaxCreditForm(
      ref="form"
      :state="taxCreditInfo.state"
      :typeCredit="taxCreditInfo.type"
      :adminMarket="adminMarketAddress"
      @onSubmitForm="onCreateNFT"
    )
</template>
<script>
import { mapGetters } from 'vuex'
import TaxcreditSelector from '~/components/marketplace/taxCredit/taxcredit-selector.vue'
import TaxCreditForm from '~/components/marketplace/taxCredit/taxcredit-form.vue'
export default {
  name: 'CreateTaxCreditPage',
  components: {
    TaxcreditSelector,
    TaxCreditForm
  },
  data () {
    return {
      adminMarketAddress: undefined,
      taxCreditInfo: {
        state: undefined,
        type: undefined,
        entity: undefined,
        file: undefined
      }
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress'])
  },
  async beforeMount () {
    const marketId = process.env.GATED_MARKETPLACE_ID
    const authorities = await this.$store.$marketplaceApi.getAuthoritiesByMarketplace({ marketId })
    const adminObj = authorities.find((authority) => authority.type === 'Admin')
    this.adminMarketAddress = adminObj.address
  },
  methods: {
    onFilled ({ state, type, entity }) {
      this.taxCreditInfo = {
        state,
        type,
        entity
      }
      this.$refs.form.reset()
    },
    async onCreateNFT ({ publicData, toEncrypt }) {
      try {
        const collectionId = this.$route.query?.classId || '0'
        const uniquesPublicAttributes = {}
        const plaintextSaveToIPFS = { data: {}, files: {} }
        const encryptoThenSaveToIPFS = { data: {}, files: {} }
        const assetId = 0
        const file = toEncrypt.file
        encryptoThenSaveToIPFS.files.taxCredit = file
        const metadata = publicData.metadata
        delete toEncrypt.file
        delete publicData.metadata
        Object.entries(publicData)?.forEach(([key, value]) => {
          uniquesPublicAttributes[key] = value
        })
        Object.entries(toEncrypt)?.forEach(([key, value]) => {
          encryptoThenSaveToIPFS.data[key] = value
        })
        const admin = this.adminMarketAddress
        await this.$store.$afloatApi.createAsset({ collectionId, assetId, uniquesPublicAttributes, saveToIPFS: plaintextSaveToIPFS, cidFromHCD: encryptoThenSaveToIPFS, admin, isHierarchical: false, metadata })
        this.showNotification({ message: this.$t('pages.marketplace.taxCredits.messages.uniqueCreated'), color: 'positive' })
        this.$router.push({
          name: 'afloat'
        })
      } catch (error) {
        console.error('error', error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onSubmitNFT ({ attributes, metadata }) {
      try {
        const collectionId = this.$route.query?.classId
        const uniquesPublicAttributes = {}
        const plaintextSaveToIPFS = { data: {}, files: {} }
        const encryptoThenSaveToIPFS = { data: {}, files: {} }
        const assetId = 0
        for (const attributeObj of attributes) {
          const { label, value, state, isFile } = attributeObj
          if (state === 'plain') {
            uniquesPublicAttributes[label] = value
          } else if (state === 'hcd') {
            if (isFile) {
              encryptoThenSaveToIPFS.files[label] = value
            } else {
              encryptoThenSaveToIPFS.data[label] = value
            }
          } else if (state === 'ipfs') {
            if (isFile) {
              plaintextSaveToIPFS.files[label] = value
            } else {
              plaintextSaveToIPFS.data[label] = value
            }
          }
        }
        const admin = this.$store.$hcd.getPolkadotAddress()
        await this.$store.$afloatApi.createAsset({ collectionId, assetId, uniquesPublicAttributes, saveToIPFS: plaintextSaveToIPFS, cidFromHCD: encryptoThenSaveToIPFS, admin, isHierarchical: false, metadata })
        this.showNotification({ message: this.$t('pages.marketplace.taxCredits.messages.uniqueCreated'), color: 'positive' })
        this.$router.push({
          name: 'collections'
        })
      } catch (error) {
        console.error('error', error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
