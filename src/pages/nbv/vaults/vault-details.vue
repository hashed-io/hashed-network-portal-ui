<template lang="pug">
#container(v-if="$route.params && $route.params.vault")
  .row
    .col-10.q-pr-md
      //- Error Banner
      banner.q-mb-md(v-if="offchainMessage" v-bind="offchainMessage" )
      //- Action Btn
      q-page-sticky(position="bottom-right" :offset="[18, 18]")
        q-btn(fab icon="refresh" color="secondary" @click="updateVault")
          q-tooltip(self="bottom left" anchor="top left" :offset="[10, 10]") {{ $t('pages.nbv.actions.refresh') }}
      //- Header
      .text-overline {{ $t('pages.nbv.vaults.vaultDetails') }}
      .row.justify-between.q-mb-md
        .text-h4 {{ description }}
      //- Body
      //- .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.vaultId') }}
      //- .text-body2.one-line {{ vaultId }}
      //- .row
      //-   .col
      //-     .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.balance') }}
      //-     .row
      //-       q-icon.q-mr-md(name="fak fa-satoshisymbol-solid" size="sm" color="secondary")
      //-       .text-body2 {{ balance || 0 }} Sats
      //-   .col
      //-     .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.threshold') }}
      //-     .text-body2 {{ `${threshold} of ${cosigners.length} Multisignature` }}
      .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.owner') }}
      account-item(:address="owner")
      .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.cosigners') }}
      .q-gutter-sm(v-for="cosigner in cosigners")
        account-item.q-mt-md(:address="cosigner")
      .text-subtitle2.q-mt-md(v-if="outputDescriptor") {{ $t('pages.nbv.vaults.receiveAddress') }}
      q-card.q-pa-xs(v-if="outputDescriptor")
        q-item
          q-item-label.text-body2(lines="1") {{ vaultAddress }}
        .row.full-width.reverse.q-gutter-xs
          q-btn.button(
            :label="$t('pages.nbv.vaults.refreshAndShowQrAddress') "
            size="sm"
            no-caps
            color="secondary"
            @click="refreshAndShowQrAddress"
          )
          q-btn.button(
            :label="$t('pages.nbv.vaults.refreshAndCopyAddress') "
            size="sm"
            no-caps
            color="secondary"
            @click="refreshAndCopyAddress"
          )
      .text-subtitle2.q-mt-md(v-if="outputDescriptor") {{ $t('pages.nbv.vaults.outputDescriptor') }}
      q-card.q-pa-xs(v-if="outputDescriptor")
        q-item
          q-item-section
            q-item-label.text-body2(lines="1") {{ outputDescriptor }}
        .row.reverse
          q-btn.button(
            :label="$t('pages.nbv.actions.copyToClipboard')"
            size="sm"
            no-caps
            color="secondary"
            @click="copyTextToClipboard(outputDescriptor, 'Output Descriptor copied to clipboard')"
          )
      //- Proposals
      #proposals.row.justify-between.items-center.q-mt-lg.q-mb-sm
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.proposals') }}
      proposals-list(:proposals="proposalsList" @onProposalSelected="goToProposalDetails")
      #modals
        q-dialog(v-model="isShowingCreateProposal" persistent)
          q-card.modalSize.minH
            create-proposal-form(@submittedForm="createNewProposal" :currentBalance="balance")
        q-dialog(v-model="isShowingVaultQR")
          q-card.modalQrSize.q-pa-sm
            .text-body2.text-weight-light.q-ml-sm.text-center.q-mt-sm {{ $t('pages.nbv.vaults.descriptorQr') }}
            div.qrContainer(v-html="vaultQR")
            q-btn.full-width.q-mx-md(
              icon="content_copy"
              :label="$t('pages.nbv.actions.copyToClipboard')"
              flat
              size="md"
              no-caps
              @click="copyTextToClipboard(vaultQrText, 'Descriptor copied to clipboard')"
            )
        q-dialog(v-model="isShowingAddressQR")
          q-card.modalQrSize.q-pa-sm
            .text-body2.text-weight-light.q-ml-sm.text-center.q-mt-sm {{ $t('pages.nbv.vaults.receiveAddress') }}
            div.qrContainer(v-html="addressQR")
    .col
      q-card.actionsCard
        q-card-section
          .text-overline {{ $t('pages.nbv.vaults.balance') }}
            .row
              q-icon.q-mr-md(name="fak fa-satoshisymbol-solid" size="sm" color="secondary")
              .text-subtitle2 {{ balance || 0 }} Sats
          hr
          .text-overline {{ $t('pages.nbv.vaults.threshold') }}
          .text-body2 {{ `${threshold} of ${cosigners.length} Multisignature` }}
          hr
          .text-overline.q-mt-xs Actions
          .q-gutter-y-sm
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.vaults.exportDescriptor')"
              color="secondary"
              icon="qr_code"
              no-caps
              @click="exportVault"
              :disabled="!outputDescriptor"
            )
              //- icon="qr_code"
              q-tooltip(v-if="!outputDescriptor") {{ $t('pages.nbv.vaults.pending') }}
            #btnCreateProposal
              q-btn.full-width.no-padding(
                :label="$t('pages.nbv.proposals.createProposal')"
                :color="(!balance || balance <= 0) ? 'grey' : 'positive'"
                no-caps
                icon="add"
                @click="isShowingCreateProposal = true"
                :disabled="!balance || balance <= 0"
              )
              //- icon="add"
              q-tooltip(v-if="!balance || balance <= 0") {{ $t('pages.nbv.vaults.vaultsBalanceMustBeGreaterThanZero') }}
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.vaults.deleteVault')"
              color="negative"
              no-caps
              outline
              @click="removeVault"
              v-if="iAmOwner"
              icon="delete"
            )
              //- icon="delete"
</template>

<script>
import { mapGetters } from 'vuex'
import { AccountItem, Banner } from '~/components/common'
import CreateProposalForm from '~/components/nbv/proposals/create-proposal-form'
import ProposalsList from '~/components/nbv/proposals/proposals-list'
import { Encoder, QRCode } from '@smontero/nbv-ur-codec'
// eslint-disable-next-line no-var
var interval
const qrCode = new QRCode()

export default {
  name: 'VaultDetails',
  components: { AccountItem, CreateProposalForm, ProposalsList, Banner },
  data () {
    return {
      vaultId: undefined,
      owner: undefined,
      description: undefined,
      descriptors: undefined,
      changeDescriptor: undefined,
      outputDescriptor: undefined,
      offchainStatus: undefined,
      threshold: undefined,
      cosigners: undefined,
      isShowingCreateProposal: false,
      isShowingVaultQR: false,
      isShowingAddressQR: false,
      addressQR: undefined,
      vaultQR: undefined,
      vaultQrText: undefined,
      vaultAddress: undefined,
      balance: undefined,
      offchainMessage: undefined,
      proposalsList: []
    }
  },
  computed: {
    // ...mapGetters('polkadotWallet', ['selectedAccount']),
    ...mapGetters('profile', ['polkadotAddress']),
    iAmOwner () {
      return this.polkadotAddress === this.owner
    },
    isOffchainError () {
      return !!(this.offchainMessage && this.offchainMessage.status === 'error')
    },
    validationMessage () {
      if (this.offchainStatus) {
        if (this.offchainStatus.status && this.offchainMessage.status === 'pending') {
          return 'Pending'
        } else if (this.offchainMessage.message) {
          return this.offchainMessage.message
        }
      }
      return undefined
    }
  },
  watch: {
    selectedAccount () {
      this.$router.replace({
        name: 'manageVaults'
      })
    }
  },
  beforeMount () {
    try {
      // debugger
      // this.$router.push({ path: '/vaults' })
      const params = this.$route.params
      if (!params || params === {} || !params.vault) {
        this.$router.push({ path: '/vaults' })
        return
      }
      const vault = JSON.parse(params.vault)
      if (!vault || !vault.owner || !vault.vaultId) {
        this.$router.replace({ name: 'manageVaults' })
        return
      }
      this.syncData(vault)
      this.getReceiveAddress()
      // this.$route.meta.breadcrumb[1].name = 'Detailsss'

      interval = setInterval(() => {
        if (this.offchainMessage) {
          this.updateVault()
        } else {
          clearInterval(interval)
        }
      }, 10000)
    } catch (e) {
      this.showNotification({ message: e.message || e, color: 'negative' })
    }
  },
  beforeUnmount () {
    clearInterval(interval)
  },
  methods: {
    async updateVault () {
      try {
        this.showLoading({ message: this.$t('pages.nbv.proposals.updatingProposal') })
        const vault = await this.$store.$nbvStorageApi.getVaultsById({ Ids: [this.vaultId] })
        this.getReceiveAddress()
        this.syncData({
          ...vault[0].toHuman(),
          vaultId: this.vaultId
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    syncData (vault) {
      // console.log('vault syncData', vault)
      this.vaultId = vault.vaultId
      this.owner = vault.owner
      this.description = vault?.description
      this.threshold = vault?.threshold
      this.cosigners = vault?.cosigners
      this.descriptors = vault?.descriptors
      this.outputDescriptor = vault?.descriptors?.outputDescriptor
      this.changeDescriptor = vault?.descriptors?.changeDescriptor
      this.offchainStatus = vault?.offchainStatus
      this.handlerOffchainStatus(this.offchainStatus)
      this.getProposals()
      if (this.vaultId && this.outputDescriptor) {
        this.getBalance()
      }
    },
    async getBalance () {
      try {
        const balance = await this.$store.$bdkApi.getBalance({
          descriptor: this.outputDescriptor,
          changeDescriptor: this.changeDescriptor
        })
        this.balance = balance
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async removeVault () {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.removeVault({
          id: this.vaultId,
          user: this.polkadotAddress
        })
        this.$router.replace({
          name: 'manageVaults'
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async exportVault () {
      try {
        this.showLoading()
        if (!this.vaultQR) {
          const data = await this.$store.$bdkApi.getMultisig({
            descriptor: this.outputDescriptor
          })
          const encoder = new Encoder()
          const text = encoder.encodeVault(data, this.description)
          const result = encoder.vaultToQRCode(data, this.description)
          this.vaultQR = result
          this.vaultQrText = text
        }
        this.isShowingVaultQR = true
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getReceiveAddress () {
      try {
        if (!this.outputDescriptor) return
        this.showLoading()
        const data = await this.$store.$bdkApi.getNewAddress({
          descriptor: this.outputDescriptor
        })
        this.vaultAddress = data
        // this.copyTextToClipboard(data)
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async createNewProposal (payload) {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.createProposal({
          vaultId: this.vaultId,
          signer: this.polkadotAddress,
          recipientAddress: payload.recipientAddress,
          satoshiAmount: payload.amountInSats,
          description: payload.description
        })
        this.isShowingCreateProposal = false
        this.showNotification({ message: this.$t('pages.nbv.proposals.proposalCreated') })
        this.getProposals()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getProposals () {
      try {
        this.showLoading()
        const proposalsIds = await this.$store.$nbvStorageApi.getProposalsByVault({ vaultId: this.vaultId })
        if (!proposalsIds.isEmpty) {
          const Ids = proposalsIds.toJSON()
          const proposals = await this.$store.$nbvStorageApi.getProposalsById({ Ids })
          this.proposalsList = proposals.map((v, i) => {
            return {
              ...v.toHuman(),
              proposalId: Ids[i]
            }
          })
        } else this.proposalsList = []
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    goToProposalDetails (proposal) {
      const parentParams = {
        vaultId: this.vaultId,
        owner: this.owner,
        description: this.description,
        descriptors: this.descriptors,
        threshold: this.threshold,
        cosigners: this.cosigners,
        outputDescriptor: this.outputDescriptor,
        changeDescriptor: this.changeDescriptor,
        offchainStatus: this.offchainStatus
      }
      const JsonParams = JSON.stringify(parentParams)
      const ProposalParams = JSON.stringify(proposal)
      this.$router.push({
        name: 'proposalDetails',
        params: {
          parentParams: JsonParams,
          proposalParams: ProposalParams
        }
      })
    },
    handlerOffchainStatus (offchainStatus) {
      if (offchainStatus.IrrecoverableError) {
        this.offchainMessage = {
          message: offchainStatus.IrrecoverableError,
          status: 'error'
        }
      } else if (offchainStatus.toLowerCase() === 'pending') {
        this.offchainMessage = {
          message: this.$t('pages.nbv.vaults.creatingDescriptor'),
          status: 'loading'
        }
      } else if (offchainStatus.toLowerCase() === 'valid') {
        this.offchainMessage = undefined
      }
    },
    async refreshAndCopyAddress () {
      try {
        await this.getReceiveAddress()
        this.copyTextToClipboard(this.vaultAddress, 'Vault address copied to clipboard')
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    },
    async refreshAndShowQrAddress () {
      try {
        await this.getReceiveAddress()
        this.addressQR = qrCode.create(this.vaultAddress)
        this.isShowingAddressQR = true
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.qrContainer
  width: '200px'
  height : '200px'

.minH
 height: 700px !important

.button
  min-width: 150px
</style>
