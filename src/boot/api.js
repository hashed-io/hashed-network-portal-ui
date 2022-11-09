/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi'
import { MarketplaceApi, FruniquesApi, UniquesApi } from '~/services/polkadot-pallets'
// import { NbvStorageApi, MarketplaceApi, FruniquesApi, UniquesApi } from '~/services/polkadot-pallets'
import BdkApi from '~/services/bdk/bdkApi'
import HashedPrivateApi from '~/services/HashedPrivateApi'
import ConfidentialDocs from '~/services/confidential-docs/confidential-docs'
import { showGlobalLoading, hideGlobalLoading, showGlobalNotification } from '~/mixins/notifications'

// const { NbvStorageApi } = require('../../../nbv-client-api')
import { NbvStorageApi } from '@jmgayosso/nbv-client-api'

// const { AfloatApi } = require('../../../afloat-client-api')
import { AfloatApi } from '@jmgayosso/afloat-client'
export default async ({ app, store }) => {
  try {
    showGlobalLoading({
      message: 'Connecting with server'
    })
    const api = new PolkadotApi()
    const bdkApi = new BdkApi()
    await api.connect()
    // const treasuryApi = new TreasuryApi(api, showGlobalLoading)
    // const nbvStorageApi = new NbvStorageApi(api, showGlobalLoading)
    const palletId = process.env.GATED_PALLET_ID
    const marketplaceApi = new MarketplaceApi(api, showGlobalLoading, palletId)
    const fruniquesApi = new FruniquesApi(api, showGlobalLoading)
    const uniquesApi = new UniquesApi(api, showGlobalLoading)
    // Connect Hashed private service
    const ipfsAuthHeader = `Basic ${Buffer.from(`${process.env.IPFS_PROJECT_ID}:${process.env.IPFS_PROJECT_SECRET}`).toString('base64')}`
    hideGlobalLoading()
    showGlobalLoading({
      message: 'Connecting with Hashed Private Server'
    })
    try {
      const hashedPrivateApi = new HashedPrivateApi({
        ipfsURL: process.env.IPFS_URL,
        ipfsAuthHeader,
        privateURI: process.env.PRIVATE_URI,
        signFn: async (address, message) => {
          const { signature } = await marketplaceApi.signMessage(message, address)
          return signature
        }
      })
      await hashedPrivateApi.connect()
      store['$hashedPrivateApi'] = hashedPrivateApi
    } catch (e) {
      console.error(e)
    }

    // Hashed Confidential Docs
    const hashedConfidentialDocs = new ConfidentialDocs({
      ipfsURL: process.env.IPFS_URL,
      ipfsAuthHeader,
      chainURI: process.env.WSS,
      appName: process.env.APP_NAME,
      faucetServerUrl: process.env.FAUCET_SERVER_URL
    })

    await hashedConfidentialDocs.init()

    const nbvStorageApi = new NbvStorageApi(hashedConfidentialDocs.getPolkadotApi(), showGlobalLoading)
    const afloatApi = new AfloatApi({
      polkadotApi: hashedConfidentialDocs.getPolkadotApi(),
      projectId: process.env.IPFS_PROJECT_ID,
      secretId: process.env.IPFS_PROJECT_SECRET,
      IPFS_URL: process.env.IPFS_URL,
      notify: showGlobalLoading
    })

    store['$afloatApi'] = afloatApi
    store['$polkadotApi'] = api
    store['$nbvStorageApi'] = nbvStorageApi
    store['$marketplaceApi'] = marketplaceApi
    store['$fruniquesApi'] = fruniquesApi
    store['$uniquesApi'] = uniquesApi
    store['$bdkApi'] = bdkApi
    store['$hcd'] = hashedConfidentialDocs
    store['$connectedToServer'] = true
  } catch (e) {
    store['$connectedToServer'] = false
    showGlobalNotification({ message: e.message || e, color: 'negative' })
  } finally {
    hideGlobalLoading()
  }
}
