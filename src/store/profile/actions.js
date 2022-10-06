export const getXpub = async function ({ commit, state }) {
  try {
    const loggedUser = state.polkadotAddress
    const xpubId = await this.$nbvStorageApi.getXpubByUser(loggedUser)
    if (xpubId && xpubId.value) {
      const xpub = await this.$nbvStorageApi.getXpubById(xpubId.value)
      const userXpub = xpub.isEmpty ? undefined : xpub.value.toHuman()
      commit('setXPUB', { xpub: userXpub })
    }
  } catch (error) {
    console.error('Error getting xpub: ', error)
  }
}
