import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useProofOfReserves = () => {
  // Use composables
  const $store = useStore()

  // Data
  const data = reactive({})

  // Functions
  /**
   * @param {String} psbt Text PSBT
   */
  async function saveProofOfReservesPSBT ({ psbt, descriptors, vaultId, isFinalized }) {
    const signers = await $store.$bdkApi.getListSigner({
      descriptors,
      psbt
    })
    const userXPub = await _getXpub()

    if (!_isValidSignature(signers, userXPub)) {
      console.error('Not valid signatures', { signers, userXPub })
      const e = 'Not valid signatures:'
      throw new Error(e)
      //   showNotification({ message: this.$t('pages.nbv.proposals.signThePsbtWithValidXPUB'), color: 'negative' })
      //   return
    }
    return $store.$nbvStorageApi.saveProofOfReservesPSBT({ vaultId, psbt, isFinalized })
  }

  async function getProofOfReserves ({ vaultId }, subTrigger) {
    const result = await $store.$nbvStorageApi.getProofOfReservesByVault({ vaultId, subTrigger })
    if (subTrigger) return result
    return result.toHuman()
  }

  async function createProofOfReserves ({ vaultId, descriptors, message }) {
    const { data: psbt } = await $store.$bdkApi.createProofOfReserves({
      descriptors,
      message
    })
    console.log('psbt', psbt)
    return $store.$nbvStorageApi.createProofOfReserves({ vaultId, message, psbt })
  }

  async function _getXpub () {
    try {
      const polkadotAddress = $store.getters['profile/polkadotAddress']
      //   showLoading()
      let userXpub
      const xpubId = await $store.$nbvStorageApi.getXpubByUser(polkadotAddress)
      if (xpubId && xpubId.value) {
        const xpub = await $store.$nbvStorageApi.getXpubById(xpubId.value)
        userXpub = xpub.isEmpty ? undefined : xpub.value
      }
      return userXpub.toHuman()
    } catch (e) {
    //   handlerError(e)
      return undefined
    } finally {
    //   hideLoading()
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

  async function signPsbt ({ psbt, next }) {
    console.log('signPsbt', { psbt, next })
    const signedPSBT = await $store.$hcd.signPSBT({ psbt })
    if (next) next()
    return signedPSBT
  }

  async function finalizeProofOfReserves ({ descriptors, psbts }) {
    const { data } = await $store.$bdkApi.finalizeProofOfReserves({
      descriptors,
      psbts
    })
    return data
    // return $store.$nbvStorageApi.createProofOfReserves({ vaultId, message, psbt })
  }

  return {
    createProofOfReserves,
    getProofOfReserves,
    saveProofOfReservesPSBT,
    signPsbt,
    finalizeProofOfReserves
  }
}
