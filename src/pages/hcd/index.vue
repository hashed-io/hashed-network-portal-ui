<template lang="pug">
#container
  //-   .text-subtitle1.q-ml-sm HCD
  .text-body2.q-ma-sm My polkadot address: {{ polkadotAddress }}
  .row.full-width.q-gutter-x-sm
    .col
      q-card.q-pa-md
       .text-subtitle1 Add document
       q-form.q-gutter-sm(@submit="addDoc")
        q-input(
          label="Name"
          v-model="form.name"
          outlined
          :rules="[rules.required]"
        )
        q-input(
          label="Description"
          v-model="form.description"
          outlined
          :rules="[rules.required]"
        )
        q-file(
          v-model="form.payload"
          outlined
          label="Payload"
          :rules="[rules.required]"
        )
        q-toggle(
          label="Share with other user"
          v-model="form.isShared"
        )
        q-slide-transition
            account-input(
                label="Polkadot address to share"
                v-model="form.toUserAddress"
                outlined
                :rules="[rules.required]"
                v-if="form.isShared"
            )
        .row
            q-btn(
              label="Add"
              no-caps
              color="primary"
              type="submit"
            )
        q-slide-transition
          #response.q-pa-sm.bg-grey(v-show="addResponse")
            .text-caption {{ addResponse }}
    .col
       q-card.q-pa-md
         .text-subtitle1 Search document
         q-form.q-gutter-sm(@submit="searchDoc")
            q-input(
              label="CID"
              v-model="cid"
              outlined
              :rules="[rules.required]"
            )
            .row
             q-btn(
               label="Search document"
               no-caps
               color="primary"
               type="submit"
             )
            q-slide-transition
              #response.q-pa-sm.bg-grey(v-show="searchResponse")
                .text-caption {{ searchResponse }}
                q-btn.float-right(dense no-caps label="See Document" @click="openFile" color="secondary")
</template>

<script>
import { validation } from '~/mixins/validation'
import AccountInput from '~/components/common/account-input.vue'
export default {
  name: 'HashedConfidentialDocument',
  components: { AccountInput },
  mixins: [validation],
  data () {
    return {
      form: {
        name: undefined,
        description: undefined,
        payload: undefined,
        isShared: false,
        toUserAddress: undefined
      },
      addResponse: undefined,
      cid: 'QmdgoVCDTtoEwnZR6J5e2dLnzYTc6qsFfRoyuiXRquNBKh',
      searchResponse: undefined,
      polkadotAddress: undefined
    }
  },
  async mounted () {
    this.polkadotAddress = await this.$store.$hcd.getPolkadotAddress()
  },
  methods: {
    async addDoc () {
      try {
        console.log('addDocs', this.form)
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        if (this.form.isShared) {
          this.addResponse = await this.$store.$hcd.shareData({
            ...this.form
          })
        } else {
          this.addResponse = await this.$store.$hcd.addOwnedData({
            ...this.form
          })
        }
        /// "QmdgoVCDTtoEwnZR6J5e2dLnzYTc6qsFfRoyuiXRquNBKh"
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
        this.addResponse = undefined
      } finally {
        this.hideLoading()
      }
    },
    async searchDoc () {
      try {
        console.log('searchDoc', this.cid)
        this.showLoading({
          message: 'Waiting for Hashed Confidential Documents'
        })
        this.searchResponse = await this.$store.$hcd.viewOwnedDataByCID(this.cid)
      } catch (e) {
        try {
          this.searchResponse = await this.$store.$hcd.viewSharedDataByCID(this.cid)
        } catch (e) {
          console.error('error', e)
          this.showNotification({ message: e.message || e, color: 'negative' })
          this.searchResponse = undefined
        }
      } finally {
        this.hideLoading()
      }
    },
    openFile () {
      console.log('openFile', this.searchResponse)
      window.open(URL.createObjectURL(this.searchResponse.payload), '_blank')
    }
  }
}
</script>

<style lang="stylus" scoped>
#response
  max-width: 100%
  width: 100%
  overflow: auto
</style>
