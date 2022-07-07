import PolkadotApi from '~/services/polkadotApi.js'
export const connectToServer = async function ({ commit }, wssUrl) {
  try {
    const api = new PolkadotApi({ wss: wssUrl })
    return api.connect()
  } catch (e) {
    throw new Error(e)
  }
}

export const hashedLogin = async function ({ commit }, { userAddress, returnTo }) {
  try {
    const isLoggedIn = await this.$hashedPrivateApi.isLoggedIn()
    console.log('isLoggedIn', isLoggedIn)
    if (isLoggedIn) {
      commit('setIsHashedLoggedIn', isLoggedIn)
    } else if (!isLoggedIn && userAddress) {
      await this.$hashedPrivateApi.login(userAddress)
      commit('setIsHashedLoggedIn', true)
      const to = returnTo || { name: 'root' }
      console.log('returnUrl', to)
      this.$router.push(to)
    }
  } catch (e) {
    throw new Error(e)
  }
}
