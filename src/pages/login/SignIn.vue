<template lang='pug'>
.container
  .yellow-top
    .jh-navbar
      Logo(includeSubtitle)
  .flex.flex-center
    .container
      .row(style="min-height: 20vh")
        .col-4
          .headline1.q-pl-md.signIn Sign In
          .input-label Account Selected
          .row
            .col-12
              q-btn(flat padding="0px 0px 0px 0px" no-caps class="q-mt-sm account-container")
                selected-account-select(:selectedAccount="getSelectedAccount")
                accounts-menu(:accounts="accounts" @selectAccount="onSelectAccount" :selectedAccount="selectedAccount")
      q-btn(
        class="btn-lg"
        @click="loginUser"
      ) Login

  .full-blue-bottom
    ContactInfo
    Copyright.q-pb-md
</template>
<script>
import { AccountsMenu, SelectedAccountSelect } from '~/components/common/index.js'
import Logo from 'src/components/common/logo.vue'
import ContactInfo from 'src/components/footer/components/contact-info.vue'
import Copyright from 'src/components/footer/components/copyright.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SignIn',
  components: {
    Logo,
    ContactInfo,
    Copyright,
    SelectedAccountSelect,
    AccountsMenu
  },
  data () {
    return {
      accounts: undefined
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount', 'availableAccounts']),
    getSelectedAccount () {
      return this.selectedAccount
    }
  },
  async mounted () {
    console.log('tester---------------------')
    try {
      await this.connectPolkadot()
      await this.requestUsers()
    } catch (e) {
      console.error(e)
      this.showNotification({ color: 'red', message: e.message || e })
    }
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setSelectedAccount', 'setAvailableAccounts', 'setIsLoggedIn']),
    async connectPolkadot () {
      try {
        this.showLoading()
      } catch (e) {
        console.error('connectPolkadot', e)
        this.showNotification({ color: 'red', message: e.message || e })
      } finally {
        this.hideLoading()
      }
    },
    async requestUsers () {
      try {
        this.showLoading({ message: 'Trying to get accounts, please review polkadot{js} extension' })
        this.accounts = await this.$store.$polkadotApi.requestUsers()
        this.setAvailableAccounts(this.accounts)
        this.setSelectedAccount(this.accounts[0])
      } catch (e) {
        console.error('requestUsers', e)
        this.showNotification({ color: 'negative', message: e.message || e })
      } finally {
        this.hideLoading()
      }
    },
    onSelectAccount (account) {
      console.log('onSelectAccount', account)
      this.setSelectedAccount(account)
    },
    async loginUser () {
      try {
        this.showLoading({ message: 'You must be logged in to enter the application' })
        await this.$store.$hashedPrivateApi.login(this.selectedAccount.address)
        this.setIsLoggedIn(true)
        this.$router.push({ name: 'marketplace' })
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
        this.setIsLoggedIn(false)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.jh-navbar
  z-index: 1;
  padding: 1% 0% 0 12%;
  display: flex;
  align-items: flex-start;
.yellow-top
  background-image: url('../../assets/yellow-top.svg') !important;
  background-repeat: no-repeat;
  background-size: inherit;
  padding-bottom: 8%;
  background-position: top right;
  width: 100%;
.full-blue-bottom
  background-image: url('../../assets/footer-bottom-blue-full.svg') !important;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 35%;
  background-position: bottom;
  width: 100%;
.container
  height: 30vh;
  max-height: 60vh;
.signIn
  height: 8vh;
</style>
