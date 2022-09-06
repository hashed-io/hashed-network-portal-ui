export const hashedLogin = async function ({ commit }, { userAddress, returnTo }) {
  try {
    const isLoggedIn = await this.$hashedPrivateApi.isLoggedIn()
    const to = returnTo || { name: 'root' }
    console.log('store', this)
    if (isLoggedIn) {
      commit('setIsHashedLoggedIn', isLoggedIn)
      localStorage.setItem('autoLoginAccount', userAddress)
      commit('profile/setProfile', {
        loginType: 'PolkadotJS',
        polkadotAddress: userAddress
      }, { root: true })
      this.$router.push(to)
    } else if (!isLoggedIn && userAddress) {
      await this.$hashedPrivateApi.login(userAddress)
      commit('setIsHashedLoggedIn', true)
      localStorage.setItem('autoLoginAccount', userAddress)
      commit('profile/setProfile', {
        loginType: 'PolkadotJS',
        polkadotAddress: userAddress
      }, { root: true })
      this.$router.push(to)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const hashedAutoLogin = async function ({ commit, dispatch }, { returnTo }) {
  try {
    console.log('hashedAutoLogin')
    if (localStorage.getItem('autoLoginAccount')) {
      await dispatch('hashedLogin', { returnTo, userAddress: localStorage.getItem('autoLoginAccount') })
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const hashedLogout = async function ({ commit }) {
  try {
    await this.$hashedPrivateApi.logout()
    commit('setIsHashedLoggedIn', false)
  } catch (error) {
    console.log('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
