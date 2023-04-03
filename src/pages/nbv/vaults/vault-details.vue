<template lang="pug">
#container(v-if="$route.params && $route.params.vault")
  .row
    .col-10.q-pr-md
      //- Error Banner
      banner.q-mb-md(v-if="data.offchainMessage" v-bind="data.offchainMessage" )
      //- Action Btn
      q-page-sticky(position="bottom-right" :offset="[18, 18]")
        q-btn(fab icon="refresh" color="secondary" @click="updateVault")
          q-tooltip(self="bottom left" anchor="top left" :offset="[10, 10]") {{ $t('pages.nbv.actions.refresh') }}
      //- Header
      .text-overline {{ $t('pages.nbv.vaults.vaultDetails') }}
      .row.justify-between.q-mb-md
        .text-h4 {{ data.description }}
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
      account-item(:address="data.owner")
      .text-subtitle2.q-mt-md {{ $t('pages.nbv.vaults.cosigners') }}
      .q-gutter-sm(v-for="cosigner in data.cosigners")
        account-item.q-mt-md(:address="cosigner")
      .text-subtitle2.q-mt-md(v-if="data.outputDescriptor") {{ $t('pages.nbv.vaults.receiveAddress') }}
      .row.center-items(v-if="data.outputDescriptor")
        .col-9.q-mr-md
          q-card
            q-item
              q-item-label.text-body2(lines="1" v-if="data.vaultAddress") {{ data.vaultAddress }}
              q-item-label.text-body2(lines="1" v-else) Retrieving...
        .col
         .column.q-gutter-xs
          q-btn(
            :label="$t('pages.nbv.vaults.refreshAndShowQrAddress')"
            no-caps
            color="secondary"
            @click="refreshAndShowQrAddress"
          )
          q-btn(
            :label="$t('pages.nbv.vaults.refreshAndCopyAddress')"
            no-caps
            color="secondary"
            @click="refreshAndCopyAddress"
          )
      .text-subtitle2.q-mt-md(v-if="data.outputDescriptor") {{ $t('pages.nbv.vaults.outputDescriptor') }}
      .row.q-pa-xs(v-if="data.outputDescriptor")
        .col-9.q-mr-md
          q-card
            q-item
              q-item-section
                q-item-label.text-body2(lines="1") {{ data.outputDescriptor }}
        .col
          q-btn.full-width(
            :label="$t('pages.nbv.actions.copyToClipboard')"
            no-caps
            color="secondary"
            @click="copyTextToClipboard(data.outputDescriptor, 'Output Descriptor copied to clipboard')"
          )
      //- Proposals
      #proofOfReserves.row.justify-between.items-center.q-mt-lg.q-mb-sm
        .text-subtitle2.q-mt-md Proof of Reserves
      proof-of-reserves-list(
        :proofOfReserves="data.proofOfReserves"
        @onProofOfReservesSelected="goToProofOfReserves"
        @onCreateProofOfReserves="onCreateProofOfReserves"
        :disabled="!data.outputDescriptor || (!data.balance || data.balance <= 0)"
        :isSupported="isHCDLogged"
      )
      #proposals.row.justify-between.items-center.q-mt-lg.q-mb-sm
        .text-subtitle2.q-mt-md {{ $t('pages.nbv.proposals.proposals') }}
      proposals-list(:proposals="data.proposalsList" @onProposalSelected="goToProposalDetails")
      #modals
        q-dialog(v-model="data.isShowingCreateProposal" persistent)
          q-card.modalSize.minH
            create-proposal-form(@submittedForm="createNewProposal" :currentBalance="data.balance")
        q-dialog(v-model="data.isShowingVaultQR")
          q-card.modalSize.q-pa-sm
            .text-body2.text-weight-light.q-ml-sm.text-center.q-mt-sm {{ $t('pages.nbv.vaults.descriptorQr') }}
            .row
              .col
                div.qrContainer(v-html="data.vaultQR")
                q-btn.full-width.q-mx-md(
                  icon="content_copy"
                  :label="$t('pages.nbv.actions.copyToClipboard')"
                  flat
                  size="md"
                  no-caps
                  @click="copyTextToClipboard(data.vaultQrText, 'Descriptor copied to clipboard')"
                )
              .col
                .text-bold.q-mt-sm Note:
                  span.text-body2.q-ml-sm You have to import this vault on Blue Wallet to co-sign transactions.

                .text-bold.q-mt-md How to import vault on Blue Wallet:
                ol
                  li Go to Home screen in Blue Wallet.
                  li Tap on ➕ button positioned on top right corner.
                  li Top on "Import wallet" button.
                  li Tap on "Scan or import a file".
                  li Scan this qr from Blue Wallet.

                .text-bold.q-mt-sm Note:
                  span.text-body2.q-ml-sm After import the vault on Blue Wallet you have to import the seed for your XPUB.
                .text-bold.q-mt-md How to import the seed for your XPUB:
                ol
                  li Go to Home screen in Blue Wallet.
                  li Tap on
                    span.text-bold.q-ml-sm '{{ data.description }}'
                      span.q-ml-sm.text-weight-regular vault.
                  li Tap on 'Manage Keys' button.
                  li Find your Xpub key
                    span.text-bold.q-ml-sm '{{ data.xpubForBW }}'
                      span.q-ml-sm.text-weight-regular on the cosigner list and tap on 'I have a seed for this key'.
                  li Write or paste your seed.
                  li Tap on "Import" button.
                  li Tap on "Save" button.

        q-dialog(v-model="data.isShowingAddressQR")
          q-card.modalQrSize.q-pa-sm
            .text-body2.text-weight-light.q-ml-sm.text-center.q-mt-sm {{ $t('pages.nbv.vaults.receiveAddress') }}
            div.qrContainer(v-html="data.addressQR")
    .col
      q-card.actionsCard
        q-card-section
          .text-overline {{ $t('pages.nbv.vaults.balance') }}
            .row
              q-icon.q-mr-md(name="fak fa-satoshisymbol-solid" size="sm" color="secondary")
              .text-subtitle2 {{ data.balance || 0 }} Sats
          hr
          .text-overline {{ $t('pages.nbv.vaults.threshold') }}
          .text-body2 {{ `${data.threshold} of ${data.cosigners.length} Multisignature` }}
          hr
          //- .text-overline {{ $t('pages.nbv.proofOfReserves.proofOfReserves') }}
          //-   q-btn.full-width.no-padding(
          //-     :label="$t('pages.nbv.proofOfReserves.goToProofOfReserves')"
          //-     color="secondary"
          //-     no-caps
          //-     :to="{ name: 'vaultProofOfReserves', query: { vault: data.vaultId } }"
          //-   )
          .text-overline.q-mt-xs Actions
          .q-gutter-y-sm
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.vaults.exportDescriptor')"
              color="secondary"
              icon="qr_code"
              no-caps
              @click="exportVault"
              :disabled="!data.outputDescriptor"
            )
              //- icon="qr_code"
              q-tooltip(v-if="!data.outputDescriptor") {{ $t('pages.nbv.vaults.pending') }}
            #btnCreateProposal
              q-btn.full-width.no-padding(
                :label="$t('pages.nbv.proposals.createProposal')"
                :color="(!data.balance || data.balance <= 0) ? 'grey' : 'positive'"
                no-caps
                icon="add"
                @click="data.isShowingCreateProposal = true"
                :disabled="!data.balance || data.balance <= 0"
              )
              //- icon="add"
              q-tooltip(v-if="!data.balance || data.balance <= 0") {{ $t('pages.nbv.vaults.vaultsBalanceMustBeGreaterThanZero') }}
            q-btn.full-width.no-padding(
              :label="$t('pages.nbv.vaults.deleteVault')"
              color="negative"
              no-caps
              outline
              @click="removeVault"
              v-if="data.iAmOwner"
              icon="delete"
            )
              //- icon="delete"
</template>

<script setup>
import { reactive, ref, onBeforeMount, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapGetters, useStore } from 'vuex'
import { AccountItem, Banner } from '~/components/common'
import CreateProposalForm from '~/components/nbv/proposals/create-proposal-form'
import ProposalsList from '~/components/nbv/proposals/proposals-list'
import ProofOfReservesList from '~/components/nbv/proofOfReserves/proof-of-reserves-list'
import { Encoder, QRCode } from '@smontero/nbv-ur-codec'
import { useProofOfReserves } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from '~/mixins/errorHandler'
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line no-var
var interval
const qrCode = new QRCode()
// eslint-disable-next-line no-var
var unsubProofOfReserves

const $store = useStore()
const $route = useRoute()
const $router = useRouter()
const { t: $t } = useI18n()

const { showNotification, showLoading, hideLoading, copyTextToClipboard } = useNotifications()
const { handlerError } = useErrorHandler()

const {
  getProofOfReserves,
  createProofOfReserves
} = useProofOfReserves()

const data = reactive({
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
  proposalsList: [],
  proofOfReserves: undefined
})
// Computed
const polkadotAddress = computed(() => $store.getters['profile/polkadotAddress'])

const xpubForBW = computed(() => {
  const xpub = $store.getters['profile/xpub']
  return `${xpub.substr(23, 5)}...${xpub.substr(-5)}`
})

const iAmOwner = computed(() => {
  return polkadotAddress.value === data.owner
})

const isOffchainError = computed(() => {
  return !!(data.offchainMessage && data.offchainMessage.status === 'error')
})

const validationMessage = computed(() => {
  if (data.offchainStatus) {
    if (data.offchainStatus.status && data.offchainMessage.status === 'pending') {
      return 'Pending'
    } else if (data.offchainMessage.message) {
      return data.offchainMessage.message
    }
  }
  return undefined
})

// watch(selectedAccount, () => {
//   $router.replace({
//     name: 'manageVaults'
//   })
// })

onBeforeMount(async () => {
  try {
    // debugger
    // this.$router.push({ path: '/vaults' })
    const params = $route.params
    if (!params || params === {} || !params.vault) {
      $router.push({ path: '/vaults' })
      return
    }
    const vault = JSON.parse(params.vault)
    if (!vault || !vault.owner || !vault.vaultId) {
      $router.replace({ name: 'manageVaults' })
      return
    }
    syncData(vault)
    getReceiveAddress()
    // this.$route.meta.breadcrumb[1].name = 'Detailsss'

    unsubProofOfReserves = await getProofOfReserves({ vaultId: data.vaultId }, (v) => {
      const proofOfReserves = v?.toHuman()
      if (!proofOfReserves) return
      data.proofOfReserves = {
        ...proofOfReserves,
        threshold: data.threshold,
        vaultId: data.vaultId
      }
    })

    interval = setInterval(() => {
      if (data.offchainMessage) {
        updateVault()
      } else {
        clearInterval(interval)
      }
    }, 10000)
  } catch (e) {
    handlerError(e)
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
  if (unsubProofOfReserves) unsubProofOfReserves()
})

async function onCreateProofOfReserves () {
  try {
    showLoading()
    const message = `proof_${data.description}_proofOfReserves`
    const payload = {
      vaultId: data.vaultId,
      descriptors: {
        descriptor: data.descriptors.outputDescriptor,
        change_descriptor: data.descriptors.changeDescriptor
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

function goToProofOfReserves () {
  $router.push({ name: 'vaultProofOfReserves', query: { vault: data.vaultId } })
}

async function updateVault () {
  try {
    showLoading({ message: $t('pages.nbv.proposals.updatingProposal') })
    const vault = await $store.$nbvStorageApi.getVaultsById({ Ids: [data.vaultId] })
    syncData({
      ...vault[0].toHuman(),
      vaultId: data.vaultId
    })
    await getReceiveAddress()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}
function syncData (vault) {
  data.vaultId = vault.vaultId
  data.owner = vault.owner
  data.description = vault?.description
  data.threshold = vault?.threshold
  data.cosigners = vault?.cosigners
  data.descriptors = vault?.descriptors
  data.outputDescriptor = vault?.descriptors?.outputDescriptor
  data.changeDescriptor = vault?.descriptors?.changeDescriptor
  data.offchainStatus = vault?.offchainStatus
  handlerOffchainStatus(data.offchainStatus)
  getProposals()
  if (data.vaultId && data.outputDescriptor) {
    getBalance()
  }
}

async function getBalance () {
  try {
    const balance = await $store.$bdkApi.getBalance({
      descriptor: data.outputDescriptor,
      changeDescriptor: data.changeDescriptor
    })
    data.balance = balance
  } catch (e) {
    handlerError(e)
  }
}

async function removeVault () {
  try {
    showLoading()
    await $store.$nbvStorageApi.removeVault({
      id: data.vaultId,
      user: polkadotAddress
    })
    $router.replace({
      name: 'manageVaults'
    })
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}
async function exportVault () {
  try {
    showLoading()
    if (!data.vaultQR) {
      const _data = await $store.$bdkApi.getMultisig({
        descriptor: data.outputDescriptor
      })
      const encoder = new Encoder()
      const text = encoder.encodeVault(_data, data.description)
      const result = encoder.vaultToQRCode(_data, data.description)
      data.vaultQR = result
      data.vaultQrText = text
    }
    data.isShowingVaultQR = true
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function getReceiveAddress () {
  try {
    if (!data.outputDescriptor) return
    showLoading()
    const _data = await $store.$bdkApi.getNewAddress({
      descriptor: data.outputDescriptor
    })
    data.vaultAddress = _data
    if (!_data || _data === undefined) {
      setTimeout(getReceiveAddress(), 2000)
    }
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function createNewProposal (payload) {
  try {
    showLoading()
    await $store.$nbvStorageApi.createProposal({
      vaultId: data.vaultId,
      signer: polkadotAddress,
      recipientAddress: payload.recipientAddress,
      satoshiAmount: payload.amountInSats,
      description: payload.description
    })
    data.isShowingCreateProposal = false
    showNotification({ message: $t('pages.nbv.proposals.proposalCreated') })
    getProposals()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function getProposals () {
  try {
    showLoading()
    const proposalsIds = await $store.$nbvStorageApi.getProposalsByVault({ vaultId: data.vaultId })
    if (!proposalsIds.isEmpty) {
      const Ids = proposalsIds.toJSON()
      const proposals = await $store.$nbvStorageApi.getProposalsById({ Ids })
      data.proposalsList = proposals.map((v, i) => {
        return {
          ...v.toHuman(),
          proposalId: Ids[i],
          threshold: data.threshold
        }
      })
    } else data.proposalsList = []
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

function goToProposalDetails (proposal) {
  const parentParams = {
    vaultId: data.vaultId,
    owner: data.owner,
    description: data.description,
    descriptors: data.descriptors,
    threshold: data.threshold,
    cosigners: data.cosigners,
    outputDescriptor: data.outputDescriptor,
    changeDescriptor: data.changeDescriptor,
    offchainStatus: data.offchainStatus
  }
  const JsonParams = JSON.stringify(parentParams)
  const ProposalParams = JSON.stringify(proposal)
  $router.push({
    name: 'proposalDetails',
    params: {
      parentParams: JsonParams,
      proposalParams: ProposalParams
    }
  })
}

function handlerOffchainStatus (offchainStatus) {
  if (offchainStatus.IrrecoverableError) {
    data.offchainMessage = {
      message: offchainStatus.IrrecoverableError,
      status: 'error'
    }
  } else if (offchainStatus.toLowerCase() === 'pending') {
    data.offchainMessage = {
      message: $t('pages.nbv.vaults.creatingDescriptor'),
      status: 'loading'
    }
  } else if (offchainStatus.toLowerCase() === 'valid') {
    data.offchainMessage = undefined
  }
}

async function refreshAndCopyAddress () {
  try {
    await getReceiveAddress()
    copyTextToClipboard(data.vaultAddress, 'Vault address copied to clipboard')
  } catch (e) {
    handlerError(e)
  }
}

async function refreshAndShowQrAddress () {
  try {
    await getReceiveAddress()
    data.addressQR = qrCode.create(data.vaultAddress)
    data.isShowingAddressQR = true
  } catch (e) {
    handlerError(e)
  }
}

const isHCDLogged = computed(() => $store.getters['profile/isHCDLogged'])
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
