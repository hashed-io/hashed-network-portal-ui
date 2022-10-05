<template lang="pug">
#container
  .row.items-center.q-mb-md
    .text-h5 {{ $t('pages.nbv.xpub.managePublicKeys') }}
    q-icon.q-ml-sm.icon-btn(name="help" color="primary" size="sm")
      q-tooltip.text-body2.myTooltip(:offset="[10, 10]")
        .myTooltip {{ $t('pages.nbv.xpub.extendedPublicKeyInfo') }}
  .text-body2.text-weight-light.q-mb-lg {{ $t('pages.nbv.xpub.textInfo')  }}
  q-card(v-if="userHasXpub")
    q-item
      q-item-section
        .text-subtitle2.q-mt-md XPUB
        .one-line {{ userXpub.substr(0, 20) + '........' + userXpub.substr(-20) }}
    .row.q-gutter-sm.q-pa-md
      q-btn(
        @click="copyTextToClipboard(userXpub, 'XPUB copied to clipboard')"
        label="Copy XPUB"
        color="primary"
        no-caps
      )
      q-btn(
        @click="removeXpub"
        label="Remove XPUB"
        color="negative"
        no-caps
      )
        q-tooltip {{ $t('pages.nbv.xpub.removeYourXPUB') }}
  #NotXPUB(v-else)
    .text-body2 Create a new Xpub
    q-btn.q-ma-md(
      label="Generate a new XPUB"
      color="primary"
      icon="key"
      no-caps
      @click="generateXPUB"
    )
    q-dialog(v-model="modals.showingConfirmationSeed" persistent)
      q-card.modalSize
        seed-viewer(:seed="newXpub.seed" @onConfirm="onSeedSavedConfirmed")
    hr
    .text-body2 I have an Xpub
    set-xpub-form.q-ma-md( :userAddress="polkadotAddress" @onSubmitted="setXpub")
</template>

<script>
import { mapGetters } from 'vuex'
import SetXpubForm from '~/components/nbv/xpub/set-xpub-form'
import SeedViewer from '~/components/nbv/xpub/seed-viewer'
const { GenerateCosigner } = require('./../../../../../nbv-ur-codec')

export default {
  name: 'ManageXpub',
  components: {
    SetXpubForm,
    SeedViewer
  },
  data () {
    return {
      userXpub: undefined,
      xpubUnsub: undefined,
      newXpub: undefined,
      modals: {
        showingConfirmationSeed: false
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    ...mapGetters('profile', ['polkadotAddress']),
    userHasXpub () {
      return !!this.userXpub
    }
  },
  watch: {
    selectedAccount () {
      // await this.unsubscribeToXPUB()
      // this.subscribeToXPUB()
      this.getXpub()
    }
  },
  mounted () {
    this.getXpub()
    // this.subscribeToXPUB()
  },
  beforeUnmount () {
    // this.unsubscribeToXPUB()
  },
  methods: {
    async onSeedSavedConfirmed () {
      try {
        this.showLoading()
        const XPUB = `[${this.newXpub.xfp}${this.newXpub.path.replace('m', '')}]${this.newXpub.Zpub}`
        await this.$store.$nbvStorageApi.submitXPUB({
          user: this.polkadotAddress,
          XPUB: XPUB
        })
        this.modals.showingConfirmationSeed = false
      } catch (e) {
        console.error(e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async generateXPUB () {
      try {
        this.showLoading()
        // const generateCosigner = new GenerateCosigner()
        // await generateCosigner.resolveEcc()
        this.newXpub = await GenerateCosigner.getCosigner()
        console.log('xpub', this.newXpub)
        this.modals.showingConfirmationSeed = true
      } catch (e) {
        console.error(e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async subscribeToXPUB () {
      try {
        this.showLoading()
        this.xpubUnsub = await this.$store.$nbvStorageApi.getXpubByUser(
          this.polkadotAddress,
          e => {
            this.getXpub(e)
          }
        )
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async unsubscribeToXPUB () {
      try {
        this.showLoading()
        await this.xpubUnsub()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async getXpub () {
      try {
        this.showLoading()
        this.userXpub = undefined
        const xpubId = await this.$store.$nbvStorageApi.getXpubByUser(this.polkadotAddress)
        if (xpubId && xpubId.value) {
          const xpub = await this.$store.$nbvStorageApi.getXpubById(xpubId.value)
          this.userXpub = xpub.isEmpty ? undefined : xpub.value.toHuman()
        }
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async setXpub (payload) {
      try {
        this.showLoading({ message: this.$t('general.waitingWeb3') })
        await this.$store.$nbvStorageApi.submitXPUB({
          user: this.polkadotAddress,
          XPUB: payload.XPUB
        })
        // console.log('setXpub', response)
        this.showNotification({ message: this.$t('pages.nbv.xpub.yourXpubWasAdded') })
        this.getXpub()
        // this.showLoading({ message: this.$t('general.waitingSub') })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async removeXpub () {
      try {
        this.showLoading({ message: this.$t('general.waitingWeb3') })
        await this.$store.$nbvStorageApi.removeXpub({ user: this.polkadotAddress })
        this.showNotification({ message: this.$t('pages.nbv.xpub.yourXpubWasRemoved') })
        // this.showLoading({ message: this.$t('general.waitingSub') })
        this.getXpub()
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
.myTooltip
  max-width: 600px
.actionCards
  // background: blue
</style>
