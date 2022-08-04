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
        #polkadotLogin.q-gutter-y-md(v-if="availableAccounts && availableAccounts.length > 0")
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
        #notPolkadotAccounts(v-else)
          .text-caption.text-white You do not have accounts on polkadot js extension
        .text-caption.text-center.text-white.q-mt-lg OR
        #googleLogin.q-mt-lg
          #google-signin-btn.flex.justify-center(class="g-signin2")
</template>

<script>
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import { mapGetters } from 'vuex'
import Jwt from '../../utils/Jwt'

export default {
  name: 'LoginPage',
  components: { AccountsMenu, SelectedAccountBtn },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'availableAccounts']),
    returnTo () {
      let to
      if (this.$route.query.returnUrl) {
        to = { name: this.$route.query.returnUrl }
      }
      if (this.$route.query.returnQuery) {
        to = {
          ...to,
          query: JSON.parse(this.$route.query.returnQuery)
        }
      }
      return to
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: this.onSignIn
    })
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {
        theme: 'filled_black',
        size: 'large',
        width: '300'
      }
    )
  },
  async beforeMount () {
    try {
      this.showLoading({
        message: 'Requesting accounts from polkadot js extension'
      })
      const accounts = await this.$store.$polkadotApi.requestUsers()
      this.$store.commit('polkadotWallet/setAvailableAccounts', accounts)
      const autoLoginAccount = localStorage.getItem('autoLoginAccount')
      let account = accounts[0]
      if (autoLoginAccount) {
        const findAccount = accounts.find(v => v.address === autoLoginAccount)
        account = findAccount || account
      }
      this.$store.commit('polkadotWallet/setSelectedAccount', account)
      this.$store.dispatch('polkadotWallet/hashedAutoLogin', {
        returnTo: this.returnTo
      })
    } catch (e) {
      console.error('error', e)
      this.showNotification({ message: e.message || e, color: 'negative' })
    } finally {
      this.hideLoading()
    }
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
        this.$store.dispatch('polkadotWallet/hashedLogin', {
          userAddress: this.selectedAccount.address,
          returnTo: this.returnTo
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    onSignIn ({ credential }) {
      if (credential) {
        const account = Jwt.decodeToken(credential)
        console.log({ account })
        this.$store.commit('googleAuth/setAccount', account)
        this.$router.push({ name: 'root' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'

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
