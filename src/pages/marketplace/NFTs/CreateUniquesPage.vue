<template lang='pug'>
#container
  NFTForm.col-12.dialogClass(@onSubmitTax="onSubmitTaxCredit" )
</template>
<script>
import NFTForm from 'src/components/marketplace/NFTs/NFT-form.vue'
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

    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  methods: {
    async onSubmitTaxCredit (attributes, containFile) {
      console.log('onSubmitTaxCredit', attributes, { containFile, lastClass: this.class, lastInstance: this.instance })
      try {
        this.showLoading()
        if (containFile) {
          const attributesToUpload = []
          attributes.forEach(attribute => {
            if (attribute[1] instanceof File) {
              attributesToUpload.push(attribute)
            }
          })
          const attributesWithPrivateService = await this.uploadToPrivateService(attributesToUpload)
          console.log('attributesWithPrivateService', attributesWithPrivateService)
        }
        await this.$store.$fruniquesApi.createWithAttributes({
          user: this.selectedAccount.address,
          classId: 6,
          instanceId: parseInt(this.instance),
          numericValue: 0,
          admin: { Id: this.selectedAccount.address },
          attributes: attributes
        })
        this.showNotification({ message: this.$t('pages.marketplace.taxCredits.messages.uniqueCreated'), color: 'positive' })
        this.$router.push({
          name: 'NFTs'
        })
      } catch (error) {
        console.error('error', error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async uploadToPrivateService (attributes) {
      const promises = []
      const privateService = this.$store.$hashedPrivateApi
      const administratorAddress = '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
      try {
        let fileName
        for (const attribute of attributes) {
          const label = attribute[0]
          const file = attribute[1]
          const fileNameSplit = file.name.split('.')
          const filename = fileNameSplit[0].length > this.maxLengthPrivateService ? fileNameSplit[0].substring(0, this.maxLengthPrivateService) : fileNameSplit[0]
          const ext = fileNameSplit[1]
          fileName = filename + '.' + ext
          console.log({ administratorAddress, fileName, label, file })
          promises.push(privateService.shareNew({
            toUserAddress: administratorAddress,
            name: fileName,
            description: label,
            payload: file
          }))
        }
        const results = await Promise.all(promises)
        for (const attribute of attributes) {
          const result = results.shift()
          const CID = result.sharedData.cid
          attribute[1] = {
            id: result.ownedData.id,
            value: 'File:' + CID,
            description: result.sharedData.description
          }
        }
        console.log('uploadToPrivateService', attributes)
        return attributes
      } catch (error) {
        console.error(error)
        throw new Error('Error uploading to private service: ', error)
      }
    }
  }
}
</script>
<style lang='styl'>

</style>
