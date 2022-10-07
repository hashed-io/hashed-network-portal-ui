<template lang="pug">
#container(v-if="$route.params && $route.params.parentParams && $route.params.proposalParams")
  .row
    .col-10.q-pr-md
      //- Error Banner
      banner.q-mb-md(v-if="offchainMessage" v-bind="offchainMessage" )
      //- Action Btn
      q-page-sticky(position="bottom-right" :offset="[18, 18]")
        q-btn(fab icon="refresh" color="secondary" @click="updateProposal")
          q-tooltip(self="bottom left" anchor="top left" :offset="[10, 10]") {{ $t('pages.nbv.actions.refresh') }}
      //- Header
      .text-overline {{ $t('pages.nbv.proposals.proposalDetails') }}
      //- .row.justify-between.q-mb-md
      q-item.no-padding
        q-item-section
          .text-h4 {{ description }}
        q-item-section(avatar v-if="!isBroadcasted")
          //- .row.q-gutter-x-sm(v-if="!isBroadcasted")
          #signPSBT.q-mt-xs
      //- Body
      //- .row
      //-   .col
      //-     .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.status') }}
      //-     .text-body2 {{ labelStatus }}
      //-   .col
      //-     .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.threshold') }}
      //-     .text-body2 {{ `${threshold} of ${cosigners.length} Multisignature Vault` }}
      .row
        //- .col-xs-12.col-sm-12.col-md-4
        //- .col
        //-   .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.satoshiAmount') }}
        //-   .text-body2 {{ amount }}
        .col
          .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.feeInSatoshiPerVirtualByte') }}
          .text-body2 {{ feeSatPerVb }}
      .row
        .col
          .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.toAddress') }}
          .text-body2.one-line {{ toAddress }}
      .row(v-if="txId")
        .col
          .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.tx') }}
          .text-body2.one-line.txLabel(style="width: fit-content" @click="openTxExplorer") Click to open explorer
      .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.proposer') }}
      account-item.full-width(:address="proposer")
      #cosigners
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.cosigners') }}
        cosigners-list(:cosigners="proposalCosigners")
    .col
      q-card
        q-card-section.actionsCard
          .text-overline {{ $t('pages.nbv.proposals.status') }}
          q-chip.full-width(v-bind="statusChip")
          //- .text-body2 {{ labelStatus }}
          hr
          .text-overline {{ $t('pages.nbv.proposals.satoshiAmount') }}
          .text-body2 {{ amount || 0 }} Sats
          hr
          .text-overline {{ $t('pages.nbv.vaults.threshold') }}
          .text-body2 {{ `${threshold} of ${cosigners.length} Multisignature` }}
          hr
          .text-overline Actions
          .q-gutter-y-sm
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.signPSBT')"
              color="secondary"
              icon="qr_code"
              no-caps
              @click="showSignPSBT"
              :disabled="isOffchainError || !hasPsbt"
              v-if="!alreadySigned"
            )
            q-tooltip(v-if="isOffchainError") {{ validationMessage }}
            q-btn.full-width.no-padding(
              v-if="canFinalize && !isBroadcasted"
              :label="$t('pages.nbv.proposals.finalizeBtn')"
              color="secondary"
              icon="cloud_done"
              no-caps
              @click="finalizePsbt"
            )
            #DeleteProposal(v-if="canRemove")
              q-btn.full-width.no-padding(
                :label="$t('pages.nbv.proposals.deleteProposal')"
                color="negative"
                icon="delete"
                no-caps
                outline
                @click="removeProposal"
              )
  #modals
    q-dialog(v-model="isShowingSignPsbt")
      q-card.modalSize.q-pa-sm
        sign-proposal-stepper(
          :psbt="psbt"
          :canFinalize="canFinalize"
          :canBroadcast="canBroadcast"
          :alreadySigned="alreadySigned"
          :isBroadcasted="isBroadcasted"
          :isFinalized="isFinalized"
          @onSavePsbt="savePsbt"
          @onFinalizePsbt="finalizePsbt"
          @onBroadcastPsbt="broadcastPsbt"
        )

</template>

<script>
import { mapGetters } from 'vuex'
import { AccountItem, Banner } from '~/components/common'
import CosignersList from '~/components/nbv/proposals/cosigners-list'
import SignProposalStepper from '~/components/nbv/proposals/sign-proposal-stepper'
// eslint-disable-next-line no-var
var interval

export default {
  name: 'ProposalDetails',
  components: { AccountItem, CosignersList, Banner, SignProposalStepper },
  data () {
    return {
      vaultId: undefined,
      proposalId: undefined,
      toAddress: undefined,
      status: undefined,
      description: undefined,
      amount: undefined,
      proposer: undefined,
      feeSatPerVb: undefined,
      offchainStatus: undefined,
      txId: undefined,
      psbt: undefined,
      signedPsbts: [],
      cosigners: [],
      isShowingSignPsbt: false,
      psbtQR: undefined,
      offchainMessage: undefined,
      threshold: undefined,
      paramsParent: undefined
    }
  },
  computed: {
    // ...mapGetters('polkadotWallet', ['selectedAccount']),
    ...mapGetters('profile', ['polkadotAddress']),
    labelActionBtn () {
      switch (this.labelStatus) {
      case 'Pending':
        if (this.canFinalize) {
          return this.$t('pages.nbv.proposals.finalizeTxx')
        }
        return this.$t('pages.nbv.proposals.signPSBT')
      case 'Finalized':
        return this.$t('pages.nbv.proposals.broadcastTx')
      default:
        return this.$t('pages.nbv.proposals.signPSBT')
      }
    },
    statusChip () {
      const chip = {
        label: this.labelStatus,
        color: 'yellow-8',
        'text-color': 'white',
        ripple: false,
        click: false
      }
      try {
        if (this.status && this.canFinalize && this.status.toLowerCase() !== 'broadcasted') {
          return chip
        }
        if (this.status && this.status.toLowerCase() === 'pending') {
          return chip
        } else if (this.status && this.status.toLowerCase() === 'finalized') {
          return {
            ...chip,
            color: 'positive',
            icon: 'cloud_done',
            label: this.$t('pages.nbv.proposals.finalizedStatus')
          }
        } else if (this.status && this.status.toLowerCase() === 'broadcasted') {
          return {
            ...chip,
            color: 'positive',
            icon: 'cloud_done',
            label: this.$t('pages.nbv.proposals.broadcastedStatus')
          }
        }
        return chip
      } catch (e) {
        console.error('statusChip:', e)
        return chip
      }
    },
    labelStatus () {
      if (this.canFinalize && this.status && this.status !== 'Broadcasted') {
        return this.$t('pages.nbv.proposals.readyToFinalize')
      }
      if (this.status && this.status.ReadyToFinalize === true) {
        return this.$t('pages.nbv.proposals.finalizing')
      } else if (this.status && this.status.ReadyToFinalize === false) {
        return this.$t('pages.nbv.proposals.broadcasting')
      } else if (this.status === 'Pending') {
        return this.$t('pages.nbv.proposals.pendingStatus')
      }
      return this.status
    },
    hasPsbt () {
      return !!(this.psbt)
    },
    proposalCosigners () {
      return this.cosigners.map(cosigner => {
        return {
          address: cosigner,
          signed: this.signedPsbts.find(v => v.signer === cosigner)
        }
      })
    },
    canRemove () {
      let canRemove = false
      if (this.proposer === this.polkadotAddress && this.status === 'Pending') {
        canRemove = true
      }
      return canRemove
    },
    isOffchainError () {
      return !!(this.offchainMessage && this.offchainMessage.status === 'error')
    },
    validationMessage () {
      if (this.offchainStatus) {
        if (this.offchainStatus.status && this.offchainMessage?.status === 'pending') {
          return this.$t('pages.nbv.proposals.pending')
        } else if (this.offchainMessage.message) {
          return this.offchainMessage.message
        }
        return undefined
      }
      return undefined
    },
    canFinalize () {
      const signers = this.proposalCosigners.filter(v => v.signed)
      return !!(signers.length >= this.threshold)
    },
    canBroadcast () {
      return !!(this.labelStatus === 'Finalized')
    },
    isBroadcasted () {
      return !!(this.labelStatus === 'Broadcasted')
    },
    isFinalized () {
      return !!(this.labelStatus === 'Finalized')
    },
    alreadySigned () {
      return !!this.signedPsbts.find(v => v.signer === this.polkadotAddress)
    }
  },
  beforeMount () {
    try {
      // debugger
      const params = this.$route.params
      if (params && params.parentParams && params.proposalParams) {
        const paramsParent = JSON.parse(params.parentParams)
        this.paramsParent = paramsParent
        this.cosigners = paramsParent.cosigners
        this.threshold = paramsParent.threshold
        // console.log('paramsParent', paramsParent)
        const proposal = JSON.parse(params.proposalParams)
        if (proposal && proposal.vaultId) {
          // this.proposal = proposal
          this.syncData(proposal)
          interval = setInterval(() => {
            if (this.offchainMessage) {
              this.updateProposal()
            } else {
              clearInterval(interval)
            }
          }, 10000)
        } else {
          this.$router.replace({
            name: 'manageVaults'
          })
        }
        // Set router to back
        const breadcrumb = this.$route.meta.breadcrumb.map(b => {
          if (b.name === 'Vault Details') {
            return {
              ...b,
              back: false,
              to: {
                name: 'vaultDetails',
                params: { vault: JSON.stringify(paramsParent) }
              }
            }
          }
          return b
        })
        this.$route.meta.breadcrumb = breadcrumb
      } else {
        this.$router.replace({ name: 'manageVaults' })
      }
    } catch (e) {
      this.showNotification({ message: e.message || e, color: 'negative' })
    }
  },
  beforeUnmount () {
    clearInterval(interval)
  },
  methods: {
    openTxExplorer () {
      window.open(`https://mempool.space/tx/${this.txId}`, 'blank')
    },
    showSignPSBT () {
      this.isShowingSignPsbt = true
    },
    async broadcastPsbt () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.broadcastPsbt({
          proposalId: this.proposalId,
          signer: this.polkadotAddress
        })
        this.isShowingSignPsbt = false
        this.showNotification({ message: this.$t('pages.nbv.proposals.broadcasting') })
        this.updateProposal()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async finalizePsbt () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.finalizePsbt({
          proposalId: this.proposalId,
          signer: this.polkadotAddress,
          broadcast: true
        })
        this.isShowingSignPsbt = false
        this.showNotification({ message: 'Finalized' })
        this.updateProposal()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async removeProposal () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.removeProposal({
          proposalId: this.proposalId,
          signer: this.polkadotAddress
        })
        this.$router.replace({
          name: 'vaultDetails',
          params: { vault: JSON.stringify(this.paramsParent) }
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    syncData (proposal) {
      // console.log('proposal syncData', proposal)
      this.vaultId = proposal.vaultId
      this.proposalId = proposal.proposalId
      this.toAddress = proposal.toAddress
      this.status = proposal.status
      this.description = proposal.description
      this.amount = proposal.amount
      this.proposer = proposal.proposer
      this.feeSatPerVb = proposal.feeSatPerVb
      this.offchainStatus = proposal.offchainStatus
      this.txId = proposal.txId
      this.psbt = proposal.psbt
      this.signedPsbts = proposal.signedPsbts
      this.handlerOffchainStatus(this.offchainStatus)
    },
    async updateProposal () {
      try {
        this.showLoading({ message: this.$t('pages.nbv.proposals.updatingProposal') })
        const proposal = await this.$store.$nbvStorageApi.getProposalsById({ Ids: [this.proposalId] })
        this.syncData({
          ...proposal[0].toHuman(),
          proposalId: this.proposalId,
          threshold: this.threshold
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async savePsbt (psbt) {
      try {
        this.showLoading()
        const signers = await this.$store.$bdkApi.getListSigner({
          descriptors: {
            descriptor: this.paramsParent.descriptors.outputDescriptor,
            change_descriptor: this.paramsParent.descriptors.changeDescriptor
          },
          psbt
        })
        const userXPub = await this.getXpub()
        if (!this.isValidSignature(signers, userXPub)) {
          console.error('Not valid signatures', { signers, userXPub })
          this.showNotification({ message: this.$t('pages.nbv.proposals.signThePsbtWithValidXPUB'), color: 'negative' })
          return
        }
        this.showLoading()
        await this.$store.$nbvStorageApi.savePsbt({
          proposalId: this.proposalId,
          signer: this.polkadotAddress,
          psbt
        })
        this.showNotification({ message: this.$t('pages.nbv.proposals.psbtSavedSuccessfully') })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.isShowingSignPsbt = false
        this.hideLoading()
        this.updateProposal()
      }
    },
    isValidSignature (signers, xpub) {
      try {
        let valid = false
        signers.forEach(v => {
          if (xpub.includes(v.xpub)) {
            valid = true
          }
        })
        return valid
      } catch (e) {
        console.error(e)
        return false
      }
    },
    async getXpub () {
      try {
        this.showLoading()
        let userXpub
        const xpubId = await this.$store.$nbvStorageApi.getXpubByUser(this.polkadotAddress)
        if (xpubId && xpubId.value) {
          const xpub = await this.$store.$nbvStorageApi.getXpubById(xpubId.value)
          userXpub = xpub.isEmpty ? undefined : xpub.value
        }
        return userXpub.toHuman()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
        return undefined
      } finally {
        this.hideLoading()
      }
    },
    handlerOffchainStatus (offchainStatus) {
      if (offchainStatus.IrrecoverableError) {
        this.offchainMessage = {
          message: offchainStatus.IrrecoverableError,
          status: 'error'
        }
      } else if (offchainStatus.toLowerCase() === 'pending') {
        this.offchainMessage = {
          message: this.$t('pages.nbv.proposals.creatingPSBT'),
          status: 'loading'
        }
      } else if (offchainStatus.toLowerCase() === 'valid') {
        this.offchainMessage = undefined
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.txLabel
  text-decoration: underline
  cursor: pointer
</style>
