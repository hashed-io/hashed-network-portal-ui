import BasePolkadotApi from '~/services/basePolkadotApi'
class FruniquesApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    // HCD
    super(polkadotApi, 'fruniques', notify)
  }

  createWithAttributes ({ user, classId, instanceId, numericValue, admin, attributes }, subTrigger) {
    console.log('createWithAttributes', { classId, instanceId, numericValue, admin, attributes })
    return this.callTx('createWithAttributes', user, [classId, instanceId, numericValue, admin, attributes], subTrigger)
  }
}
export default FruniquesApi
