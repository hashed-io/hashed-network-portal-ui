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
          data-testid="nameInput"
        )
        q-input(
          :label="$t('pages.hcd.documents.description')"
          v-model="form.description"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
          data-testid="descriptionInput"
        )
        q-file(
          v-model="form.payload"
          outlined
          :label="$t('pages.hcd.documents.file')"
          :rules="[rules.required]"
          v-if="!isEditing"
          :readonly="isSharing"
          data-testid="fileInput"
        )
        q-toggle(
          :label="$t('pages.hcd.documents.shareWithOtherUser')"
          v-model="form.isShared"
          v-if="!isEditing && !isSharing"
          data-testid="shareToggleInput"
        )
        q-slide-transition
            account-input(
              :label="$t('pages.hcd.documents.polkadotAddressToShare')"
              v-model="form.toUserAddress"
              outlined
              :rules="[rules.required, rules.isValidPolkadotAddress]"
              v-if="form.isShared"
              :autofocus="isSharing"
              localTestId="accInput"
            )
        .row.reverse
            q-btn(
              :label="submitBtnLabel"
              no-caps
              color="primary"
              type="submit"
              data-testid="submitBtn"
            )
</template>

<script>
import { validation } from '~/mixins/validation'

/**
 * This form handles the cases to add, edit and share documents
 */
export default {
  name: 'DocumentForm',
  mixins: [validation],
  props: {
    /**
     * Name
     */
    name: {
      type: String,
      default: undefined
    },
    /**
     * Description
     */
    description: {
      type: String,
      default: undefined
    },
    /**
     * CID
     */
    cid: {
      type: String,
      default: undefined
    },
    /**
     * Payload or document file
     */
    payload: {
      type: Object,
      default: () => undefined
    },
    /**
     * Flat to indicate is editing
     */
    isEditing: {
      type: Boolean,
      default: () => false
    },
    /**
     * Flat to indicate is adding
     */
    isAdding: {
      type: Boolean,
      default: () => false
    },
    /**
     * Flat to indicate is sharing
     */
    isSharing: {
      type: Boolean,
      default: () => false
    },
    /**
     * Flat to indicate is editing a shared document
     */
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
        /**
         * Called when a request to edit document is passed
         */
        this.$emit('onEditSubmitted', {
          name: this.form.name,
          description: this.form.description,
          cid: this.form.cid,
          shared: this.shared
        })
      } else if (this.isSharing) {
        /**
         * Called when a request to share document is passed
         */
        this.$emit('onShareSubmitted', {
          name: this.form.name,
          description: this.form.description,
          payload: this.form.payload,
          isShared: this.form.isShared,
          toUserAddress: this.form.toUserAddress
        })
      } else if (this.isAdding) {
        /**
         * Called when a request to add document is passed
         */
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
