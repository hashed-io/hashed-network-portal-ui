export const logout = async function ({ commit }) {
  try {
    await this.$hashedConfidentialDocs.logout()
    commit('cleanAccount')
  } catch (error) {
    console.log('Authenticator logout error', error)
  }
  localStorage.removeItem('autoLoginAccount')
  // this.$router.push({ name: 'login' })
}
