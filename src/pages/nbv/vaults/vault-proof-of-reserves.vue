<template lang="pug">
#wrapperProofOfReserves
  .row
    //- Body
    .col-10.q-pr-md#Body
      //- Header
      .text-overline {{ $t('pages.nbv.proofOfReserves.proofOfReserves') }}
      #ProofOfReservesDetails(v-if="data.proofOfReserves")
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proofOfReserves.status') }}
        .text-body2 {{ data.proofOfReserves.status }}
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proofOfReserves.message') }}
        .text-body2 {{ data.proofOfReserves.message }}
        //- .text-subtitle2.q-mt-md {{ $t('pages.nbv.proofOfReserves.psbt') }}
        //- .text-body2 {{ data.proofOfReserves.psbt }}
      cosigners-list.q-mt-md(:cosigners="proposalCosigners")
    .col#rightMenu
      q-card
        q-card-section.actionsCard
          .text-overline Actions
          .q-gutter-y-sm
            q-btn.full-width.no-padding(
              v-if="data.vault"
              @click="onCreateProofOfReserves"
              label="Create proof of reserves"
              color="secondary"
              no-caps
            )
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.signPSBT')"
              color="secondary"
              @click="modals.isShowingSignPsbt = true"
              icon="qr_code"
              no-caps
            )
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.signPSBTUsingHCD')"
              color="secondary"
              no-caps
              @click="modals.isShowingSignPsbtHCD = true"
              v-if="!alreadySigned && !isBroadcasted && isHCDLogged"
            )
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.proposals.finalizeBtn')"
              color="secondary"
              icon="cloud_done"
              no-caps
            )
  #modals
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
        )
          //- @onSavePsbt="(payload) => savePsbt(signedPsbt)"
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

const route = useRoute()
const $store = useStore()
const { t: $t } = useI18n()
const { showNotification, showLoading, hideLoading } = useNotifications()
const { handlerError } = useErrorHandler()
const {
  getProofOfReserves,
  createProofOfReserves,
  saveProofOfReservesPSBT,
  signPsbt
} = useProofOfReserves()

// Data
const data = reactive({
  vault: undefined,
  proofOfReserves: undefined
})

const modals = reactive({
  isShowingSignPsbtHCD: false,
  isShowingSignPsbt: false
})

let unsub

onBeforeMount(() => {
  getVaultDetails()
  subscribeProofOfReserves()
})

onBeforeUnmount(() => {
  unsub()
  console.log('unsub executed')
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
    console.log('unsub', unsub)
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function updateData (proofOfReserves) {
  try {
    showLoading()
    console.log('updateData', proofOfReserves.toHuman())
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
    const payload = {
      vaultId: route.query.vault,
      descriptors: {
        descriptor: data.vault.descriptors.outputDescriptor,
        change_descriptor: data.vault.descriptors.changeDescriptor
      },
      message: 'This is a test'
    }
    const response = await createProofOfReserves(payload)
    console.log('createProofOfReserves', response)
    showNotification({ message: $t('pages.nbv.proposals.psbtSavedSuccessfully') })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function onSignPsbt ({ psbt, next }) {
  try {
    showLoading()
    const signedPSBT = await signPsbt({ psbt, next })
    console.log('signedPSBT', signedPSBT)
    // next()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

// Computed
const proposalCosigners = computed(() => {
  return data.vault?.cosigners.map(cosigner => {
    return {
      address: cosigner,
      signed: data.proofOfReserves?.signedPsbts.find(v => v.signer === cosigner)
    }
  })
})

const polkadotAddress = computed(() => $store.getters['profile/polkadotAddress'])
const isHCDLogged = computed(() => $store.getters['profile/isHCDLogged'])

const canFinalize = computed(() => {
  const signers = proposalCosigners.value.filter(v => v.signed)
  return !!(signers.length >= data.vault.threshold)
})
const canBroadcast = computed(() => {
  return !!(data.proofOfReserves?.status === 'Finalized')
})
const isBroadcasted = computed(() => {
  return !!(data.proofOfReserves?.status === 'Broadcasted')
})
const isFinalized = computed(() => {
  return !!(data.proofOfReserves?.status === 'Finalized')
})
const alreadySigned = computed(() => {
  return !!data.proofOfReserves?.signedPsbts.find(v => v.signer === polkadotAddress.value)
})
//
</script>
