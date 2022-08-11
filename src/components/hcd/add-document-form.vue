<template lang="pug">
#container
    .text-subtitle1(v-if="isSharing") Share document
    .text-subtitle1(v-else-if="isEditing") Edit document metadata
    .text-subtitle1(v-else) Share document
    q-form.q-gutter-sm(@submit="onSubmit")
        q-input(
          label="Name"
          v-model="name"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-input(
          label="Description"
          v-model="description"
          outlined
          :rules="[rules.required]"
          :readonly="isSharing"
        )
        q-file(
          v-model="formPayload"
          outlined
          label="Payload"
          :rules="[rules.required]"
          v-if="!isEditing"
          :readonly="isSharing"
        )
        q-toggle(
          label="Share with other user"
          v-model="isShared"
          v-if="!isEditing && !isSharing"
        )
        q-slide-transition
            account-input(
                label="Polkadot address to share"
                v-model="toUserAddress"
                outlined
                :rules="[rules.required]"
                v-if="isShared"
            )
        .row
            q-btn(
              :label="isEditing ? 'Save' : 'Add'"
              no-caps
              color="primary"
              type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'AddDocumentForm',
  mixins: [validation],
  props: {
    document: {
      type: Object,
      default: () => undefined
    },
    payload: {
      type: Object,
      default: () => undefined
    }
  },
  emits: ['onSubmit', 'onEditSubmitted'],
  data () {
    return {
      name: undefined,
      description: undefined,
      formPayload: undefined,
      isShared: false,
      toUserAddress: undefined,
      cid: undefined
    }
  },
  computed: {
    isEditing () {
      return !!(this.document && !this.payload)
    },
    isSharing () {
      if (this.payload) {
        return true
      }
      return false
    }
  },
  mounted () {
    if (this.isEditing) {
      const { name, description, cid } = this.document
      this.name = name
      this.description = description
      this.cid = cid
    } else if (this.isSharing) {
      const { name, description, cid, payload } = this.payload
      this.name = name
      this.description = description
      this.cid = cid
      this.formPayload = payload
      this.isShared = true
    }
  },
  methods: {
    onSubmit () {
      if (this.isEditing) {
        this.$emit('onEditSubmitted', {
          name: this.name,
          description: this.description,
          cid: this.cid
        })
      } else {
        this.$emit('onSubmit', {
          name: this.name,
          description: this.description,
          payload: this.formPayload,
          isShared: this.isShared,
          toUserAddress: this.toUserAddress
        })
      }
    }
  }
}
</script>
