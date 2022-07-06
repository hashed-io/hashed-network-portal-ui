/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi'
import { NbvStorageApi, MarketplaceApi } from '~/services/polkadot-pallets'
import BdkApi from '~/services/bdk/bdkApi'
import { showGlobalLoading, hideGlobalLoading, showGlobalNotification } from '~/mixins/notifications'

export default async ({ app, store }) => {
  try {
    showGlobalLoading({
      message: 'Connecting with server'
    })
    const api = new PolkadotApi()
    const bdkApi = new BdkApi()
    await api.connect()
    console.log('PolkadotApiCreated', api)
    // const treasuryApi = new TreasuryApi(api, showGlobalLoading)
    const nbvStorageApi = new NbvStorageApi(api, showGlobalLoading)
    const marketplaceApi = new MarketplaceApi(api, showGlobalLoading)
    store['$polkadotApi'] = api
    store['$nbvStorageApi'] = nbvStorageApi
    store['$marketplaceApi'] = marketplaceApi
    store['$bdkApi'] = bdkApi
    store['$connectedToServer'] = true
  } catch (e) {
    store['$connectedToServer'] = false
    showGlobalNotification({ message: e.message || e, color: 'negative' })
  } finally {
    hideGlobalLoading()
  }
}
