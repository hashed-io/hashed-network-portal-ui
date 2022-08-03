<template lang="pug">
q-expansion-item(group="applicants")
  template(v-slot:header)
    .row.full-width.justify-between
      account-item(:address="address" flat inherit)
      .row
        q-chip(
          v-if="marketId"
          flat
          color="primary"
          :label="marketLabel"
          class="q-mt-md text-white"
        )
        q-chip(
          v-if="!marketId"
          :label="status"
          size="md"
          :color="getColor"
          class="q-mt-md text-white"
        )
  #body.q-pa-sm
    .text-subtitle2.text-weight-regular.q-pb-md {{ $t('pages.marketplace.details.notesTitle') }}:
    #notes.q-px-sm
      .text-body2 {{ getNotes }}
    q-separator(inset).q-my-sm
    .text-subtitle2.text-weight-regular.q-pb-md {{ $t('pages.marketplace.details.filesTitle') }}:
    #files.q-px-sm
      .row.q-col-gutter-xs
        .col-6(v-for="file in getFiles")
          q-card.card-btn(bordered no-shadow v-ripple)
            file-item(v-bind="file")
              //- q-tooltip Click to open file
    #feedback
      q-input.q-mt-md(
        v-if="showActions && status !== 'Approved'"
        label="Feedback"
        v-model="feedback"
        autogrow
        outlined
      )
    .row.q-mt-sm.justify-end.q-gutter-x-sm
      q-btn(
        v-if="status !== 'Approved' && showActions"
        :label="$t('pages.marketplace.details.enrollButton')"
        color="secondary"
        size="md"
        outline
        no-caps
        @click="enroll"
        :disabled="!haveFeedback"
      )
      q-btn(
        v-if="status !== 'Rejected' && status !== 'Approved' && showActions"
        :label="$t('pages.marketplace.details.rejectButton')"
        color="negative"
        class="btn-reject"
        outline
        size="md"
        no-caps
        @click="reject"
        :disabled="!haveFeedback"
      )
  slot
</template>

<script>
import { AccountItem } from '~/components/common'
import FileItem from '~/components/common/file/file-item'
/**
 * This component display applicant's info
 */
export default {
  name: 'ApplicantExpanderItem',
  components: { AccountItem, FileItem },
  props: {
    id: {
      type: String,
      default: undefined
    },
    address: {
      type: String,
      default: undefined
    },
    fields: {
      type: Array,
      default: () => []
    },
    status: {
      type: String,
      default: undefined
    },
    showActions: {
      type: Boolean,
      default: false
    },
    marketId: {
      type: String,
      default: undefined
    }
  },
  emits: ['onEnroll', 'onReject'],
  data () {
    return {
      marketLabel: undefined,
      feedback: undefined
    }
  },
  computed: {
    getColor () {
      switch (this.status) {
      case 'Pending':
        return 'primary'
      case 'Rejected':
        return 'negative'
      case 'Approved':
        return 'blue'
      default:
        return 'primary'
      }
    },
    getNotes () {
      const notesIdentifier = 'Notes'
      const fileIdentifier = 'description'
      const notesField = this.fields.find(field => field[fileIdentifier] === notesIdentifier)
      return (notesField && typeof notesField.payload === 'object') ? notesField?.payload?.notes : notesField?.payload
    },
    getFiles () {
      return this.fields.filter(field => field.payload instanceof File)
    },
    haveFeedback () {
      return !!this.feedback
    }
  },
  async created () {
    if (this.marketId) {
      this.marketLabel = await this.getMarketplaceLabel(this.marketId)
    }
  },
  methods: {
    enroll () {
      const data = {
        id: this.id,
        address: this.address,
        notes: this.getNotes,
        files: this.getFiles,
        feedback: this.feedback
      }
      /**
       * This event is emitted when the user click on enroll button
       */
      this.$emit('onEnroll', data)
    },
    reject () {
      const data = {
        id: this.id,
        address: this.address,
        notes: this.getNotes,
        files: this.getFiles,
        feedback: this.feedback
      }
      /**
       * This event is emitted when the user click on reject button
       */
      this.$emit('onReject', data)
    },
    async getMarketplaceLabel (marketId) {
      const market = await this.$store.$marketplaceApi.getMarketplaceById({
        marketId
      })
      return market.label
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~/css/app.styl'
.card-btn:hover
  transform: scale(1.01)
  cursor: pointer
.btn-reject:hover
  color: $color-primary-dark
</style>
