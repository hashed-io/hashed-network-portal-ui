<template lang="pug">
.row.q-col-gutter-sm.q-py-md
  .col-3
    h-input(
        v-model="attribute.label"
        dense
      )
  .col-5
    h-input(
      v-if="attribute.state === 'plain' && !attribute.isFile.state"
      v-model="attributes[index].value"
      dense
    )
    h-input(
      v-if="(attribute.state === 'ipfs' || attribute.state === 'hcd') && !attribute.isFile.state"
      v-model="attributes[index].value"
      dense
    )
    q-file(
      v-if="(attribute.state === 'ipfs' || attribute.state === 'hcd') && attribute.isFile.state"
      v-model="attribute.value"
      :label="isHCD(attribute) ? 'File Uploaded' : undefined"
      dense
      outlined
    )
    q-toggle(
      v-if="attribute.state === 'ipfs' || attribute.state === 'hcd'"
      v-model="attribute.isFile.state"
      color="secondary"
      :label="$t('pages.marketplace.taxCredits.labels.isFile')"
      unchecked-icon="text_fields"
      checked-icon="attach_file"
      left-label
    )
    q-option-group(
      v-model="attribute.state"
      :options="options"
      color="primary"
      inline
      dense
    )
  .col-4
    q-btn.q-mx-sm(
      @click="onRemoveAttribute(index)"
      color="primary"
      label="delete attribute"
      rounded
    )
    q-btn(
      v-if="attribute.state === 'hcd' && !attribute.isFile.uploaded"
      @click="onUploadHCD(index)"
      color="primary"
      label="Upload to HCD"
      rounded
    )
</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'NFTForm',
  mixins: [validation],
  emits: ['onSubmitForm'],
  data () {
    return {
      prefixHCD: 'HCD:',
      attribute: {
        label: undefined,
        value: undefined,
        state: 'plain',
        isFile: {
          state: false,
          uploaded: false
        }
      },
      options: [
        {
          label: 'IPFS',
          value: 'ipfs'
        },
        {
          label: 'Plaintext',
          value: 'plain',
          disable: false
        },
        {
          label: 'Confidential documents',
          value: 'hcd',
          disable: false
        }
      ]

    }
  },
  methods: {
    isHCD ({ value }) {
      if (typeof value === 'object') return false
      return value?.includes(this.prefixHCD)
    },
    // onRemoveAttribute (index) {
    //   if (this.attributes.length > 1) {
    //     this.attributes.splice(index, 1)
    //   } else {
    //     this.showNotification({ message: 'You must have at least one attribute', color: 'negative' })
    //   }
    // },
    // onAddAttribute () {
    //   this.attributes.push({
    //     label: undefined,
    //     value: undefined,
    //     state: 'plain',
    //     isFile: {
    //       state: false,
    //       uploaded: false
    //     }
    //   })
    // },
    async onSubmitForm () {
      /**
         * Emit the data from the Form with the correct structure
         */
      if (await await this.$refs.taxCreditForm.validate()) {
        this.$emit('onSubmitForm', this.attributes)
      }
    },
    async onUploadHCD (index) {
      try {
        this.showLoading()
        const { label, value } = this.attributes[index]
        const { cid } = await this.$store.$hcd.addOwnedData({ name: label, description: label, payload: value })
        if (cid) {
          this.attributes.value = this.prefixHCD + cid
          this.attributes.isFile.uploaded = true
        }
        this.showNotification({ message: 'File uploaded successfully to Confidential Documents' })
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
  <style lang='stylus' scoped>

  </style>
