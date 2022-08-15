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

  async getUniquesByAddress ({ address }) {
    const allIds = await this.exEntriesQuery('classAccount', [address])
    console.log('allIds', allIds)
    const map = this.mapEntries(allIds)
    const classesIdArray = map.map(v => {
      return v.id[1]
    })
    const classData = await this.getClassInfoByClassesId({ classesIds: classesIdArray })
    const classAttributes = await this.getAttributesByClassesId({ classesIds: classesIdArray })
    console.log('classAttributes', classAttributes)
    const uniquesList = classAttributes.map((attributes, index) => {
      classData[index].attributes = attributes
      return {
        ...classData[index]
      }
    })

    return uniquesList
  }

  /**
   *
   * @param {ClassesId} Array of classesId
   * @returns Array class data in array
   */
  async getClassInfoByClassesId ({ classesIds }) {
    console.log('classesIds', classesIds)
    const classData = await this.exMultiQuery('class', classesIds)
    const classDataReadable = classData.map((v, index) => {
      return {
        classId: classesIds[index],
        ...v.toHuman()
      }
    })
    return classDataReadable
  }

  async getAttributesByClassesId ({ classesIds, instanceId = 0 }) {
    const attributePromise = []
    for (const classId of classesIds) {
      const query = this.exEntriesQuery('attribute', [classId, instanceId])
      attributePromise.push(query)
    }
    const attributesRaw = await Promise.all(attributePromise)

    const uniquesList = attributesRaw.map(attribute => {
      const attributeData = attribute.map(property => {
        const labelIndex = 2
        const valueIndex = 0
        return {
          attribute: property[0].toHuman()[labelIndex],
          value: property[1].toHuman()[valueIndex]
        }
      })
      return attributeData
    })
    return uniquesList
  }

  async getLastClassId () {
    let classesIds = await this.exEntriesQuery('class', [])
    classesIds = this.mapEntries(classesIds)
    const mapClasses = classesIds.map(v => {
      return parseInt(v.id)
    })
    const lastClassId = Math.max(...mapClasses)
    return lastClassId
  }
}
export default UniquesApi
