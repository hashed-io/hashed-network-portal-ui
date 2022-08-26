<template lang="pug">
q-expansion-item(group="applicants")
  template(v-slot:header)
    .row.full-width.justify-between
      account-item(:address="address" flat inherit data-testid="accountItem")
      .row
        q-chip(
          v-if="marketId"
          flat
          color="primary"
          :label="marketLabel"
          class="q-mt-md text-white"
          data-testid="marketLabelChip"
        )
        q-chip(
          v-if="!marketId"
          :label="status"
          size="md"
          :color="getColor"
          class="q-mt-md text-white"
          data-testid="statusChip"
        )
  #body.q-pa-sm
    .text-subtitle2.text-weight-regular.q-pb-md {{ $t('pages.marketplace.details.notesTitle') }}:
    #notes.q-px-sm
      .text-body2(data-testid="notes") {{ getNotes }}
    q-separator(inset).q-my-sm
    .text-subtitle2.text-weight-regular.q-pb-md {{ $t('pages.marketplace.details.filesTitle') }}:
    #files.q-px-sm
      .row.q-col-gutter-xs
        .col-6(v-for="file in getFiles")
          q-card.card-btn(bordered no-shadow v-ripple)
            file-item(v-bind="file" data-testid="fileItem")
              //- q-tooltip Click to open file
    #feedback
      q-input.q-mt-md(
        v-if="showActions && status !== 'Approved'"
        :label="$t('pages.marketplace.applicants.feedback')"
        v-model="feedback"
        autogrow
        outlined
        data-testid="feedbackInput"
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
        data-testid="enrollButton"
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
        data-testid="rejectButton"
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
    /**
     * The substrate address of the applicant
     *
     */
    address: {
      type: String,
      default: undefined
    },
    /**
     * The information about the applications.
     * Includes files, notes.
     */
    fields: {
      type: Array,
      default: () => []
    },
    /**
     * The status of the application  (Approved, Rejected, Pending)
     */
    status: {
      type: String,
      default: undefined
    },
    /**
     * Prop to hide or show the buttons [Enroll, Reject]
     *
     */
    showActions: {
      type: Boolean,
      default: false
    },
    /**
     * The hash of the marketplace
     */
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
  async mounted () {
    if (this.marketId) {
      this.marketLabel = await this.getMarketplaceLabel(this.marketId)
    }
  },
  methods: {
    enroll () {
      const data = {
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
      const market = await this.$store?.$marketplaceApi?.getMarketplaceById({
        marketId
      })
      return market?.label
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
