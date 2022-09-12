<template lang="pug">
#container
  q-layout
    q-page-container
      .luhn-image
      #cardContainer.absolute-center
       .row.justify-center.q-mb-md
        img.logoImg(src="~/assets/portal/logo-gradient-white.png")
       q-card.login-card.q-pa-md
        .text-h5.text-white {{ $t('login.login') }}
        #polkadotLogin.q-gutter-y-md(v-if="availableAccounts && availableAccounts.length > 0")
            .text-caption.text-white {{ $t('login.chooseAnAccount') }}
            q-btn.full-width.q-mt-lg(flat padding="0px 0px 0px 0px" no-caps text-color="white")
                selected-account-btn.full-width(:username="selectedAccount.meta.name" :address="selectedAccount.address" :isSelector="true")
                accounts-menu(:accounts="availableAccounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
            q-btn.full-width.text-primary(
                :label="$t('login.login')"
                @click="login"
                color="accent"
                no-caps
            )
        #notPolkadotAccounts(v-else)
          .text-caption.text-white {{ $t('login.notHaveAccounts') }}
        .text-caption.text-center.text-white.q-mt-lg.text-uppercase {{ $t('login.or') }}
        #googleLogin.q-mt-lg
          #google-signin-btn.flex.justify-center(class="g-signin2")
  #modals
    q-dialog(v-model="showHCDPasswordModal" persistent)
      q-card.modalSize.q-pa-md.bg-white
        password-confidential-docs(v-bind="hcdPasswordProps" @onSubmit="onPasswordSet")
</template>

<script>
import { AccountsMenu, SelectedAccountBtn } from '~/components/common/index.js'
import PasswordConfidentialDocs from '~/components/common/login/password-confidential-docs'
import { mapGetters } from 'vuex'
import Jwt from '~/utils/Jwt'

export default {
  name: 'LoginPage',
  components: { AccountsMenu, SelectedAccountBtn, PasswordConfidentialDocs },
  data () {
    return {
      hcdPasswordProps: {},
      hcdPassword: undefined,
      showHCDPasswordModal: false
    }
  },
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
      callback: this.onGoogleSignIn
    })
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {
        locale: this.$i18n.locale,
        text: this.$t('login.signinWithGoogle'),
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
          meta: this.selectedAccount.meta,
          type: this.selectedAccount.type,
          returnTo: this.returnTo
        })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onGoogleSignIn (response) {
      try {
        this.showLoading({
          message: 'Login through Hashed Confidential Documents'
        })
        const { credential } = response
        if (credential) {
          // console.log('JWT:', credential)
          const account = Jwt.decodeToken(credential)
          // console.log('Decoded JWT:', account)
          this.hcdPasswordProps = {
            ssoProvider: 'Google',
            ssoUserId: account.sub,
            ssoImage: account.picture,
            displayName: account.name,
            ssoAccount: account
          }
          // this.showHCDPasswordModal = true
          // this.hideLoading()
          const hcgResponse = await this.$store.$hcd.ssoGoogleLogin({
            /** Important do not change this value */
            ssoProvider: 'hashed-portal-google',
            jwt: credential,
            clientId: process.env.GOOGLE_CLIENT_ID
          })
          const polkadotAddress = await this.$store.$hcd.getPolkadotAddress()
          console.log('hcgResponse', hcgResponse)
          this.$store.commit('hcdWallet/setAccount', {
            ssoProvider: 'google',
            ssoUserId: account.sub,
            ssoImage: account.picture,
            ssoAccount: account,
            polkadotAddress
          })
          this.$store.commit('profile/setProfile', {
            loginType: 'hcd',
            polkadotAddress,
            profilePicture: account.picture,
            profileName: account.given_name
          }, { root: true })
          this.$router.push({ name: 'hcd' })
        }
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onPasswordSet ({ email, ssoUserId, ssoProvider, ssoImage, ssoAccount }) {
      try {
        this.showLoading({
          message: 'Login through Hashed Confidential Documents'
        })
        await this.$store.$hcd.login({
          ssoProvider,
          ssoUserId,
          email
        })
        const polkadotAddress = await this.$store.$hcd.getPolkadotAddress()
        this.$store.commit('hcdWallet/setAccount', {
          ssoProvider,
          ssoUserId,
          ssoImage,
          ssoAccount,
          polkadotAddress
        })
        this.$router.push({ name: 'hcd' })
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
