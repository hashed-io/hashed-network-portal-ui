<template lang="pug">
#documentsList
  #empty(v-if="!documents || documents.length === 0")
    .text-body2.text-center {{ $t('pages.hcd.documents.thereAreNotDocumentsYet') }}
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
export default {
  name: 'DocumentsList',
  components: { DocumentItem },
  props: {
    documents: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onRemoveDocument', 'onEditDocument', 'onShareDocument', 'onDownloadDocument'],
  methods: {
    onRemoveDocument (cid) {
      this.$emit('onRemoveDocument', cid)
    },
    onEditDocument (document) {
      this.$emit('onEditDocument', document)
    },
    onShareDocument (cid) {
      this.$emit('onShareDocument', cid)
    },
    onDownloadDocument (cid) {
      this.$emit('onDownloadDocument', cid)
    }
  }
}
</script>
