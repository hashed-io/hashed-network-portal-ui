<template lang="pug">
#container
  .text-body2.q-ma-sm My polkadot address: {{ polkadotAddress }}
  .row.reverse.q-my-sm
    q-btn(
      label="Add document"
      color="primary"
      icon="add"
      no-caps
      outline
      @click="modals.isShowingDocumentForm = true"
    )
  //- .row.full-width.q-gutter-x-sm
  //-   .col
  //-     q-card.q-pa-md
  //-       search-document-form(@onSubmit="searchDoc")
  //-       q-slide-transition
  //-         #response.q-pa-sm.bg-grey(v-show="searchResponse")
  //-           .text-caption {{ searchResponse }}
  //-           q-btn.float-right(dense no-caps label="See Document" @click="openFile" color="secondary")
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
          @onDownloadDocument="downloadDocument"
        )
      q-tab-panel(name="myShared")
        documents-list(
          :documents="mySharedDocsList"
          @onDownloadDocument="downloadDocument"
        )
      q-tab-panel(name="sharedWithMe")
        documents-list(
          :documents="sharedWithMeDocsList"
          @onRemoveDocument="v => removeDocument(v, true)"
          @onEditDocument="v => showEditDocument(v, true)"
          @onShareDocument="v => showShareDocument(v, true)"
          @onDownloadDocument="downloadDocument"
        )
  #modals
    q-dialog(v-model="modals.isShowingDocumentForm" @hide="addResponse = undefined")
      q-card.q-pa-md
        add-document-form(@onSubmit="addDoc" @onEditSubmitted="editMetadata" v-bind="documentFormProps")
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
      },
      documentFormProps: undefined
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
        this.showNotification({ message: 'Document added successfully' })
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
        return this.$store.$hcd.viewOwnedDataByCID(cid)
      } catch (e) {
        try {
          return this.$store.$hcd.viewSharedDataByCID(cid)
        } catch (e) {
          console.error('error', e)
          this.showNotification({ message: e.message || e, color: 'negative' })
          throw new Error(e)
        }
      } finally {
        this.hideLoading()
      }
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
        this.showNotification({ message: 'Document removed successfully' })
        this.updateAllList()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async editMetadata ({ cid, name, description }, shared) {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        await this.$store.$hcd.updateMetadata({ cid, name, description, shared })
        this.showNotification({ message: 'Metadata edited successfully' })
        this.updateAllList()
        this.modals.isShowingDocumentForm = false
        this.documentFormProps = undefined
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    showEditDocument (document, shared) {
      this.documentFormProps = {
        document,
        shared
      }
      this.modals.isShowingDocumentForm = true
    },
    async showShareDocument (document, shared) {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        const payload = await this.searchDoc(document.cid)
        this.documentFormProps = {
          payload,
          shared
        }
        this.modals.isShowingDocumentForm = true
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async downloadDocument (cid) {
      try {
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        const { payload } = await this.searchDoc(cid)
        this.openFile(payload)
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
