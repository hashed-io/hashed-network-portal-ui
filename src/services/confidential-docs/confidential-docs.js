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
}

export default ConfidentialDocs
