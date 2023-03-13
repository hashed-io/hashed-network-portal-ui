import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from 'src/mixins/errorHandler'
import { useI18n } from 'vue-i18n'

export const usePSBT = () => {
  // Use composables
  const { t: $t } = useI18n()
  const $store = useStore()
  const {
    showNotification,
    showLoading,
    hideLoading
  } = useNotifications()
  const { handlerError } = useErrorHandler()

  // Data
  const signedPSBT = ref(undefined)
  const data = reactive({})
  const vaultInfo = reactive(undefined)

  // Functions
  async function signPsbt ({ psbt, next }) {
    try {
      showLoading()
      const _signedPSBT = await $store.$hcd.signPSBT({ psbt })
      signedPSBT.value = _signedPSBT
      if (next) next()
    } catch (e) {
      handlerError(e)
    } finally {
      hideLoading()
    }
  }

  async function finalizePsbt () {
    try {
      showLoading()
      //   await $store.$nbvStorageApi.finalizePsbt({
      //     proposalId: proposalId,
      //     signer: polkadotAddress,
      //     broadcast: true
      //   })
      //   isShowingSignPsbt = false
      showNotification({ message: 'Finalized' })
      await updateProposal()
      setTimeout(this.updateProposal(), 5000)
    } catch (e) {
      this.handlerError(e)
    } finally {
      this.hideLoading()
    }
  }

  function syncData (proposal) {
    data.vaultId = proposal.vaultId
    data.proposalId = proposal.proposalId
    data.toAddress = proposal.toAddress
    data.status = proposal.status
    data.description = proposal.description
    data.amount = proposal.amount
    data.proposer = proposal.proposer
    data.feeSatPerVb = proposal.feeSatPerVb
    data.offchainStatus = proposal.offchainStatus
    data.txId = proposal.txId
    data.psbt = proposal.psbt
    data.signedPsbts = proposal.signedPsbts
    // handlerOffchainStatus(this.offchainStatus)
  }

  async function updateProposal () {
    try {
      showLoading({ message: $t('pages.nbv.proposals.updatingProposal') })
      const proposalId = 'You have to define this before'
      const proposal = await $store.$nbvStorageApi.getProposalsById({ Ids: [proposalId] })
      syncData({
        ...proposal[0].toHuman(),
        proposalId: this.proposalId,
        threshold: this.threshold
      })
    } catch (e) {
      this.handlerError(e)
    } finally {
      this.hideLoading()
    }
  }

  /// Currently used
  /**
   * @param {String} psbt Text PSBT
   */
  async function saveProofOfReservesPSBT (psbt) {
    showLoading()
    const signers = await $store.$bdkApi.getListSigner({
      descriptors: {
        descriptor: vaultInfo.descriptors.outputDescriptor,
        change_descriptor: vaultInfo.descriptors.changeDescriptor
      },
      psbt
    })
    const userXPub = await _getXpub()
    if (!_isValidSignature(signers, userXPub)) {
      console.error('Not valid signatures', { signers, userXPub })
      showNotification({ message: this.$t('pages.nbv.proposals.signThePsbtWithValidXPUB'), color: 'negative' })
      return
    }
    showLoading()
    //   await $store.$nbvStorageApi.savePsbt({
    //     proposalId: this.proposalId,
    //     signer: this.polkadotAddress,
    //     psbt
    //   })
    showNotification({ message: $t('pages.nbv.proposals.psbtSavedSuccessfully') })
  }

  async function _getXpub () {
    try {
      const polkadotAddress = 'you need add this before'
      showLoading()
      let userXpub
      const xpubId = await $store.$nbvStorageApi.getXpubByUser(polkadotAddress)
      if (xpubId && xpubId.value) {
        const xpub = await $store.$nbvStorageApi.getXpubById(xpubId.value)
        userXpub = xpub.isEmpty ? undefined : xpub.value
      }
      return userXpub.toHuman()
    } catch (e) {
      handlerError(e)
      return undefined
    } finally {
      hideLoading()
    }
  }

  function _isValidSignature (signers, xpub) {
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
  }
}
