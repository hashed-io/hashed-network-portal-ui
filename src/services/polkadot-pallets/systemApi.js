import BasePolkadotApi from '~/services/basePolkadotApi'

class SystemApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'system', notify)
  }

  async getBalanceByAccount ({ address }, subTrigger) {
    const balances = await this.exQuery('account', [address])
    const { data: { free: balance } } = balances.toHuman()
    return balance.replaceAll(',', '') / (10 ** 18)
  }
}

export default SystemApi
