<template lang="pug">
#wrapperProofOfReserves
  .row
    //- Body
    .col-10.q-pr-md#Body
      //- Header
      .text-overline {{ $t('pages.nbv.proofOfReserves.proofOfReserves') }}
      #ProofOfReservesDetails(v-if="data.proofOfReserves")
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proofOfReserves.status') }}
        .text-body2 {{ labelStatus }}
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proofOfReserves.message') }}
        .text-body2 {{ data.proofOfReserves.message }}
      q-card#Empty(v-else)
        q-card-section
          .text-body2.text-center {{ $t('pages.nbv.proofOfReserves.emptyProofOfReserves') }}

      cosigners-list.q-mt-md(:cosigners="proposalCosigners")
    .col#rightMenu
      q-card
        q-card-section.actionsCard
          template(v-if="data.vault")
            .text-overline {{ $t('pages.nbv.vaults.threshold') }}
            .text-body2 {{ `${data.vault.threshold} of ${data.vault.cosigners.length} Multisignature` }}
            hr
          .text-overline Actions
          .q-gutter-y-sm
            q-btn.full-width.no-padding(
              v-if="data.vault"
              @click="onCreateProofOfReserves"
              :label="$t('pages.nbv.proofOfReserves.resetProofOfReserves')"
              color="secondary"
              no-caps
            )
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.signPSBT')"
              color="secondary"
              @click="modals.isShowingSignPsbt = true"
              icon="qr_code"
              no-caps
              v-if="false"
            )
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.signPSBTUsingHCD')"
              color="secondary"
              no-caps
              @click="modals.isShowingSignPsbtHCD = true"
              v-if="!alreadySigned && !isBroadcasted && isHCDLogged"
            )
            q-btn.full-width.no-padding(
              v-if="canFinalize && !isFinalized"
              :label="$t('pages.nbv.proposals.finalizeBtn')"
              color="secondary"
              icon="cloud_done"
              no-caps
              @click="finalizeProofOfR"
            )
            q-btn.full-width.no-padding(
              v-if="isFinalized"
              :label="$t('pages.nbv.proofOfReserves.verifyProofOfReserves')"
              color="secondary"
              icon="check"
              no-caps
              @click="verifyProofOfR"
            )
            q-btn.full-width.no-padding(
              v-if="isFinalized"
              :label="$t('pages.nbv.proofOfReserves.downloadPsbt')"
              color="secondary"
              icon="download"
              no-caps
              @click="downloadProofOfR"
            )
  #modals
    q-dialog(v-model="modals.isShowingVerifiedPsbt")
      q-card
        q-card-section
          .text-body2.text-bold.q-mb-sm {{ $t('pages.nbv.proofOfReserves.proofOfReservesResponse') }}
          .text-body2.text-weight-light.text-center.q-mt-md(style="fontSize: 2rem") {{ AmountUtils.formatToUSLocale(verificationResponse) }} sats

    q-dialog(v-model="modals.isShowingSignPsbt")
      q-card.modalSize.q-pa-sm
        sign-proposal-stepper(
          :psbt="data.proofOfReserves.psbt"
          :canFinalize="canFinalize"
          :canBroadcast="canBroadcast"
          :alreadySigned="alreadySigned"
          :isBroadcasted="isBroadcasted"
          :isFinalized="isFinalized"
          :vaultName="data.vault.description"
        )
    q-dialog(v-model="modals.isShowingSignPsbtHCD" persistent)
      q-card.modalSize.q-pa-sm
        sign-proposal-hcd(
          :psbt="data.proofOfReserves.psbt"
          :canFinalize="canFinalize"
          :canBroadcast="canBroadcast"
          :alreadySigned="alreadySigned"
          :isBroadcasted="isBroadcasted"
          :isFinalized="isFinalized"
          :vaultName="data.vault.description"
          @onSignPsbt="onSignPsbt"
          @onSavePsbt="savePsbt(signedPSBT)"
        )
          //- @onBroadcastPsbt="broadcastPsbt"
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from '~/mixins/errorHandler'
import { useProofOfReserves } from '~/composables'
import { useI18n } from 'vue-i18n'
import CosignersList from '~/components/nbv/proposals/cosigners-list'
import SignProposalStepper from '~/components/nbv/proposals/sign-proposal-stepper'
import SignProposalHcd from '~/components/nbv/proposals/sign-proposal-hcd'
import AmountUtils from '~/utils/AmountUtils'

const route = useRoute()
const $store = useStore()
const { t: $t } = useI18n()
const { showNotification, showLoading, hideLoading } = useNotifications()
const { handlerError } = useErrorHandler()
const {
  getProofOfReserves,
  createProofOfReserves,
  saveProofOfReservesPSBT,
  signPsbt,
  finalizeProofOfReserves,
  verifyProofOfReserves
} = useProofOfReserves()

// Data
const data = reactive({
  vault: undefined,
  proofOfReserves: undefined
})

const modals = reactive({
  isShowingSignPsbtHCD: false,
  isShowingSignPsbt: false,
  isShowingVerifiedPsbt: false
})

const signedPSBT = ref(undefined)
const verificationResponse = ref(undefined)

let unsub

onBeforeMount(() => {
  getVaultDetails()
  subscribeProofOfReserves()
})

onBeforeUnmount(() => {
  unsub()
  // if (unsub) unsub()
})

// Functions
async function getVaultDetails () {
  try {
    showLoading()
    const [vaultDetails] = await $store.$nbvStorageApi.getVaultsById({ Ids: [route.query.vault] })
    data.vault = vaultDetails.toHuman()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function subscribeProofOfReserves () {
  try {
    showLoading()
    unsub = await getProofOfReserves({ vaultId: route.query.vault }, updateData)
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function updateData (proofOfReserves) {
  try {
    showLoading()
    data.proofOfReserves = proofOfReserves.toHuman()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function onCreateProofOfReserves () {
  try {
    showLoading()
    const message = `proof_${data.vault.description}_proofOfReserves`
    const payload = {
      vaultId: route.query.vault,
      descriptors: {
        descriptor: data.vault.descriptors.outputDescriptor,
        change_descriptor: data.vault.descriptors.changeDescriptor
      },
      message
    }
    await createProofOfReserves(payload)
    showNotification({ message: $t('pages.nbv.proofOfReserves.createdProofOfReservesSuccessfully') })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function onSignPsbt ({ psbt, next }) {
  try {
    showLoading()
    signedPSBT.value = await signPsbt({ psbt, next })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function savePsbt (signedPSBT) {
  try {
    showLoading()
    const descriptors = {
      descriptor: data.vault.descriptors.outputDescriptor,
      change_descriptor: data.vault.descriptors.changeDescriptor
    }
    await saveProofOfReservesPSBT({
      psbt: signedPSBT,
      descriptors,
      vaultId: route.query.vault
      // isFinalized
    })
    modals.isShowingSignPsbtHCD = false
    showNotification({ message: $t('pages.nbv.proofOfReserves.psbtSavedSuccessfully') })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function finalizeProofOfR () {
  try {
    showLoading()
    const descriptors = {
      descriptor: data.vault.descriptors.outputDescriptor,
      change_descriptor: data.vault.descriptors.changeDescriptor
    }
    const psbts = data.proofOfReserves.signedPsbts.map(v => v.signature)
    await finalizeProofOfReserves({
      vaultId: route.query.vault,
      descriptors,
      psbts
    })
    showNotification({ message: $t('pages.nbv.proofOfReserves.finalizedProofOfReservesSuccessfully') })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function verifyProofOfR () {
  try {
    showLoading()
    const descriptors = {
      descriptor: data.vault.descriptors.outputDescriptor,
      change_descriptor: data.vault.descriptors.changeDescriptor
    }
    verificationResponse.value = await verifyProofOfReserves({
      descriptors,
      message: data.proofOfReserves.message,
      psbt: data.proofOfReserves.psbt
    })
    modals.isShowingVerifiedPsbt = true
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

function downloadProofOfR () {
  try {
    const fileName = `${data.vault.description}_${data.proofOfReserves.message}_Finalized`
    downloadPSBT(data.proofOfReserves.psbt, fileName)
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

function downloadPSBT (psbt, fileName) {
  const file = new Blob([psbt], { type: 'text/plain' })
  const fileURL = window.URL.createObjectURL(file)
  const downloadLink = document.createElement('a')
  downloadLink.href = fileURL
  downloadLink.download = `${fileName}.psbt`
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  window.URL.revokeObjectURL(fileURL)
  showNotification({ message: $t('pages.nbv.proofOfReserves.downloadedProofOfReservesSuccessfully') })
}

// Computed
const proposalCosigners = computed(() => {
  return data.vault?.cosigners?.map(cosigner => {
    return {
      address: cosigner,
      signed: data.proofOfReserves?.signedPsbts?.find(v => v.signer === cosigner)
    }
  })
})

const polkadotAddress = computed(() => $store.getters['profile/polkadotAddress'])
const isHCDLogged = computed(() => $store.getters['profile/isHCDLogged'])

const canFinalize = computed(() => {
  const signers = proposalCosigners.value?.filter(v => v.signed)
  return !!(signers?.length >= data.vault?.threshold)
})
const canBroadcast = computed(() => {
  // return !!(data.proofOfReserves?.status === 'Finalized')
  return false
})
const isBroadcasted = computed(() => {
  // return !!(data.proofOfReserves?.status === 'Broadcasted')
  return false
})
const isFinalized = computed(() => {
  return !!(data.proofOfReserves?.status === 'Broadcasted')
})
const alreadySigned = computed(() => {
  return !!data.proofOfReserves?.signedPsbts.find(v => v.signer === polkadotAddress.value)
})
const labelStatus = computed(() => {
  const status = data.proofOfReserves?.status
  if (canFinalize.value && status && status !== 'Broadcasted') {
    return $t('pages.nbv.proposals.readyToFinalize')
  }
  if (status === 'Broadcasted') {
    return 'Finalized'
  }
  if (status && status.ReadyToFinalize === true) {
    return $t('pages.nbv.proposals.finalizing')
  } else if (status && status.ReadyToFinalize === false) {
    return $t('pages.nbv.proposals.broadcasting')
  } else if (status === 'Pending') {
    return $t('pages.nbv.proposals.pendingStatus')
  }
  return status
})
//
</script>
