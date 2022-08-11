<template lang="pug">
q-item.bg-grey-4(clickable="false")
    q-item-section
      q-item-label.text-bold {{ name }}
      q-item-label.text-caption {{ description }}
      q-item-label.text-caption(v-if="isSharedWithMe") From: {{ from }}
      q-item-label.text-caption(v-if="isShared") To: {{ to }}
    q-item-section(avatar)
      .row.q-gutter-sm
        q-icon.icon-btn(v-if="canRemove" name="delete" color="negative" size="sm" @click="onRemoveClick")
          q-tooltip Remove
        q-icon.icon-btn(v-if="canEditMetadata" name="edit" color="positive" size="sm" @click="onEditClick")
          q-tooltip Edit metadata
        q-icon.icon-btn(v-if="canShare" name="share" color="positive" size="sm" @click="onShareClick")
          q-tooltip Share with other user
</template>

<script>
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
    from: {
      type: String,
      default: undefined
    },
    to: {
      type: String,
      default: undefined
    },
    payload: {
      type: String,
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
  emits: ['onRemove', 'onEdit', 'onShare'],
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
    onRemoveClick () {
      this.$emit('onRemove', this.cid)
    },
    onEditClick () {
      this.$emit('onEdit', this.cid)
    },
    onShareClick () {
      this.$emit('onShare', this.cid)
    }
  }
}
</script>
