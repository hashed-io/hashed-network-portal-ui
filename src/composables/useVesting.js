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
    const api = new PolkadotApi(process.env.WSS_PARACHAIN)
    try {
      await api.connect()
      const vestingApi = new VestingApi(api, showNotification)
      const vesting = await vestingApi.getVestingByAccount({ address })
      console.log('getVestingFromChainByAccount', vesting)
    // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e
    } finally {
      await api.disconnect()
    }
  }

  return {
    getVestingData,
    getVestingFromChainByAccount
  }
}
