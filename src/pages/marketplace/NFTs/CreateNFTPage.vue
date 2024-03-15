<template lang='pug'>
#container
  NFTForm.col-12.dialogClass(@onSubmitForm="onSubmitNFT" :adminMarketAddress="adminMarketAddress")
</template>
<script>
import NFTForm from '~/components/marketplace/NFTs/NFT-form.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CreateUniquesPage',
  components: {
    NFTForm
  },
  props: {
    class: {
      type: String,
      default: '0'
    },
    instance: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      adminMarketAddress: undefined
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
  <style lang='styl'>

  </style>
