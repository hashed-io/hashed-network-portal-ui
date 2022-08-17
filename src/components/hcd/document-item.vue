<template lang="pug">
q-item.bg-grey-4(:clickable="false")
    q-item-section
      q-item-label.text-bold {{ name }}
      q-item-label.text-caption {{ description }}
      q-item-label.text-caption(v-if="isSharedWithMe") {{ $t('pages.hcd.documents.from') }}: {{ from }}
      q-item-label.text-caption(v-if="isShared") {{ $t('pages.hcd.documents.to') }}: {{ to }}
    q-item-section(avatar)
      .row.q-gutter-sm
        q-icon.icon-btn(name="download" color="info" size="sm" @click="onDownloadClick" data-testid="downloadBtn")
          q-tooltip {{ $t('pages.hcd.documents.downloadFile') }}
        q-icon.icon-btn(v-if="canEditMetadata" name="edit" color="positive" size="sm" @click="onEditClick" data-testid="editBtn")
          q-tooltip {{ $t('pages.hcd.documents.editMetadata') }}
        q-icon.icon-btn(v-if="canShare" name="share" color="positive" size="sm" @click="onShareClick" data-testid="shareBtn")
          q-tooltip {{ $t('pages.hcd.documents.shareWithOtherUser') }}
        q-icon.icon-btn(v-if="canRemove" name="delete" color="negative" size="sm" @click="onRemoveClick" data-testid="removeBtn")
          q-tooltip {{ $t('pages.hcd.documents.remove') }}
</template>

<script>
/**
 * This component shows document info and handles clicks on actions buttons
 */
export default {
  name: 'DocumentItem',
  props: {
    name: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    cid: {
      type: String,
      default: undefined
    },
    owner: {
      type: String,
      default: undefined
    },
    /**
     * Polkadot Address
     */
    from: {
      type: String,
      default: undefined
    },
    /**
     * Polkadot Address
     */
    to: {
      type: String,
      default: undefined
    },
    /**
     * File payload
     */
    payload: {
      type: [File, String],
      default: undefined
    },
    isOwner: {
      type: Boolean,
      default: false
    },
    isSharedWithMe: {
      type: Boolean,
      default: false
    },
    isShared: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onRemove', 'onEdit', 'onShare', 'onDownload'],
  computed: {
    canRemove () {
      return !!(this.isOwner || this.isSharedWithMe)
    },
    canEditMetadata () {
      return !!(this.isOwner || this.isSharedWithMe)
    },
    canShare () {
      return !!(this.isOwner)
    }
  },
  methods: {
    onDownloadClick () {
      /**
       * Emitted when click on download action button
       */
      this.$emit('onDownload', this.cid)
    },
    onRemoveClick () {
      /**
       * Emitted when click on remove action button
       */
      this.$emit('onRemove', this.cid)
    },
    onEditClick () {
      /**
       * Emitted when click on edit action button
       */
      this.$emit('onEdit', {
        name: this.name,
        description: this.description,
        cid: this.cid
      })
    },
    onShareClick () {
      /**
       * Emitted when click on share action button
       */
      this.$emit('onShare', {
        name: this.name,
        description: this.description,
        cid: this.cid
      })
    }
  }
}
</script>
