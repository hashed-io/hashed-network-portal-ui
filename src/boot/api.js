/* eslint-disable dot-notation */
import PolkadotApi from '~/services/polkadotApi'
import { NbvStorageApi, MarketplaceApi } from '~/services/polkadot-pallets'
import BdkApi from '~/services/bdk/bdkApi'
import HashedPrivateApi from '~/services/HashedPrivateApi'
import ConfidentialDocs from '~/services/confidential-docs/confidential-docs'
import { Keyring } from '@polkadot/api'
import { LocalAccountFaucet, BalancesApi } from '@smontero/hashed-confidential-docs'
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
    // Connect Hashed private service
    hideGlobalLoading()
    showGlobalLoading({
      message: 'Connecting with Hashed Private Server'
    })
    const hashedPrivateApi = new HashedPrivateApi({
      ipfsURL: process.env.IPFS_URL,
      privateURI: process.env.PRIVATE_URI,
      signFn: async (address, message) => {
        const { signature } = await marketplaceApi.signMessage(message, address)
        return signature
      }
    })
    await hashedPrivateApi.connect()
    console.log('Hashed Private connected', hashedPrivateApi)

    // Hashed Confidential Docs
    const keyring = new Keyring()
    const faucet = new LocalAccountFaucet({
      balancesApi: new BalancesApi(api.api, () => {}),
      signer: keyring.addFromUri('//Alice', {}, 'sr25519'),
      amount: 1000000000
    })

    const hashedConfidentialDocs = new ConfidentialDocs({
      ipfsURL: process.env.IPFS_URL,
      chainURI: process.env.WSS,
      appName: process.env.APP_NAME,
      faucet
    })

    store['$polkadotApi'] = api
    store['$nbvStorageApi'] = nbvStorageApi
    store['$marketplaceApi'] = marketplaceApi
    store['$bdkApi'] = bdkApi
    store['$hashedPrivateApi'] = hashedPrivateApi
    store['$hcd'] = hashedConfidentialDocs
    store['$connectedToServer'] = true
  } catch (e) {
    store['$connectedToServer'] = false
    showGlobalNotification({ message: e.message || e, color: 'negative' })
  } finally {
    hideGlobalLoading()
  }
}
