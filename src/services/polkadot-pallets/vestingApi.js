import BasePolkadotApi from '~/services/basePolkadotApi'

class VestingApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'vesting', notify)
  }

  async getVestingByAccount ({ address }, subTrigger) {
    const scopes = await this.exQuery('vesting', [address], subTrigger)
    return scopes.toHuman()
  }

  async getCurrentBlock (subTrigger) {
    if (subTrigger) {
      return this.getHeader(subTrigger)
    }
    const header = await this.getHeader()
    const { number: currentBlock } = header.toHuman()
    return parseFloat(currentBlock.replaceAll(',', ''))
  }
}

export default VestingApi
