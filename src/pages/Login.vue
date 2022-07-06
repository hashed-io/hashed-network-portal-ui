<template lang="pug">
#container
  q-layout
    q-page-container
      .luhn-image
      #cardContainer.absolute-center
       .row.justify-center.q-mb-md
        img.logoImg(src="~/assets/portal/logo-gradient-white.png")
       q-card.login-card.q-pa-md
        .text-h5.text-white Login
        #polkadotLogin.q-gutter-y-md
            .text-caption.text-white Choose an account from your polkadot extension
            q-btn.full-width.q-mt-lg(flat padding="0px 0px 0px 0px" no-caps text-color="white")
                selected-account-btn.full-width(:selectedAccount="selectedAccount" arrow)
                accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
            q-btn.full-width.text-primary(
                label="Login"
                @click="login"
                color="accent"
                no-caps
            )
        .text-caption.text-center.text-white.q-mt-lg OR
        #googleLogin.q-mt-lg
            q-btn.full-width.btnGoogle(
              no-caps
              label="Login with google"
              disabled
            )
</template>

<script>
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  components: { AccountsMenu, SelectedAccountBtn },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'availableAccounts'])
  },
  async beforeMount () {
    const accounts = await this.$store.$polkadotApi.requestUsers()
    this.$store.commit('polkadotWallet/setAvailableAccounts', accounts)
    this.$store.commit('polkadotWallet/setSelectedAccount', accounts[0])
  },
  methods: {
    onSelectAccount (account) {
      this.$store.commit('polkadotWallet/setSelectedAccount', account)
    },
    async login () {
      try {
        this.showLoading({
          message: 'Please sign message to login with private Hashed service'
        })
        const message = 'Hashed Login'
        const response = await this.$store.$nbvStorageApi.signMessage(message, this.selectedAccount.address)
        const response2 = await this.$store.$nbvStorageApi.verifyMessage(message, response.signature, this.selectedAccount.address)
        console.log('signMessage', response)
        console.log('verifyMessage', response2)
        if (response2.isValid) {
          this.$router.replace({
            name: 'root'
          })
        //   showNotification({ message: 'Message Signed and Verified' })
        }
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~/css/colors.styl'

#container
  background: transparent linear-gradient(147deg, var(--unnamed-color-290266) 0%, #150133 100%) 0% 0% no-repeat padding-box
  background: transparent linear-gradient(147deg, #290266 0%, #150133 100%) 0% 0% no-repeat padding-box

.luhn-image
  background-image: url('../assets/portal/luhnLights.png')
  width: 70%
  height: 100%
  background-repeat: no-repeat
  background-size: cover
  opacity: 0.8
  position: absolute
  left: -10%

.login-card
  width: 50vh
  height: 60vh
  background-color: rgba(90, 47, 149, 0.9)

.btnGoogle
  background: #1669F2
  color: white

.logoImg
  width: 150px

@media (max-width: 1000px)
  .luhn-image
    width: 110%

</style>
