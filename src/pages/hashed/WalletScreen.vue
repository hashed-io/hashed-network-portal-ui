<template lang="pug">
#WalletScreen
    q-card(v-if="loading")
      q-card-section
        general-table-skeleton(:rowsNumber="5" :columnsNumber="3")
    q-card.q-mb-md(v-else-if="loaded" v-for="(vesting, index) in vestingList")
      q-card-section
        wallet-item(
          v-bind="vesting"
          :currentBlock="data.currentBlock"
          :isFirstElement="index === 0"
        )
    q-card(v-else)
      q-card-section
        .text-body2.text-center {{ $t('pages.hashed.wallet.emptyVestingList') }}

</template>

<script setup>
import { onBeforeMount, computed, ref, reactive, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useVesting } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import AmountUtils from '~/utils/AmountUtils'
import GeneralTableSkeleton from '~/components/common/skeletons/general-table-skeleton'
import WalletItem from '~/components/hashed/wallet/wallet-item'

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
  currentBlock: 1,
  vestingList: []
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
    loading.value = true
    showLoading()
    const vestingData = await getVestingData()
    data.vestingData = vestingData.find(v => v.polkadotAddress === selectedAccount.value)
    data.vestingList = await getVestingFromChainByAccount({ address: selectedAccount.value })
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
// const selectedAccount = ref('5EnLD4z5PUnmKZKZUZyiDNotLiRm2bBiPCNbVEMP63yPXWLJ')

const vestingList = computed(() => {
  return data.vestingList.map(vesting => {
    return {
      ...vesting,
      ...data.vestingData,
      contributionFund54: data.vestingData?.round1 | 0,
      contributionFund58: data.vestingData?.round2 | 0
    }
  })
})
</script>

<style lang="stylus" scoped>
.pieChart
    width: 50%
    // height: 70%
</style>
