<template lang="pug">
#documentsList
  #empty(v-if="!documents || documents.length === 0")
    .text-body2.text-center(data-testid="emptyLabel") {{ $t('pages.hcd.documents.thereAreNotDocumentsYet') }}
  #list.q-gutter-y-sm(v-else)
    document-item(
      v-for="doc in documents"
      v-bind="doc"
      @onRemove="onRemoveDocument"
      @onEdit="onEditDocument"
      @onShare="onShareDocument"
      @onDownload="onDownloadDocument"
    )
</template>

<script>
import DocumentItem from '~/components/hcd/document-item'

/**
 * This component show a list using DocumentItem and handles actions emitted by children
 */
export default {
  name: 'DocumentsList',
  components: { DocumentItem },
  props: {
    /** Array of documents, please see DocumentItem reference */
    documents: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onRemoveDocument', 'onEditDocument', 'onShareDocument', 'onDownloadDocument'],
  methods: {
    onRemoveDocument (cid) {
      /**
       * Emitted when a children item is clicked on remove
       */
      this.$emit('onRemoveDocument', cid)
    },
    onEditDocument (document) {
      /**
       * Emitted when a children item is clicked on edit
       */
      this.$emit('onEditDocument', document)
    },
    onShareDocument (cid) {
      /**
       * Emitted when a children item is clicked on share
       */
      this.$emit('onShareDocument', cid)
    },
    onDownloadDocument (cid) {
      /**
       * Emitted when a children item is clicked on download
       */
      this.$emit('onDownloadDocument', cid)
    }
  }
}
</script>
