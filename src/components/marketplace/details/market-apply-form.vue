<template lang="pug">
#container
  .container.q-py-md
    .row.justify-center
      .col-11
        .text-h5.q-pb-md {{$t('pages.marketplace.applyForm.title')}}
        .text-subtitle.q-pb-md.text-red {{$t('pages.marketplace.applyForm.subtitle')}}
        q-form(ref="applyForm" @submit="onSubmit")
          .row.justify-between.items-center
            .col-11
              h-input(
                required
                data-cy="notes_input"
                testid="notes_input"
                class="q-mt-md"
                v-model="form.notes.label"
                :label="$t('pages.marketplace.applyForm.notes.label')"
                :placeholder="$t('pages.marketplace.applyForm.notes.placeholder')"
                :rules="[rules.required,rules.lessOrEqualThanString(25)]"
              )
            .col-1
              q-icon.q-mx-md.q-pt-md(
                v-if="!form.notes.cid"
                name="upload"
                size="1.5rem"
                color="primary"
                :label="$t('pages.hcd.documents.shareDocument')"
                outline
                :disable="!form.notes.label"
                @click="onUploadNotesHCD()"
              )
              q-icon.q-mx-md(
                v-else
                name="check"
                size="1.5rem"
                color="primary"
              )
          .row.justify-start.q-gutter-md
            div(class="q-pt-sm headline3 text-weight-regular header q-mb-xl") {{$t('pages.marketplace.applyForm.filesTitle')}}
            div
              q-btn.q-mr-sm.q-mb-md(data-testid="add_files_button" rounded no-caps color="primary" outline @click="onMoreFiles") {{ $t('pages.marketplace.applyForm.addFilesButton') }}
          .container(v-for="(file, index, key) in form.files" :key="index")
            .row
              div {{$t('pages.marketplace.taxCredits.labels.attributeLabel')}}
            .row
              ConfidentialDocsInput.col-11(
                v-model:label="form.files[index].label"
                v-model:value="form.files[index].file"
                :rulesLabel="[rules.required, rules.lessOrEqualThanString(25)]"
                :rulesValue="[rules.required]"
                testid="file"
              )
              .row.q-pl-md.justify-between.items-start.q-pt-sm
                q-icon(
                  v-if="!form.files[index].cid"
                  name="upload"
                  class="col-3 q-pb-xs cursor-pointer"
                  size="1.5rem"
                  @click="onUploadHCD({data: form.files[index], index})"
                )
                q-icon(
                  v-else
                  name="check"
                  class="col-3 q-pb-xs"
                  size="1.5rem"
                )
                q-icon(
                  rounded
                  class="col-3 q-pb-xs cursor-pointer"
                  size="1.5rem"
                  name="delete"
                  label="delete file"
                  color="red"
                  @click="onDeleteFile(index)"
                  data-cy="delete_file"
                  data-testid="delete_file"
                )
          .row.justify-center.q-px-sm
            q-btn(
              type="submit"
              color="primary"
              rounded
              no-caps
              unelevated
              class="q-mt-sm btn-lg"
              data-cy="submit_apply_btn"
              data-testid="submit_apply_btn"
            ) {{ $t('pages.marketplace.applyForm.submitButton') }}
</template>

<script>
import AccountItem from '~/components/common/account-item.vue'
import AccountInput from '~/components/common/account-input.vue'
import { validation } from '~/mixins/validation'
import ConfidentialDocsInput from '~/components/common/confidentialDocs/confidential-docs-input.vue'
import { mapGetters } from 'vuex'
import { authentication } from '~/mixins/authentication'
export default {
  name: 'MarketApplyForm',
  components: { AccountItem, ConfidentialDocsInput, AccountInput },
  mixins: [validation, authentication],
  props: {
    /**
     * This props contains the market information to display [Required]
     * @type {Object}
     */
    market: {
      type: Object,
      required: true
    }
  },
  emits: ['onSubmitApplyForm'],
  data () {
    return {
      prefixHCD: 'HCD:',
      form: {
        notes: {
          label: undefined,
          cid: undefined
        },
        files: [
          {
            label: undefined,
            file: undefined,
            cid: undefined
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['selectedAccount']),
    getAdmin () {
      return this.market?.admin?.address
    }
  },
  methods: {
    async onUploadNotesHCD () {
      const notes = this.form.notes.label
      try {
        const service = this.$store.$hcd
        const adminAddress = this.getAdmin
        this.showLoading()
        const { cid } = await service.shareData({
          toUserAddress: adminAddress,
          name: 'Notes',
          description: 'Notes of the application',
          payload: notes
        })
        this.form.notes.cid = 'HCD:' + cid
        this.showNotification({ message: this.$t('pages.hcd.documents.successSharedMessage') })
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onUploadHCD ({ data, index }) {
      if (!data?.label || !data?.file) {
        this.showNotification({ message: 'Field is missing', color: 'negative' })
        return
      }
      try {
        const { label: name, file: payload } = data
        const service = this.$store.$hcd

        this.showLoading()

        const { cid } = await service.shareData({
          toUserAddress: this.getAdmin,
          name,
          description: 'Notes of the application',
          payload
        })

        this.form.files[index].cid = 'HCD:' + cid
        this.showNotification({ message: this.$t('pages.hcd.documents.successSharedMessage') })
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    onSubmit () {
      const files = this.form.files.map(file => {
        return {
          label: file.label,
          cid: file.cid
        }
      })
      const data = {
        fields: [{ label: 'Notes', cid: this.form.notes.cid }, ...files]
      }
      let flag = true
      data.fields.forEach(field => {
        if (!field.cid) flag = false
      })
      if (flag) {
        this.$emit('onSubmitApplyForm', data)
      } else {
        this.showNotification({ message: 'You must upload the file using the Upload icon', color: 'negative' })
      }
    },
    onMoreFiles () {
      this.form.files.push({
        label: undefined,
        file: undefined,
        cid: undefined
      })
    },
    onDeleteFile (index) {
      this.form.files.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
