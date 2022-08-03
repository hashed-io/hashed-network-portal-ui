import BasePolkadotApi from '~/services/basePolkadotApi'
class UniquesApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'uniques', notify)
  }

  // Queries
  async getAsset ({ accountId, classId, instanceId }) {
    return this.query('asset', { accountId, classId, instanceId })
  }
}
export default UniquesApi
