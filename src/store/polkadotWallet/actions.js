export const hashedLogin = async function ({ commit }, { userAddress, meta, returnTo }) {
  try {
    const isLoggedIn = await this.$hashedPrivateApi.isLoggedIn()
    const to = returnTo || { name: 'wallet' }
    // console.log('store', this)
    if (isLoggedIn) {
      commit('setIsHashedLoggedIn', isLoggedIn)
      localStorage.setItem('autoLoginAccount', userAddress)
      // this.$polkadotApi.parseAddress(userAddress, '9072')
      commit('profile/setProfile', {
        loginType: 'polkadotjs',
        polkadotAddress: userAddress,
        profileName: meta.name
      }, { root: true })
      this.$nbvStorageApi.setSigner(userAddress)
      this.$router.push(to)
    } else if (!isLoggedIn && userAddress) {
      await this.$hashedPrivateApi.login(userAddress)
      commit('setIsHashedLoggedIn', true)
      localStorage.setItem('autoLoginAccount', userAddress)
      commit('profile/setProfile', {
        loginType: 'polkadotjs',
        polkadotAddress: userAddress,
        profileName: meta.name
      }, { root: true })
      this.$nbvStorageApi.setSigner(userAddress)
      // this.$polkadotApi.parseAddress(userAddress, '9072')
      this.$router.push(to)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const hashedAutoLogin = async function ({ commit, dispatch }, { returnTo }) {
  try {
    // console.log('hashedAutoLogin')
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
    this.$nbvStorageApi.setSigner(undefined)
    commit('setIsHashedLoggedIn', false)
  } catch (error) {
    console.error('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
