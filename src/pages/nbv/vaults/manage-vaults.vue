<template lang="pug">
#container
  //- Action Btn
  q-page-sticky(position="bottom-right" :offset="[18, 18]")
    q-btn(fab icon="refresh" color="secondary" @click="getVaults")
      q-tooltip(self="bottom left" anchor="top left" :offset="[10, 10]") {{ $t('pages.nbv.actions.refresh') }}
  .row.justify-between.q-mb-md
    .text-overline {{ $t('pages.nbv.vaults.manageVaults') }}
    q-btn(
      :label="$t('pages.nbv.vaults.createVault')"
      color="primary"
      icon="add"
      no-caps
      outline
      @click="isShowingCreateVault = true"
    )
  vault-list.q-my-md(:vaults="vaultList")
  #modals
    q-dialog(v-model="isShowingCreateVault")
      q-card.modalSize
        create-vault-form(@submittedForm="createNewVault" :signer="polkadotAddress")
</template>

<script>
import { mapGetters } from 'vuex'
import VaultList from '~/components/nbv/vaults/vault-list.vue'
import CreateVaultForm from '~/components/nbv/vaults/create-vault-form.vue'

export default {
  name: 'ManageVaults',
  components: { VaultList, CreateVaultForm },
  data () {
    return {
      vaultList: [],
      isShowingCreateVault: false
    }
  },
  computed: {
    // ...mapGetters('polkadotWallet', ['selectedAccount']),
    ...mapGetters('profile', ['polkadotAddress'])
  },
  async mounted () {
    this.getVaults()
  },
  methods: {
    async getVaults () {
      try {
        this.showLoading()
        const vaultsId = await this.$store.$nbvStorageApi.getVaultsByUser({
          user: this.polkadotAddress
        })
        if (!vaultsId.isEmpty) {
          const Ids = vaultsId.toJSON()
          const vaults = await this.$store.$nbvStorageApi.getVaultsById({ Ids })
          this.vaultList = vaults.map((v, i) => {
            return {
              ...v.toHuman(),
              vaultId: Ids[i]
            }
          })
        } else this.vaultList = []
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    },
    async createNewVault (data) {
      try {
        this.showLoading()
        await this.$store.$nbvStorageApi.createVault({
          ...data,
          user: this.polkadotAddress
        })
        this.isShowingCreateVault = false
        this.showNotification({ message: this.$t('pages.nbv.vaults.vaultCreated') })
        await this.getVaults()
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    },
    async signAndVerifyMessage () {
      try {
        this.showLoading()
        const message = 'Test To Sign'
        const response = await this.$store.$nbvStorageApi.signMessage(message, this.polkadotAddress)
        const response2 = await this.$store.$nbvStorageApi.verifyMessage(message, response.signature, this.polkadotAddress)
        if (response2.isValid) {
          this.showNotification({ message: this.$t('pages.nbv.vaults.messageSignedAndVerified') })
        }
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
