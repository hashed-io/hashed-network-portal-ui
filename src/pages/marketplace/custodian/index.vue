<template lang='pug'>
#container
  applicants-list(:applicants="applicants" :showActions="showActions")
</template>
<script>
import ApplicantsList from 'src/components/marketplace/applicants-list.vue'
import { authentication } from 'src/mixins/authentication'
import { mapState, mapMutations } from 'vuex'
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
    ...mapState('polkadotWallet', ['selectedAccount'])
  },
  watch: {
    'selectedAccount.address': {
      async handler () {
        this.applicants = []
        const isLoggedIn = await this.$store.$hashedPrivateApi.isLoggedIn()
        if (!isLoggedIn) {
          await this.loginUser()
        }
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
          account: this.selectedAccount.address
        })
        const applicantsHP = await this.getFromHP(response)
        this.applicants = applicantsHP
      } catch (error) {
        console.log(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getFromHP (applicants) {
      console.log('applicants', applicants)
      const promisesFields = []
      const tmpApplicants = applicants
      const isLogged = await this.$store.$hashedPrivateApi.isLoggedIn()
      this.setIsHashedLoggedIn(isLogged)
      if (!isLogged) {
        await this.loginUser()
      }
      tmpApplicants.forEach((applicant, indexApplicant) => {
        applicant.fields.forEach(privateFields => {
          const identifier = 'File:'
          let cid = privateFields.displayName.includes(identifier)
            ? privateFields.custodianCid.split(':')[0]
            : privateFields.custodianCid
          if (cid.split(':').length > 1) {
            cid = cid.split(':')[0]
          }
          promisesFields.push(this.$store.$hashedPrivateApi.sharedViewByCID(cid))
        })
      })
      const resolvedFields = await Promise.all(promisesFields)
      let counter = 0
      tmpApplicants.forEach((applicant, indexApplicant) => {
        // const lengthFields = applicant.fields.length
        applicant.fields = applicant.fields.map((file, index) => {
          const displayName = resolvedFields[counter]?.name
          const description = resolvedFields[counter]?.description
          const cid = resolvedFields[counter]?.custodianCid
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
