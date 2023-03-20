import BasePolkadotApi from '~/services/basePolkadotApi'
class FruniquesApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'fruniques', notify)
  }

  parseAddress (address) {
    const parsed = this.parseAddressToss58(address)
    return parsed
  }

  createWithAttributes ({ user, classId, instanceId, numericValue, admin, attributes }, subTrigger) {
    return this.callTx('createWithAttributes', user, [classId, instanceId, numericValue, admin, attributes], subTrigger)
  }

  async spawn ({ signer, collectionId, parentId, isHierarchical, percentage, attributes }) {
    const parentInfo = null
    return this.callTx('spawn', signer, [collectionId, parentInfo, attributes])
  }
}
export default FruniquesApi
