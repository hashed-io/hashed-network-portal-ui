<template lang="pug">
#wrapperProofOfReserves
    //- Header
    .text-overline {{ $t('pages.nbv.vaults.proofOfReserves') }}
    q-btn(
        label="Create proof of reserves"
        v-if="data.vault"
        @click="createProofOfReserves"
    )
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from '~/mixins/errorHandler'

const route = useRoute()
const store = useStore()
const { showNotification, showLoading, hideLoading } = useNotifications()
const { handlerError } = useErrorHandler()
// Data
const data = reactive({
  vault: undefined
})

onBeforeMount(() => {
  loadProofOfReserves()
})

async function loadProofOfReserves () {
  try {
    showLoading()
    const [vaultDetails] = await store.$nbvStorageApi.getVaultsById({ Ids: [route.query.vault] })
    data.vault = vaultDetails.toHuman()
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}

async function createProofOfReserves () {
  try {
    showLoading()
    const response = await store.$bdkApi.createProofOfReserves({
      descriptors: {
        descriptor: data.vault.descriptors.outputDescriptor,
        change_descriptor: data.vault.descriptors.changeDescriptor
      },
      message: 'This is a test'
    })
    console.log('createProofOfReserves', response)
  } catch (e) {
    handlerError(e)
  } finally {
    hideLoading()
  }
}
</script>
