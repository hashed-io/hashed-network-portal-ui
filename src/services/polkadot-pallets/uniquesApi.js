import BasePolkadotApi from '~/services/basePolkadotApi'
class UniquesApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'uniques', notify)
  }

  // Queries
  async getAsset ({ classId, instanceId }) {
    const allIds = await this.exEntriesQuery('attribute', [classId, instanceId])
    console.log('allIds', allIds)
    const map = this.mapEntries(allIds)
    // Example
    //   {
    //     "key": "0x5e8a19e3cd1b7c148b33880c479c02811b0014ebdc1a24fd6a03320d070a5d84d82c12285b5d4551f88e8f6e7eb52b8101000000189a1f652c3d5b1ccb285c07a1c8a0ef010000000000b44263e881c10f23a4285105e87f6c145374617465",
    //     "id": [
    //         "1",
    //         "0",
    //         "State"
    //     ],
    //     "value": [
    //         "Virgina",
    //         "73,333,332,600"
    //     ]
    // }
    const response = map.map(v => {
      return {
        label: v.id[2],
        value: v.value[0]
      }
    })
    return response
  }
}
export default UniquesApi
