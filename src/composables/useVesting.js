import PolkadotApi from '~/services/polkadotApi'
import { VestingApi } from '~/services/polkadot-pallets'
import { useNotifications } from '~/mixins/notifications'

export const useVesting = () => {
  const {
    showNotification
  } = useNotifications()

  const getVestingData = async () => {
    const data = await require('../services/hashed/const/vesting.json')
    return data
  }

  const getVestingFromChainByAccount = async ({ address }) => {
    const polkadotApi = new PolkadotApi(process.env.WSS_PARACHAIN)
    try {
      await polkadotApi.connect()
      const vestingApi = new VestingApi(polkadotApi, showNotification)
      const vesting = await vestingApi.getVestingByAccount({ address })
      const currentBlock = await vestingApi.getCurrentBlock()

      return vesting.map(v => {
        return {
          ...v,
          perBlock: v.perBlock.replaceAll(',', '') / (10 ** 18),
          locked: v.locked.replaceAll(',', '') / (10 ** 18),
          startingBlock: Number(v.startingBlock.replaceAll(',', '')),
          currentBlock
        }
      })
    // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e
    } finally {
      await polkadotApi.disconnect()
    }
  }

  const subscribeToCurrentBlock = async (subTrigger) => {
    const polkadotApi = new PolkadotApi(process.env.WSS_PARACHAIN)
    await polkadotApi.connect()
    const vestingApi = new VestingApi(polkadotApi, showNotification)
    return vestingApi.getCurrentBlock(subTrigger)
  }

  return {
    getVestingData,
    getVestingFromChainByAccount,
    subscribeToCurrentBlock
  }
}
