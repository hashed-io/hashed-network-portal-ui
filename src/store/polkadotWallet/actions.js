export const hashedLogin = async function ({ commit, dispatch }, { userAddress, meta, returnTo }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const isLoggedIn = false
    const to = returnTo || { name: 'wallet' }
    if (isLoggedIn) {
      await dispatch('isHoldingHash', { address: userAddress })
      commit('setIsHashedLoggedIn', isLoggedIn)
      localStorage.setItem('autoLoginAccount', userAddress)
      commit('profile/setProfile', {
        loginType: 'polkadotjs',
        polkadotAddress: userAddress,
        profileName: meta?.name
      }, { root: true })
      this.$nbvStorageApi.setSigner(userAddress)
      this.$router.push(to)
    } else if (!isLoggedIn && userAddress) {
      await dispatch('isHoldingHash', { address: userAddress })
      commit('setIsHashedLoggedIn', true)
      localStorage.setItem('autoLoginAccount', userAddress)
      commit('profile/setProfile', {
        loginType: 'polkadotjs',
        polkadotAddress: userAddress,
        profileName: meta.name
      }, { root: true })
      this.$nbvStorageApi.setSigner(userAddress)
      this.$router.push(to)
    }
  } catch (e) {
    dispatch('hashedLogout')
    throw e
  }
}

export const isHoldingHash = async function ({ dispatch }, { address }) {
  const balance = await this.$systemApi.getBalanceByAccount({ address })
  // const balance = 1
  if (!balance || balance <= 0) {
    const error = new Error(`Not HASH balance: The ${address} address is not holding HASH`)
    error.type = 'NotHashBalance'
    error.address = address
    throw error
  }
}

export const hashedAutoLogin = async function ({ commit, dispatch }, { returnTo }) {
  try {
    if (localStorage.getItem('autoLoginAccount')) {
      await dispatch('hashedLogin', { returnTo, userAddress: localStorage.getItem('autoLoginAccount') })
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const hashedLogout = async function ({ commit }) {
  try {
    this.$nbvStorageApi.setSigner(undefined)
    commit('setIsHashedLoggedIn', false)
    commit('profile/cleanProfile', undefined, { root: true })
  } catch (error) {
    console.error('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
