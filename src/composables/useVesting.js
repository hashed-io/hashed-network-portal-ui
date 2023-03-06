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
      const [vesting] = await vestingApi.getVestingByAccount({ address })
      const currentBlock = await vestingApi.getCurrentBlock()
      return {
        ...vesting,
        perBlock: vesting.perBlock.replaceAll(',', '') / (10 ** 18),
        locked: vesting.locked.replaceAll(',', '') / (10 ** 18),
        currentBlock
      }
    // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e
    } finally {
      await polkadotApi.disconnect()
    }
  }

  return {
    getVestingData,
    getVestingFromChainByAccount
  }
}
