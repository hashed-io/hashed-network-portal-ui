import BasePolkadotApi from '~/services/basePolkadotApi'

class VestingApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'vesting', notify)
  }

  async getVestingByAccount ({ address }, subTrigger) {
    const scopes = await this.exQuery('vesting', [address], subTrigger)
    return scopes.toHuman()
  }
}

export default VestingApi
