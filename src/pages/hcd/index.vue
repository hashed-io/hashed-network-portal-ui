<template lang="pug">
#container
  .text-body2.q-ma-sm My polkadot address: {{ polkadotAddress }}
  .row
    q-btn(
      label="Add document"
      color="primary"
      icon="add"
      no-caps
      outline
      @click="vaults.isShowingDocumentForm = true"
    )
  .row.full-width.q-gutter-x-sm
    .col
      q-card.q-pa-md
        search-document-form(@onSubmit="searchDoc")
        q-slide-transition
          #response.q-pa-sm.bg-grey(v-show="searchResponse")
            .text-caption {{ searchResponse }}
            q-btn.float-right(dense no-caps label="See Document" @click="openFile" color="secondary")
  q-card#documentsList.q-mt-md
    q-tabs.bg-primary.text-grey(v-model="listTabs" align="justify" indicator-color="accent" active-color="white")
      q-tab(name="myDocs" label="My documents" no-caps)
      q-tab(name="myShared" label="My shared documents" no-caps)
      q-tab(name="sharedWithMe" label="Shared with me" no-caps)
    q-tab-panels(v-model="listTabs" animated)
      q-tab-panel(name="myDocs")
        documents-list(
          :documents="myDocsList"
          @onRemoveDocument="removeDocument"
          @onEditDocument="showEditDocument"
          @onShareDocument="showShareDocument"
        )
      q-tab-panel(name="myShared")
        documents-list(
          :documents="mySharedDocsList"
        )
      q-tab-panel(name="sharedWithMe")
        documents-list(
          :documents="sharedWithMeDocsList"
          @onRemoveDocument="v => removeDocument(v, true)"
          @onEditDocument="v => showEditDocument(v, true)"
          @onShareDocument="v => showShareDocument(v, true)"
        )
  #modals
    q-dialog(v-modal="modals.isShowingDocumentForm")
      q-card.q-pa-md
        add-document-form(@onSubmit="addDoc")
        q-slide-transition
          #response.q-pa-sm.bg-grey(v-show="addResponse")
            .text-caption {{ addResponse }}
</template>

<script>
import AddDocumentForm from '~/components/hcd/add-document-form'
import SearchDocumentForm from '~/components/hcd/search-document-form'
import DocumentsList from '~/components/hcd/documents-list'
export default {
  name: 'HashedConfidentialDocument',
  components: { AddDocumentForm, SearchDocumentForm, DocumentsList },
  data () {
    return {
      addResponse: undefined,
      searchResponse: undefined,
      polkadotAddress: undefined,
      listTabs: 'myDocs',
      myDocsList: [],
      mySharedDocsList: [],
      sharedWithMeDocsList: [],
      modals: {
        isShowingDocumentForm: false
      }
    }
  },
  async mounted () {
    this.polkadotAddress = await this.$store.$hcd.getPolkadotAddress()
    this.updateAllList()
  },
  methods: {
    updateAllList () {
      this.loadMyDocuments()
      this.loadMySharedDocuments()
      this.loadSharedWithMeDocuments()
    },
    async addDoc (form) {
      try {
        console.log('addDocs', form)
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        if (form.isShared) {
          this.addResponse = await this.$store.$hcd.shareData({
            ...form
          })
        } else {
          this.addResponse = await this.$store.$hcd.addOwnedData({
            ...form
          })
        }
        this.loadMyDocuments()
        this.loadMySharedDocuments()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
        this.addResponse = undefined
      } finally {
        this.hideLoading()
      }
    },
    async searchDoc (cid) {
      try {
        console.log('searchDoc', this.cid)
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        this.searchResponse = await this.$store.$hcd.viewOwnedDataByCID(cid)
      } catch (e) {
        try {
          this.searchResponse = await this.$store.$hcd.viewSharedDataByCID(cid)
        } catch (e) {
          console.error('error', e)
          this.showNotification({ message: e.message || e, color: 'negative' })
          this.searchResponse = undefined
        }
      } finally {
        this.hideLoading()
      }
    },
    openFile () {
      console.log('openFile', this.searchResponse)
      window.open(URL.createObjectURL(this.searchResponse.payload), '_blank')
    },
    async loadMyDocuments () {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        const list = await this.$store.$hcd.getMyDocuments({ address: this.polkadotAddress })
        this.myDocsList = list.map(v => { return { ...v, isOwner: true } })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async loadMySharedDocuments () {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        const list = await this.$store.$hcd.getMySharedDocuments({ address: this.polkadotAddress })
        this.mySharedDocsList = list.map(v => { return { ...v, isShared: true } })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async loadSharedWithMeDocuments () {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        const list = await this.$store.$hcd.getSharedWithMeDocuments({ address: this.polkadotAddress })
        this.sharedWithMeDocsList = list.map(v => { return { ...v, isSharedWithMe: true } })
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async removeDocument (cid, shared) {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        await this.$store.$hcd.removeDoc({ cid, shared })
        this.updateAllList()
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
#response
  max-width: 100%
  width: 100%
  overflow: auto
  margin-top: 10px
</style>
