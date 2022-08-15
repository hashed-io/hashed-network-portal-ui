<template lang='pug'>
#container
  .row.q-gutter-md.justify-between
    #Title
      .text-h4 {{$t('pages.marketplace.taxCredits.title')}}
    q-btn(
      :label="$t('pages.marketplace.taxCredits.buttons.createUnique')"
      color="primary"
      rounded
      no-caps
      @click="onCreateUnique"
    )
  NFTList.q-py-md(
    :loading="loadingUniques"
    :uniquesList="uniques"
    @onClickUnique="onClickUnique"
  )
</template>
<script>
import { mapGetters } from 'vuex'
import NFTList from '~/components/marketplace/NFTs/NFT-list.vue'
export default {
  name: 'Index',
  components: {
    NFTList
  },
  data () {
    return {
      uniques: undefined,
      lastClass: undefined,
      lastInstance: undefined,
      loadingUniques: false
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount'])
  },
  async beforeMount () {
    await this.getListUniques()
  },
  methods: {
    onCreateUnique () {
      this.$router.push({
        name: 'NFTCreate',
        params: {
          class: parseInt(this.lastClass) + 1,
          instance: this.lastInstance
        }
      })
    },
    async getListUniques () {
      this.loadingUniques = true
      try {
        const response = await this.$store.$uniquesApi.getUniquesByAddress({
          // address: '5HeHxV3P4k62Q7M2hp6xXabiz9Q64HdDTbaty3pSZREL96ua'
          address: this.selectedAccount.address
        })
        const uniquesLength = response.length
        this.lastClass = uniquesLength > 0 ? parseInt(response[uniquesLength - 1].classId) : 0
        this.lastInstance = 0
        this.uniques = response
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.loadingUniques = false
      }
    },
    async getUniques () {
      const taxcredit = await this.$store.$uniquesApi.getAsset({
        accountId: '',
        classId: '1',
        instanceId: '0'
      })
      console.log(taxcredit)
      this.uniques = [taxcredit]
    },
    onClickUnique (unique) {
      const { classId } = unique
      const uniqueParams = JSON.stringify(unique)
      this.$router.push({
        name: 'NTFDetails',
        params: {
          unique: uniqueParams
        },
        query: {
          classId: classId
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.dialogClass
  width: 70vw
  margin-left: 15vw
</style>
