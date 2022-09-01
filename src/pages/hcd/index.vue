<template lang="pug">
#container
  .row.justify-between.q-mb-md
    .text-h5 {{ $t('pages.hcd.documents.documents') }}
    q-btn(
      :label="$t('pages.hcd.documents.addDocument')"
      color="primary"
      icon="add"
      no-caps
      outline
      @click="showAddDocument"
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
      q-tab(
        name="myDocs"
        :label="$t('pages.hcd.documents.myDocuments')"
        no-caps
      )
      q-tab(
        name="myShared"
        :label="$t('pages.hcd.documents.mySharedDocuments')"
        no-caps
      )
      q-tab(
        name="sharedWithMe"
        :label="$t('pages.hcd.documents.sharedWithMe')"
        no-caps
      )
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
          @onDownloadDocument="downloadDocument"
        )
  #modals
    q-dialog(v-model="modals.isShowingDocumentForm" @hide="addResponse = undefined")
      q-card.q-pa-lg.modalSize
        document-form(@onAddSubmitted="addDoc" @onShareSubmitted="addDoc" @onEditSubmitted="editMetadata" v-bind="documentFormProps")
        q-slide-transition
          #response.q-pa-sm.bg-grey(v-show="addResponse")
            .text-caption {{ addResponse }}
</template>

<script>
import DocumentForm from '~/components/hcd/document-form'
import SearchDocumentForm from '~/components/hcd/search-document-form'
import DocumentsList from '~/components/hcd/documents-list'
import { mapGetters } from 'vuex'

export default {
  name: 'HashedConfidentialDocument',
  components: { DocumentForm, SearchDocumentForm, DocumentsList },
  data () {
    return {
      addResponse: undefined,
      searchResponse: undefined,
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
  computed: {
    ...mapGetters('hcdWallet', ['polkadotAddress'])
  },
  async mounted () {
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
        this.showLoading({
          message: this.$t('pages.hcd.documents.loadingMessage')
        })
        let message
        if (form.isShared) {
          this.addResponse = await this.$store.$hcd.shareData({
            ...form
          })
          message = this.$t('pages.hcd.documents.successSharedMessage')
        } else {
          this.addResponse = await this.$store.$hcd.addOwnedData({
            ...form
          })
          message = this.$t('pages.hcd.documents.successAddedMessage')
        }
        this.showNotification({ message })
        this.modals.isShowingDocumentForm = false
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
          message: this.$t('pages.hcd.documents.loadingMessage')
        })
        const payload = await this.$store.$hcd.viewOwnedDataByCID(cid)
        return payload
      } catch (e) {
        try {
          const payload = await this.$store.$hcd.viewSharedDataByCID(cid)
          return payload
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
          message: this.$t('pages.hcd.documents.loadingMessage')
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
          message: this.$t('pages.hcd.documents.loadingMessage')
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
          message: this.$t('pages.hcd.documents.loadingMessage')
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
          message: this.$t('pages.hcd.documents.loadingMessage')
        })
        await this.$store.$hcd.removeDoc({ cid, shared })
        this.showNotification({ message: this.$t('pages.hcd.documents.successRemovedMessage') })
        this.updateAllList()
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async editMetadata ({ cid, name, description, shared }) {
      try {
        this.showLoading({
          message: this.$t('pages.hcd.documents.loadingMessage')
        })
        await this.$store.$hcd.updateMetadata({ cid, name, description, shared })
        this.showNotification({ message: this.$t('pages.hcd.documents.successEditedMetadataMessage') })
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
      const { name, description, cid } = document
      this.documentFormProps = {
        name,
        description,
        cid,
        isEditing: true,
        shared
      }
      this.modals.isShowingDocumentForm = true
    },
    showAddDocument () {
      this.documentFormProps = {
        isAdding: true
      }
      this.modals.isShowingDocumentForm = true
    },
    async showShareDocument (document, shared) {
      try {
        this.showLoading({
          message: this.$t('pages.hcd.documents.loadingMessage')
        })
        const response = await this.searchDoc(document.cid)
        const { name, description, payload, cid } = response
        this.documentFormProps = {
          name,
          description,
          payload,
          cid,
          isSharing: true,
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
          message: this.$t('pages.hcd.documents.loadingMessage')
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
