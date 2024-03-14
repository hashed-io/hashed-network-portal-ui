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
        const applicantsHP = await this.getFromHP(response)
        this.applicants = applicantsHP
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getFromHP (applicants) {
      const promisesFields = []
      const tmpApplicants = applicants.filter(applicant => {
        return applicant.fields[0].custodianCid !== null
      })
      this.setIsHashedLoggedIn(true)
      tmpApplicants.forEach((applicant, indexApplicant) => {
        applicant.fields.forEach(privateFields => {
          const identifier = 'File:'
          let cid = privateFields.displayName.includes(identifier)
            ? privateFields.custodianCid.split(':')[0]
            : privateFields.custodianCid
          if (cid) {
            if (cid.split(':').length > 1) {
              cid = cid.split(':')[0]
            }
            // promisesFields.push(this.$store.$hashedPrivateApi.sharedViewByCID(cid))
          }
        })
      })
      const resolvedFields = await Promise.all(promisesFields)
      let counter = 0
      tmpApplicants.forEach((applicant, indexApplicant) => {
        applicant.fields = applicant.fields.map((file, index) => {
          const cid = resolvedFields[counter]?.custodianCid
          const displayName = resolvedFields[counter]?.name
          const description = resolvedFields[counter]?.description
          const payload = resolvedFields[counter]?.payload
          counter++
          return {
            description,
            displayName,
            payload,
            cid
          }
        })
        return applicant
      })
      return tmpApplicants
    }
  }
}
</script>
<style lang='styl'>

</style>
