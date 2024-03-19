import { mapGetters, mapMutations } from 'vuex'
export const authentication = {
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'isLoggedIn'])
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setIsHashedLoggedIn']),
    async loginUser () {
      try {
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
