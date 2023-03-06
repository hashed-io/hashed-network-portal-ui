<template lang="pug">
#WalletScreen
  q-card(v-if="data.vestingData")
    q-card-section
      .row
        .col-6
            .text-body2.text-bold Contributions:
            .text-body2.text-weight-light.q-mt-sm Fund 54: {{ AmountUtils.formatToUSLocale(data.vestingData?.round1) }} DOT
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm Fund 58: {{ AmountUtils.formatToUSLocale(data.vestingData?.round2) }} DOT
            .text-body2.text-bold Base Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.baseReward) }} HASH
            .text-body2.text-bold Bonus:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.bonusHash) }} HASH
            .text-body2.text-bold Total Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.totalReward) }} HASH
        .col-6
            .text-body2.text-bold HASH per block:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ data.vestingData?.hashPerBlock }} HASH
            .text-body2.text-bold Remaining to vest:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ data.vestingData?.hashPerBlock }} HASH
            .text-body2.text-bold Vested to date:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ data.vestingData?.hashPerBlock }} HASH
</template>

<script setup>
import { onBeforeMount, computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useVesting } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import AmountUtils from '~/utils/AmountUtils'

// Use composables
const {
  showNotification,
  showLoading,
  hideLoading,
  copyTextToClipboard
} = useNotifications()

const { getVestingData, getVestingFromChainByAccount } = useVesting()

const $store = useStore()

// Data
const data = reactive({
  vestingData: undefined
})

// Logic
onBeforeMount(() => {
  loadMyVestingData()
})

const loadMyVestingData = async () => {
  try {
    showLoading()
    const vestingData = await getVestingData()
    data.vestingData = vestingData.find(v => v.polkadotAddress === selectedAccount.value)
    console.log('loadMyVestingData', data.vestingData)
    const fromChain = await getVestingFromChainByAccount({ address: selectedAccount.value })
    console.log('fromChain', fromChain)
  } catch (e) {
    console.error(e)
  } finally {
    hideLoading()
  }
}

const selectedAccount = computed(() => $store.getters['profile/polkadotAddress'])
// -
</script>
