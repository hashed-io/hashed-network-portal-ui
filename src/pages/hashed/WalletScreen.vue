<template lang="pug">
#WalletScreen
  q-card()
    q-card-section(v-if="loading")
        general-table-skeleton(:rowsNumber="5" :columnsNumber="3")
    q-card-section(v-else-if="loaded")
      .row
        .col-3
            .text-body2.text-bold Current Block:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm # {{ AmountUtils.formatToUSLocale(data.currentBlock) }}
            .text-body2.text-bold Contributions:
            .text-body2.text-weight-light.q-mt-sm Fund 54: {{ AmountUtils.formatToUSLocale(data.vestingData?.round1) }} DOT
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm Fund 58: {{ AmountUtils.formatToUSLocale(data.vestingData?.round2) }} DOT
            .text-body2.text-bold Base Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.baseReward) }} HASH
            .text-body2.text-bold Bonus:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.vestingData?.bonusHash) }} HASH
        .col-3
            .text-body2.text-bold Total Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(data.locked) }} HASH
            .text-body2.text-bold HASH per block:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ data.perBlock }} HASH
            .text-body2.text-bold Vested to date:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(vestedToDate) }} HASH
            .text-body2.text-bold Remaining to vest:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(remainingToVest) }} HASH
        .col-6
            .row.justify-center
                Pie.pieChart(v-bind="pieChartConfig")
    q-card-section(v-else)
        .text-body2.text-center You don't have Hashed vesting

</template>

<script setup>
import { onBeforeMount, computed, ref, reactive, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useVesting } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import AmountUtils from '~/utils/AmountUtils'
import GeneralTableSkeleton from '~/components/common/skeletons/general-table-skeleton'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

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

const loaded = ref(true)
const loading = ref(true)

let unsubForCurrentBlock

// Logic
onBeforeMount(async () => {
  try {
    loadMyVestingData()
    unsubForCurrentBlock = await subscribeToCurrentBlock(head => {
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
    loaded.value = true
  } catch (e) {
    console.error(e)
    loaded.value = false
  } finally {
    hideLoading()
    loading.value = false
  }
}

const selectedAccount = computed(() => $store.getters['profile/polkadotAddress'])

const vestedToDate = computed(() => {
  return (data.currentBlock - data.startingBlock) * data.perBlock
})

const remainingToVest = computed(() => {
  return (data.locked - vestedToDate.value)
})

// Charts
const pieChartConfig = computed(() => {
  return {
    data: {
      labels: ['Vested to date', 'Remaining to vest'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#00D8FF'],
          data: [vestedToDate.value, remainingToVest.value]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }
})
</script>

<style lang="stylus" scoped>
.pieChart
    width: 50%
    // height: 70%
</style>
