<template lang='pug'>
#container
  .text-h5.q-pb-lg {{$t('pages.hcd.afloat.createAsset')}}
  q-card(flat)
    q-card-section
      pre {{attributes}}
      q-btn(
        :label="$t('pages.marketplace.taxCredits.buttons.addAttribute')"
        color="primary"
        rounded
        no-caps
        icon="add"
        @click="onAddAttribute"
      ).q-my-lg
      q-form(ref="taxCreditForm" @submit="onSubmitTaxCredit")
        //- NFTInput(
        //-   v-for="(attribute, index) in attributes"
        //-   :key="index"
        //-   :index="index"
        //-   :rulesLabel="[rules.required]"
        //-   :rulesValue="[rules.required]"
        //-   v-model:label="attributes[index].label"
        //-   v-model:value="attributes[index].value"
        //-   @onRemoveAttribute="onRemoveAttribute"
        //- )
        template(v-for="(attribute, index) in attributes" :key="index")
          .row.q-col-gutter-md.q-py-md
            .col-3
              h-input(
                  v-model="attributes[index].label"
                  dense
                )
            .col-5
              h-input(
                v-if="attributes[index].state === 'plain' && !attributes[index].isFile"
                v-model="attributes[index].value"
                dense
              )
              h-input(
                v-if="attributes[index].state === 'ipfs' && !attributes[index].isFile"
                v-model="attributes[index].value"
                dense
              )
              q-file(
                v-if="attributes[index].state === 'ipfs' && attributes[index].isFile"
                v-model="attributes[index].value"
                dense
                outlined
              )
              q-toggle(
                v-if="attributes[index].state === 'ipfs'"
                v-model="attributes[index].isFile"
                color="secondary"
                :label="$t('pages.marketplace.taxCredits.labels.isFile')"
                unchecked-icon="text_fields"
                checked-icon="attach_file"
                left-label
              )
              q-option-group(
                v-model="attributes[index].state"
                :options="options"
                color="primary"
                inline
                dense
              )
            .col-4
              q-btn(
                @click="onRemoveAttribute(index)"
                color="primary"
                label="delete attribute"
                rounded
              )
        q-btn.col-6.q-mt-md(
          :label="$t('pages.marketplace.taxCredits.buttons.createUnique')"
          type="submit"
          color='primary'
          icon="add"
          rounded
          no-caps
        )
        q-btn(
          @click="callExtrinsic"
        )
</template>
<script>
import { validation } from '~/mixins/validation'
import NFTInput from '~/components/marketplace/NFTs/NFT-input.vue'
export default {
  name: 'NFTForm',
  components: {
    NFTInput
  },
  mixins: [validation],
  emits: ['onSubmitTax'],
  data () {
    return {
      attributes: [
        {
          label: undefined,
          value: undefined,
          state: 'plain',
          isFile: false
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
          disable: true
        }
      ]

    }
  },
  methods: {
    async callExtrinsic () {
    // Create with Attributes
      try {
        this.showLoading()
        await this.$store.$afloatApi.createAsset({
          collectionId: undefined,
          assetId: 0,
          uniquesPublicAttributes: {
            title: 'My tax credit'
          },
          plaintextSaveToIPFS: {
            data: {
              ssn: '12313123'
            },
            files: {
              filename1: 'File1212'
            }
          },
          encryptoThenSaveToIPFS: {
            // data: {
            //   ssn121212: '12313123'
            // },
            // files: {
            //   filename112: 'File121212'
            // }
          }
        })
      } catch (error) {
        console.log(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
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
        isFile: false
      })
    },
    // async onSubmitTaxCredit () {
    //   const isValid = await this.$refs.taxCreditForm.validate()
    //   if (isValid) {
    //     let containFile = false
    //     const processedData = this.attributes.map(attribute => {
    //       if (attribute.value instanceof File) {
    //         containFile = true
    //       }
    //       return [
    //         attribute.label,
    //         attribute.value
    //       ]
    //     })
    //     this.$emit('onSubmitTax', processedData, containFile)
    //   }
    // }
    async onSubmitTaxCredit () {
      const isValid = await this.$refs.taxCreditForm.validate()
      if (isValid) {
        this.attributes.forEach(attributes => {

        })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
