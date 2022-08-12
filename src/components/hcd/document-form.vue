<template lang="pug">
#container
    .text-subtitle1(v-if="isSharing") {{ $t('pages.hcd.documents.shareDocument') }}
    .text-subtitle1(v-else-if="isEditing") {{ $t('pages.hcd.documents.editDocumentMetadata') }}
    .text-subtitle1(v-else-if="isAdding") {{ $t('pages.hcd.documents.addDocument') }}
    q-form.q-gutter-sm(@submit="onSubmit")
        q-input(
          :label="$t('pages.hcd.documents.name')"
          v-model="form.name"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-input(
          :label="$t('pages.hcd.documents.description')"
          v-model="form.description"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-file(
          v-model="form.payload"
          outlined
          :label="$t('pages.hcd.documents.file')"
          :rules="[rules.required]"
          v-if="!isEditing"
          :readonly="isSharing"
        )
        q-toggle(
          :label="$t('pages.hcd.documents.shareWithOtherUser')"
          v-model="form.isShared"
          v-if="!isEditing && !isSharing"
        )
        q-slide-transition
            account-input(
              :label="$t('pages.hcd.documents.polkadotAddressToShare')"
              v-model="form.toUserAddress"
              outlined
              :rules="[rules.required]"
              v-if="form.isShared"
              :autofocus="isSharing"
            )
        .row.reverse
            q-btn(
              :label="submitBtnLabel"
              no-caps
              color="primary"
              type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'DocumentForm',
  mixins: [validation],
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
    payload: {
      type: Object,
      default: () => undefined
    },
    isEditing: {
      type: Boolean,
      default: () => false
    },
    isAdding: {
      type: Boolean,
      default: () => false
    },
    isSharing: {
      type: Boolean,
      default: () => false
    },
    shared: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['onShareSubmitted', 'onEditSubmitted', 'onAddSubmitted'],
  data () {
    return {
      form: {
        name: undefined,
        description: undefined,
        payload: undefined,
        isShared: false,
        toUserAddress: undefined,
        cid: undefined
      }
    }
  },
  computed: {
    submitBtnLabel () {
      if (this.isAdding) {
        return this.$t('pages.hcd.documents.addDocument')
      } else if (this.isEditing) {
        return this.$t('pages.hcd.documents.saveDocument')
      } else if (this.isSharing) {
        return this.$t('pages.hcd.documents.shareDocument')
      }
      return ''
    }
  },
  mounted () {
    if (this.isEditing) {
      this.form.name = this.name
      this.form.description = this.description
      this.form.cid = this.cid
    } else if (this.isSharing) {
      this.form.name = this.name
      this.form.description = this.description
      this.form.cid = this.cid
      this.form.payload = this.payload
      this.form.isShared = true
    }
  },
  methods: {
    onSubmit () {
      if (this.isEditing) {
        this.$emit('onEditSubmitted', {
          name: this.form.name,
          description: this.form.description,
          cid: this.form.cid,
          shared: this.shared
        })
      } else if (this.isSharing) {
        this.$emit('onShareSubmitted', {
          name: this.form.name,
          description: this.form.description,
          payload: this.form.payload,
          isShared: this.form.isShared,
          toUserAddress: this.form.toUserAddress
        })
      } else if (this.isAdding) {
        this.$emit('onAddSubmitted', {
          name: this.form.name,
          description: this.form.description,
          payload: this.form.payload,
          isShared: this.form.isShared,
          toUserAddress: this.form.toUserAddress
        })
      }
    }
  }
}
</script>
