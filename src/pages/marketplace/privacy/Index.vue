<template lang="pug">
#container
  .text-h6 {{$t('pages.marketplace.privacy.title')}}
  .row.q-col-gutter-xl
    .col-6
      .text-h6.q-py-md {{$t('pages.marketplace.privacy.uploadSection.title')}}
      .row.q-gutter-md
        .col-12
          q-file(
            v-model="file"
            :label="$t('pages.marketplace.privacy.uploadSection.fileInput')"
            outlined
          )
        .col-12(v-if="isChecked")
          account-input(
            v-model="accountToShare"
            :rules="[rules.isValidPolkadotAddress]"
            :label="$t('pages.marketplace.privacy.uploadSection.custodian')"
            outlined
          )
          q-btn(
            @click="clearUpload"
            color="primary"
          ) {{$t('pages.marketplace.privacy.buttons.clear')}}

          q-toggle(
            v-model="isChecked"
            :label="$t('pages.marketplace.privacy.uploadSection.shareFile')"
            color="primary"
            label-position="left"
            label-width="100px"
            outlined
          )
        .col-12 {{$t('pages.marketplace.privacy.query')}} {{getFilename}}
        .col-12
          pre {{$t('pages.marketplace.privacy.response')}} {{responseUpload}}
    .col-6
      .text-h6.q-py-md {{$t('pages.marketplace.privacy.downloadSection.title')}}
      .row.q-gutter-md
        .col-12
          q-input(
            outlined
            v-model="query"
            :label="$t('pages.marketplace.privacy.downloadSection.cidInput')"
          )
        .col-12
          q-btn(
            @click="clearDownload"
            color="primary"
          ) {{$t('pages.marketplace.privacy.buttons.clear')}}
          q-toggle(
            v-model="toggleDownload"
            :label="$t('pages.marketplace.privacy.downloadSection.isShareData')"
          )
        .col-12 {{$t('pages.marketplace.privacy.query')}} {{query}}
        .col-12
          pre {{$t('pages.marketplace.privacy.response')}} {{getUploadResponse}}
        .col-12
          q-btn(
            color="primary"
            v-if="getUploadResponse.payload"
            @click="openFile"
          ) {{$t('pages.marketplace.privacy.buttons.openFile')}}
</template>

<script>
import { authentication } from '~/mixins/authentication'
import { validation } from '~/mixins/validation'
import AccountInput from '~/components/common/account-input.vue'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'PageIndex',
  components: {
    AccountInput
  },
  mixins: [validation, authentication],
  data () {
    return {
      isChecked: false,
      toggle: false,
      file: undefined,
      accountToShare: undefined,
      responseUpload: {
        cid: undefined,
        name: undefined,
        description: undefined,
        payload: undefined,
        type: undefined
      },
      query: undefined,
      toggleDownload: false,
      getUploadResponse: {
        cid: undefined,
        name: undefined,
        description: undefined,
        payload: undefined,
        type: undefined
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['isLoggedIn', 'selectedAccount']),
    getFilename () {
      return this.file?.name ? this.file.name : undefined
    }
  },
  watch: {
    selectedAccount () {
      this.clearUpload()
      this.clearDownload()
    }
  },
  methods: {
    // ...mapMutations('polkadotWallet', ['setIsLoggedIn']),
    openFile () {
      if (this.getUploadResponse.payload && this.getUploadResponse.payload instanceof File) {
        window.open('https://ipfs.io/ipfs/' + this.getUploadResponse.cid)
        const blob = new Blob([this.getUploadResponse.payload], { type: this.getUploadResponse.payload.type })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.getUploadResponse.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        this.showNotification({ message: this.$t('pages.marketplace.privacy.uploadSection.noFileToOpen'), color: 'negative' })
      }
    },
    matchDataViewByCID (response) {
      this.getUploadResponse.cid = response.cid
      this.getUploadResponse.name = response.name
      this.getUploadResponse.description = response.description
      this.getUploadResponse.payload = response.payload
      this.getUploadResponse.type = response.type
    },
    matchDataUpsert (response) {
      this.responseUpload.cid = response.cid
      this.responseUpload.name = response.name
      this.responseUpload.description = response.description
      this.responseUpload.payload = response.payload
      this.responseUpload.type = response.type
    },
    matchDataShare (response) {
      this.responseUpload.cid = response.sharedData.cid
      this.responseUpload.name = response.sharedData.name
      this.responseUpload.description = response.sharedData.description
      this.responseUpload.payload = response.sharedData.payload
      this.responseUpload.type = response.sharedData.type
    },
    clearUpload () {
      this.file = undefined
      this.responseUpload.cid = undefined
      this.responseUpload.name = undefined
      this.responseUpload.description = undefined
      this.responseUpload.payload = undefined
      this.responseUpload.type = undefined
      this.accountToShare = undefined
    },
    clearDownload () {
      this.query = undefined
      this.getUploadResponse.cid = undefined
      this.getUploadResponse.name = undefined
      this.getUploadResponse.description = undefined
      this.getUploadResponse.payload = undefined
      this.getUploadResponse.type = undefined
    }
  }
})
</script>
