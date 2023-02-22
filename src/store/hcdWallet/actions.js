export const logout = async function ({ commit }) {
  try {
    await this.$hcd.logout()
    // commit('cleanAccount')
  } catch (error) {
    console.error('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
