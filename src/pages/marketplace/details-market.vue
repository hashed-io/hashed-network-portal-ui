<template lang="pug">
#container(v-if="market")
  div.bg-inherit(v-if="!isEnrolled && !isAdmin && market && admin")
    q-card-section
      .row.justify-center
        .text-h5 {{market.label}}
    q-card-section
      .row.text-center.q-pb-md
        .col-6
          .fund_title.text-weight-regular.q-py-md {{ $t('pages.marketplace.details.numberPaparticipantsTitle') }}:
            .headline2 {{participants.length}}
        .col-6
          .row.q-col-gutter-md
            .col-6.q-pb-md
              .fund_title.text-weight-regular {{ $t('pages.marketplace.role.administrator') }}
              account-item(
                class="q-mt-md"
                :address="admin?.address"
                shortDisplay
              )
            .col-6.q-pb-md
              .fund_title.text-weight-regular {{ $t('pages.marketplace.role.owner') }}
              account-item(
                class="q-mt-md"
                :address="owner?.address"
                shortDisplay
              )
      banner(
        v-if="statusApplication === 'Pending'"
        :message="$t('pages.marketplace.details.pending')"
        status="loading"
      )
      banner(
        v-if="statusApplication === 'Rejected'"
        :message="`Marketplace's admin replied: ${application.feedback}`"
        status="error"
      )
      market-apply-form(
        :market="{...market, admin, owner}"
        :status="statusApplication"
        @submit="onSubmitApplyForm"
      )
  //- Tabs
  q-tabs.q-mt-lg(
    v-model="tab"
    v-if="isAdmin"
    :breakpoint="0"
    no-caps
    indicator-color="white"
    align="justify"
    class="bg-primary text-white"
    active-class="active-tab"
  )
    q-tab(:ripple="false" name="market-info" :label="$t('pages.marketplace.tabs.marketInfo')")
    q-tab(:riple="false" name="enrollment" :label="$t('pages.marketplace.tabs.enrollmentRequest')")

  q-tab-panels(v-model="tab" keep-alive)
    q-tab-panel(name="market-info" v-if="isEnrolled || isAdmin" class="tabPanel bg-inherit")
      market-info-card(:market="{...market, admin, owner}" :participants="participants")
    q-tab-panel(name="enrollment" v-if="isAdmin" class="tabPanel bg-inherit")
      applicants-list(:applicants="applicants" :showActions="true" @onEnrollApplicant="enrollApplicant" @onRejectApplicant="rejectApplicant")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import ApplicantsList from '~/components/marketplace/applicants-list.vue'
import { authentication } from '~/mixins/authentication'
import { Banner } from '~/components/common'

export default {
  name: 'DetailsMarket',
  components: {
    AccountItem,
    MarketInfoCard,
    MarketApplyForm,
    ApplicantsList,
    Banner
  },
  mixins: [authentication],
  data () {
    return {
      tab: 'market-info',
      marketId: undefined,
      market: undefined,
      application: undefined,
      participants: [],
      applicants: [],
      // With Extension
      maxLengthPrivateService: 20
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'isLoggedIn']),
    ...mapGetters('profile', ['polkadotAddress']),
    isEnrolled () {
      return !!this.participants?.find(participant => {
        return participant === this.polkadotAddress
      })
    },
    statusApplication () {
      return this.application?.status || 'Not applied'
    },
    isAdmin () {
      const isAdmin = this.admin && this.polkadotAddress === this.admin.address
      const isOwner = this.owner && this.polkadotAddress === this.owner.address
      return isAdmin || isOwner
    },
    admin () {
      if (this.market && this.market.authorities) {
        return this.market.authorities.find(v => v.type === 'Admin')
      }
      return undefined
    },
    owner () {
      if (this.market && this.market.authorities) {
        return this.market.authorities.find(v => v.type === 'Owner')
      }
      return undefined
    }
  },
  watch: {
    async selectedAccount () {
      if (this.tab === 'enrollment') {
        this.tab = 'market-info'
      }
      this.application = undefined
      this.participants = []
      this.applicants = []
      await this.getMarketplaceInfo()
    }
  },
  async beforeMount () {
    this.syncParams()
    this.getMarketplaceInfo()
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsHashedLoggedIn']),
    syncParams () {
      const queries = this.$route.query
      if (queries && queries.marketId) {
        this.marketId = this.$route.query.marketId
      } else {
        this.$router.push({ name: 'marketplace' })
      }
    },
    async getMarketplaceInfo () {
      try {
        this.showLoading()
        const market = await this.$store.$marketplaceApi.getMarketplaceById({ marketId: this.marketId })
        const authorities = await this.$store.$marketplaceApi.getAuthoritiesByMarketplace({ marketId: this.marketId })
        const participants = await this.$store.$marketplaceApi.getParticipantsByMarket({ marketId: this.marketId })
        const applicants = await this.$store.$marketplaceApi.getApplicantsByMarket({ marketId: this.marketId })
        try {
          const applicantsHP = await this.getFromHP(JSON.parse(JSON.stringify(applicants)))
          this.applicants = applicantsHP
        } catch (error) {
          this.applicants = applicants
          console.error('Error: ', error)
        }
        this.participants = participants
        await this.getApplication()
        this.market = market
        this.market.authorities = authorities
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onSubmitApplyForm (form) {
      try {
        this.showLoading()
        form = await this.shareWithAdministrator(form)
        if (form?.custodian) {
          form = await this.shareWithCustodian(form)
        }
        const { fields, custodianFields } = this.getStructureToSend(form)
        const propsToSubmit = {
          user: this.polkadotAddress,
          marketId: this.marketId,
          fields,
          custodianFields: form?.custodian ? custodianFields : undefined
        }
        // debugger
        if (this.statusApplication === 'Rejected') {
          await this.$store.$marketplaceApi.reapplyFor({
            ...propsToSubmit
          })
        } else {
          await this.$store.$marketplaceApi.applyFor({
            ...propsToSubmit
          })
        }
        this.showNotification({ message: this.$t('pages.marketplace.details.applicationWasSubmitted'), color: 'primary' })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async enrollApplicant (applicant) {
      try {
        this.showLoading()
        await this.$store.$marketplaceApi.enrollApplicant({
          user: this.polkadotAddress,
          marketId: this.marketId,
          accountOrApplication: { Account: applicant.address },
          feedback: applicant.feedback,
          approved: true
        })
        this.showNotification({
          message: this.$t('pages.marketplace.details.applicationApproved'),
          color: 'primary'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async rejectApplicant (applicant) {
      try {
        this.showLoading()
        await this.$store.$marketplaceApi.enrollApplicant({
          user: this.polkadotAddress,
          marketId: this.marketId,
          accountOrApplication: { Account: applicant.address },
          approved: false,
          feedback: applicant.feedback
        })
        this.showNotification({
          message: this.$t('pages.marketplace.details.applicationRejected'),
          color: 'primary'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
        this.getMarketplaceInfo()
      }
    },
    async getApplication () {
      try {
        this.application = await this.$store.$marketplaceApi.getApplicationStatusByAccount({
          account: this.polkadotAddress,
          marketId: this.marketId
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async getFromHP (applicants) {
      const promisesFields = []
      applicants.forEach((applicant, indexApplicant) => {
        const applicantFields = applicant.fields
        applicantFields.forEach(privateFields => {
          const identifier = 'File:'
          let cid = privateFields.displayName.includes(identifier)
            ? privateFields.cid.split(':')[0]
            : privateFields.cid
          if (cid.split(':').length > 1) {
            cid = cid.split(':')[0]
          }
          promisesFields.push(this.$store.$hashedPrivateApi.sharedViewByCID(cid))
        })
      })
      const _resolvedFields = await Promise.all(promisesFields)
      let counter = 0
      const tmpApplicants = applicants.map((applicant, indexApplicant) => {
        // const lengthFields = applicant.fields.length
        const tmpFields = applicant.fields
        applicant.fields = tmpFields.map((file, index) => {
          const displayName = _resolvedFields[counter].name
          const description = _resolvedFields[counter].description
          const cid = _resolvedFields[counter].cid
          const payload = _resolvedFields[counter].payload
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
    },
    async shareWithAdministrator (form) {
      try {
        const promises = []
        const hpService = this.$store.$hashedPrivateApi
        const administratorAddress = this.admin.address
        for (const fileElement of form.fields) {
          const { label, file } = fileElement
          let fileName
          if (file?.name) {
            const fileNameSplit = file.name.split('.')
            const filename = fileNameSplit[0].length > this.maxLengthPrivateService ? fileNameSplit[0].substring(0, this.maxLengthPrivateService) : fileNameSplit[0]
            const ext = fileNameSplit[1]
            fileName = filename + '.' + ext
          } else if (file && typeof file === 'string') {
            // if file.name is undefined, it means that the file is a note (String)
            fileName = file
          }
          promises.push(hpService.shareNew({
            toUserAddress: administratorAddress,
            name: fileName,
            description: label,
            payload: file
          }))
        }
        const results = await Promise.all(promises)
        for (const fileElement of form.fields) {
          const { file } = fileElement
          const result = results.shift()
          const CID = result.sharedData.cid
          const fileName = file.name ? file.name : 'Notes'
          fileElement.id = result.ownedData.id
          fileElement.value = CID + ':' + fileName
          fileElement.description = result.sharedData.description
        }
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        throw new Error('Error sharing with administrator')
      }
      return form
    },
    async shareWithCustodian (form) {
      const notesIdentifier = 'Notes'
      const { custodian, fields } = form
      if (!custodian) {
        return form
      }
      const hpService = this.$store.$hashedPrivateApi
      const promisesFields = []
      try {
        for (const field of fields) {
          const { id } = field
          promisesFields.push(hpService.shareExisting({
            toUserAddress: custodian,
            originalOwnedDataId: id
          }))
        }
        const results = await Promise.all(promisesFields)
        for (const field of fields) {
          const result = results.shift()
          if (result.description === 'Notes') {
            field.custodianField = result.cid + ':' + notesIdentifier
          } else {
            field.custodianField = result.cid + ':' + result.name
          }
        }
      } catch (error) {
        console.error('Error Sharing with Custodian', error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        throw new Error('Error sharing with custodian')
      }
      return form || undefined
    },
    getStructureToSend (form) {
      const { fields, custodian } = form
      const custodianElements = []
      const fieldsToSend = fields.map(field => {
        const isNotes = field.description === 'Notes'
        custodianElements.push(field.custodianField)
        if (isNotes) {
          return [
            'Notes',
            field.value
          ]
        }
        const fileName = 'File:' + field.description
        return [
          fileName,
          field.value
        ]
      })
      const custodianFields = [
        custodian,
        custodianElements
      ]
      return { fields: fieldsToSend, custodianFields }
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.tabPanel
  min-height: calc(80vh - 120px);
  padding: 0px !important

.bottomLineTabs
  // border-bottom: 1px solid $color-secondary !important
</style>
