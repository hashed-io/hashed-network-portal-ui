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
        v-if="statusApplication !== 'Pending'"
        :market="{...market, admin, owner}"
        @onSubmitApplyForm="onSubmitApplyForm"
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
      market-info-card(:market="{...market, admin, owner}" :participants="participants" @onInviteSuccess="onInviteSuccess")
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
        this.market = { ...market, marketId: this.marketId }
        this.market.authorities = authorities
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    },
    async onSubmitApplyForm ({ fields: formFields }) {
      try {
        this.showLoading()
        console.log({ formFields })
        const fields = formFields.map(({ label, cid }) => {
          return [label, cid]
        })
        const propsToSubmit = {
          user: this.polkadotAddress,
          marketId: this.marketId,
          fields,
          // custodianFields: form?.custodian ? custodianFields : undefined
          custodianFields: undefined
        }
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
        this.handlerError(e)
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
        this.handlerError(e)
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
        this.handlerError(e)
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
        this.handlerError(e)
      }
    },
    async getFromHP (applicants) {
      const promisesFields = []
      applicants.forEach((applicant, indexApplicant) => {
        const applicantFields = applicant.fields
        applicantFields.forEach(hcdFields => {
          const identifier = 'HCD:'
          let cid = hcdFields.displayName.includes(identifier)
            ? hcdFields.cid.split(':')[0]
            : hcdFields.cid
          if (cid.split(':').length > 1) {
            cid = cid.split(':')[1]
          }
          promisesFields.push(this.$store.$hcd.viewSharedDataByCID(cid))
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
    },
    async onInviteSuccess () {
      this.syncParams()
      this.getMarketplaceInfo()
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
