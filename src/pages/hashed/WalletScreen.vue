<template lang="pug">
#WalletScreen
  q-card(v-if="data.vestingData")
    q-card-section
      .row
        .col-6
            .text-body2.text-bold Current Block:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm # {{ AmountUtils.formatToUSLocale(data.currentBlock) }}
            .text-body2.text-bold Contributions:
            .text-body2.text-weight-light.q-mt-sm Fund 54: {{ AmountUtils.formatToUSLocale(data.vestingData?.round1) }} DOT
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm Fund 58: {{ AmountUtils.formatToUSLocale(data.vestingData?.round2) }} DOT
            .text-body2.text-bold Base Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.baseReward) }} HASH
            .text-body2.text-bold Bonus:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.bonusHash) }} HASH
        .col-6
            .text-body2.text-bold Total Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.locked) }} HASH
            .text-body2.text-bold HASH per block:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ data.perBlock }} HASH
            .text-body2.text-bold Vested to date:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(vestedToDate) }} HASH
            .text-body2.text-bold Remaining to vest:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(remainingToVest) }} HASH
</template>

<script setup>
import { onBeforeMount, computed, ref, reactive, onBeforeUnmount } from 'vue'
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

const { getVestingData, getVestingFromChainByAccount, subscribeToCurrentBlock } = useVesting()

const $store = useStore()

// Data
const data = reactive({
  vestingData: undefined,
  perBlock: undefined,
  startingBlock: undefined,
  currentBlock: undefined,
  locked: undefined
})

let unsubForCurrentBlock

// Logic
onBeforeMount(() => {
  try {
    loadMyVestingData()
    unsubForCurrentBlock = subscribeToCurrentBlock(head => {
      const { number } = head.toHuman()
      data.currentBlock = parseFloat(number.replaceAll(',', ''))
    })
  } catch (e) {
    console.error(e)
  }
})

onBeforeUnmount(() => {
  try {
    unsubForCurrentBlock()
  } catch (e) {
    console.error(e)
  }
})

const loadMyVestingData = async () => {
  try {
    showLoading()
    const vestingData = await getVestingData()
    data.vestingData = vestingData.find(v => v.polkadotAddress === selectedAccount.value)
    const fromChain = await getVestingFromChainByAccount({ address: selectedAccount.value })
    data.perBlock = fromChain.perBlock
    data.startingBlock = fromChain.startingBlock
    data.currentBlock = fromChain.currentBlock
    data.locked = fromChain.locked
  } catch (e) {
    console.error(e)
  } finally {
    hideLoading()
  }
}

const selectedAccount = computed(() => $store.getters['profile/polkadotAddress'])

const vestedToDate = computed(() => {
  return (data.currentBlock - data.startingBlock) * data.perBlock
})

const remainingToVest = computed(() => {
  return (data.locked - vestedToDate.value)
})
// -
</script>
