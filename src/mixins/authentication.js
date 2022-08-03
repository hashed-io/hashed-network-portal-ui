import { mapGetters, mapMutations } from 'vuex'
export const authentication = {
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'isLoggedIn'])
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsHashedLoggedIn']),
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to submit an application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsHashedLoggedIn(true)
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsHashedLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
}
