// See HashedConfidentialDocs on https://github.com/hashed-io/hashed-confidential-docs-client-api
import { HashedConfidentialDocs } from '@smontero/hashed-confidential-docs'

class ConfidentialDocs {
  constructor ({ ipfsURL, chainURI, appName, faucet }) {
    const hcd = new HashedConfidentialDocs({
      ipfsURL,
      chainURI,
      appName,
      faucet
    })
    console.log('hcd', hcd)
    this._hcd = hcd
  }

  login ({ ssoProvider, ssoUserId, password }) {
    return this._hcd.login({ ssoProvider, ssoUserId, password })
  }

  logout () {
    return this._hcd.logout()
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
      return this._hcd.ownedData().remove(cid)
    }
    return this._hcd.sharedData().remove(cid)
  }
}

export default ConfidentialDocs
