import BasePolkadotApi from '~/services/basePolkadotApi'
class FruniquesApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'fruniques', notify)
  }

  createWithAttributes ({ classId, instanceId, numericValue, admin, attributes }, subTrigger) {
  }
}
export default FruniquesApi
