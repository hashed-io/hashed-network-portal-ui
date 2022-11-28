<template lang="pug">
#container
  .text-h5.q-pb-lg {{$t('pages.marketplace.taxCredits.createNFTFormTitle')}}
  q-card(flat)
    q-card-section
      q-form(ref="taxCreditForm" @submit="onSubmitForm")
        div
          h-input.col-8(
            v-model="metadata"
            :rules="[rules.required]"
            label="The name of the NFT"
            dense
            testid="metadata"
          )
        q-btn(
          :label="$t('pages.marketplace.taxCredits.buttons.addAttribute')"
          color="primary"
          outline
          no-caps
          icon="add"
          @click="onAddAttribute"
          data-testid="add-attribute"
        ).q-my-lg
        template(v-for="(attribute, index) in attributes" :key="index")
          .row.q-col-gutter-sm.q-py-md
            .col-3
              h-input(
                  v-model="attributes[index].label"
                  dense
                  testid="nft-label"
                )
            .col-5
              h-input(
                v-if="attributes[index].state === 'plain' && !attributes[index].isFile.state"
                v-model="attributes[index].value"
                :rules="[rules.required]"
                dense
                testid="nft-plaintext"
              )
              h-input(
                v-if="(attributes[index].state === 'ipfs' || attributes[index].state === 'hcd') && !attributes[index].isFile.state"
                v-model="attributes[index].value"
                :rules="[rules.required]"
                dense
              )
              q-file(
                v-if="(attributes[index].state === 'ipfs' || attributes[index].state === 'hcd') && attributes[index].isFile.state"
                v-model="attributes[index].value"
                :rules="[rules.required]"
                :label="isHCD(attribute) ? 'File Uploaded' : undefined"
                dense
                outlined
                data-testid="nft-file"
              )
              q-toggle(
                v-if="attributes[index].state === 'ipfs' || attributes[index].state === 'hcd'"
                v-model="attributes[index].isFile.state"
                :rules="[rules.required]"
                color="secondary"
                :label="$t('pages.marketplace.taxCredits.labels.isFile')"
                unchecked-icon="text_fields"
                checked-icon="attach_file"
                left-label
                data-testid="toggle"
              )
              q-option-group(
                v-model="attributes[index].state"
                :options="options"
                color="primary"
                inline
                dense
                data-testid="options-group"
              )
            .col-4
              q-btn.q-mx-sm(
                @click="onRemoveAttribute(index)"
                color="primary"
                label="delete attribute"
                outline
              )
              q-btn(
                v-if="attributes[index].state === 'hcd' && !attributes[index].isFile.uploaded"
                @click="onUploadHCD(index)"
                color="primary"
                label="Upload to HCD"
                outline
              )
        q-btn.col-6.q-mt-md(
          :label="$t('pages.marketplace.taxCredits.buttons.createUnique')"
          type="submit"
          color='primary'
          icon="add"
          outline
          no-caps
          data-testid="submit-btn"
        )
</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'NFTForm',
  components: {
  },
  mixins: [validation],
  props: {
    adminMarketAddress: {
      type: String,
      default: undefined
    }
  },
  emits: ['onSubmitForm'],
  data () {
    return {
      prefixHCD: 'HCD:',
      metadata: undefined,
      attributes: [
        {
          label: undefined,
          value: undefined,
          state: 'plain',
          isFile: {
            state: false,
            uploaded: false
          }
        }
      ],
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
    onRemoveAttribute (index) {
      if (this.attributes.length > 1) {
        this.attributes.splice(index, 1)
      } else {
        this.showNotification({ message: 'You must have at least one attribute', color: 'negative' })
      }
    },
    onAddAttribute () {
      this.attributes.push({
        label: undefined,
        value: undefined,
        state: 'plain',
        isFile: {
          state: false,
          uploaded: false
        }
      })
    },
    async onSubmitForm () {
      /**
       * Emit the data from the Form with the correct structure
       */
      if (await this.$refs.taxCreditForm.validate()) {
        this.$emit('onSubmitForm', { attributes: this.attributes, metadata: this.metadata })
      }
    },
    async onUploadHCD (index) {
      try {
        this.showLoading()

        const { label, value } = this.attributes[index]
        console.log({ label, value })

        const { cid } = this.adminMarketAddress
          ? await this.$store.$hcd.shareData({ toUserAddress: this.adminMarketAddress, name: label, description: label, payload: value })
          : await this.$store.$hcd.addOwnedData({ name: label, description: label, payload: value })

        if (cid) {
          this.attributes[index].value = this.prefixHCD + cid
          this.attributes[index].isFile.uploaded = true
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
