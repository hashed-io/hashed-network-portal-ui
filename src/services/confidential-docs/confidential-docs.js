// See HashedConfidentialDocs on https://github.com/hashed-io/hashed-confidential-docs-client-api
import {
  HashedConfidentialDocs,
  GoogleDrive,
  Google,
  createGoogleVaultAuthProvider,
  Polkadot,
  HashedFaucet
} from '@smontero/hashed-confidential-docs'
// } = require('../../../../hashed-confidential-docs-client-api/src/index')

class ConfidentialDocs {
  constructor ({ ipfsURL, chainURI, appName, faucetServerUrl, ipfsAuthHeader }) {
    this._ipfsURL = ipfsURL
    this._faucetServerUrl = faucetServerUrl
    this._ipfsAuthHeader = ipfsAuthHeader
    this._wss = chainURI
    this._appName = appName
  }

  async init () {
    this._polkadot = new Polkadot({ wss: this._wss, appName: this._appName })
    await this._polkadot.connect()

    const faucet = new HashedFaucet(this._faucetServerUrl)

    const hcd = new HashedConfidentialDocs({
      ipfsURL: this._ipfsURL,
      polkadot: this._polkadot,
      faucet,
      ipfsAuthHeader: this._ipfsAuthHeader
    })

    this._hcd = hcd
  }

  getPolkadotApi () {
    return this._polkadot
  }

  async ssoGoogleLogin ({ ssoProvider, jwt, clientId }) {
    const googleDrive = new GoogleDrive(new Google({
      // eslint-disable-next-line no-undef
      gapi,
      clientId
    }))

    const vaultAuthProvider = await createGoogleVaultAuthProvider({
      authName: ssoProvider,
      jwt,
      faucetServerUrl: this._faucetServerUrl,
      googleDrive
    })

    return this._hcd.login(vaultAuthProvider)
  }

  logout () {
    this._hcd.logout()
    this._polkadot.setWallet()
    // this.init()
  }

  getPolkadotAddress () {
    return this._hcd.address()
  }

  addOwnedData ({ name, description, payload }) {
    return this._hcd.ownedData().add({
      name,
      description,
      payload
    })
  }

  viewOwnedDataByCID (cid) {
    return this._hcd.ownedData().viewByCID(cid)
  }

  shareData ({ toUserAddress, name, description, payload }) {
    return this._hcd.sharedData().share({
      toUserAddress,
      name,
      description,
      payload
    })
  }

  viewSharedDataByCID (cid) {
    return this._hcd.sharedData().viewByCID(cid)
  }

  getMyDocuments ({ address, subTrigger }) {
    return this._hcd.ownedData().getOwnedDocs(address, subTrigger)
  }

  getMySharedDocuments ({ address, subTrigger }) {
    return this._hcd.sharedData().getSharedDocs(address, subTrigger)
  }

  getSharedWithMeDocuments ({ address, subTrigger }) {
    return this._hcd.sharedData().getSharedWithMeDocs(address, subTrigger)
  }

  removeDoc ({ cid, shared }) {
    if (shared) {
      return this._hcd.sharedData().remove(cid)
    }
    return this._hcd.ownedData().remove(cid)
  }

  updateMetadata ({ cid, name, description, shared }) {
    if (shared) {
      return this._hcd.sharedData().updateMetadata({ cid, name, description })
    }
    return this._hcd.ownedData().updateMetadata({ cid, name, description })
  }

  /**
   * @name signPsbt
   * @param {String} psbt text
   */
  signPSBT ({ psbt }) {
    return this._hcd.btc().signPSBT(psbt)
  }

  getFullXpub () {
    return this._hcd.btc().fullXPUBMultisig()
  }
}

export default ConfidentialDocs
