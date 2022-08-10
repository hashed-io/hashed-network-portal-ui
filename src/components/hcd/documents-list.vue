<template lang="pug">
#documentsList
  #empty(v-if="!documents || documents.length === 0")
    .text-body2.text-center There are not documents yet
  #list.q-gutter-y-sm(v-else)
    document-item(v-for="doc in documents" v-bind="doc" @onRemove="onRemoveDocument" @onEdit="onEditDocument" @onShare="onShareDocument")
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
  emits: ['onRemoveDocument', 'onEditDocument', 'onShareDocument'],
  methods: {
    onRemoveDocument (cid) {
      this.$emit('onRemoveDocument', cid)
    },
    onEditDocument (cid) {
      this.$emit('onEditDocument', cid)
    },
    onShareDocument (cid) {
      this.$emit('onShareDocument', cid)
    }
  }
}
</script>
