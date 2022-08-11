<template lang="pug">
#container
    .text-subtitle1(v-if="isSharing") Share document
    .text-subtitle1(v-else-if="isEditing") Edit document metadata
    .text-subtitle1(v-else-if="isAdding") Add document
    q-form.q-gutter-sm(@submit="onSubmit")
        q-input(
          label="Name"
          v-model="form.name"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-input(
          label="Description"
          v-model="form.description"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-file(
          v-model="form.payload"
          outlined
          label="Payload"
          :rules="[rules.required]"
          v-if="!isEditing"
          :readonly="isSharing"
        )
        q-toggle(
          label="Share with other user"
          v-model="form.isShared"
          v-if="!isEditing && !isSharing"
        )
        q-slide-transition
            account-input(
              label="Polkadot address to share"
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
        return 'Add document'
      } else if (this.isEditing) {
        return 'Save document'
      } else if (this.isSharing) {
        return 'Share document'
      }
      return 'Add'
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
