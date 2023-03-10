import PolkadotApi from '~/services/polkadotApi'
import { useStore } from 'vuex'

export const useVesting = () => {
  const $store = useStore()

  const getVestingData = async () => {
    const data = await require('../services/hashed/const/vesting.json')
    return data
  }

  const getSavedVestingApiData = async () => {
    const fund54 = await require('../services/hashed/const/fund_54.json')
    const fund58 = await require('../services/hashed/const/fund_58.json')
    await new Promise(resolve => setTimeout(() => {
      resolve()
    }, 100))
    return { fund54, fund58 }
  }

  const getVestingFromChainByAccount = async ({ address }) => {
    const vesting = await $store.$vestingApi.getVestingByAccount({ address })
    const currentBlock = await $store.$vestingApi.getCurrentBlock()

    return vesting.map(v => {
      return {
        ...v,
        perBlock: v.perBlock.replaceAll(',', '') / (10 ** 18),
        locked: v.locked.replaceAll(',', '') / (10 ** 18),
        startingBlock: Number(v.startingBlock.replaceAll(',', '')),
        currentBlock
      }
    })
  }

  const subscribeToCurrentBlock = async (subTrigger) => {
    return $store.$vestingApi.getCurrentBlock(subTrigger)
  }

  return {
    getVestingData,
    getVestingFromChainByAccount,
    subscribeToCurrentBlock,
    getSavedVestingApiData
  }
}
