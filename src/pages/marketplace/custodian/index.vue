<template lang='pug'>
#container
  applicants-list(:applicants="applicants" :showActions="showActions")
</template>
<script>
import ApplicantsList from 'src/components/marketplace/applicants-list.vue'
import { authentication } from 'src/mixins/authentication'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'CustodianIndex',
  components: {
    ApplicantsList
  },
  mixins: [authentication],
  data () {
    return {
      applicants: undefined,
      showActions: false
    }
  },
  computed: {
    // ...mapState('polkadotWallet', ['selectedAccount']),
    ...mapGetters('profile', ['polkadotAddress'])
  },
  watch: {
    polkadotAddress: {
      async handler () {
        this.applicants = []
        await this.getApplications()
      }
    }
  },
  beforeMount () {
    this.getApplications()
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsHashedLoggedIn']),
    async getApplications () {
      try {
        this.showLoading({ message: this.$t('pages.marketplace.custodian.gettingApplicationsWhereYouAreCustodian') })
        const response = await this.$store.$marketplaceApi.getApplicationsByCustodian({
          account: this.polkadotAddress
        })
        this.applicants = response || []
      } catch (error) {
        console.error(error)
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
