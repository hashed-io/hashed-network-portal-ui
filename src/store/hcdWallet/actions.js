export const logout = async function ({ commit }) {
  try {
    await this.$hcd.logout()
    this.$nbvStorageApi.setSigner(undefined)
    commit('setIsHashedLoggedIn', false)
    commit('profile/cleanProfile', undefined, { root: true })
    // commit('cleanAccount')
  } catch (error) {
    console.error('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
