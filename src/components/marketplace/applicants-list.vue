<template lang="pug">
#container.q-pa-sm
  #applicantDetails(v-if="applicants.length > 0")
    q-card.q-my-md(v-for="applicant in applicants")
      applicant-expander-item(
        v-bind="{...applicant, showActions}"
        @onEnroll="onEnrollApplicant"
        @onReject="onRejectApplicant"
        data-testid="applicantExpanderItem"
      )
  #applicantDetailsEmpty(v-else)
    q-card(bordered flat)
      q-card-section()
        .text-h5.q-py-lg(data-testid="emptyApplicantsCard") {{$t('pages.marketplace.details.noApplicants')}}
</template>

<script>
import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item'

/**
 * This component handler the applicants list
 */
export default {
  name: 'ApplicantsList',
  components: { ApplicantExpanderItem },
  props: {
    /**
     * Array with the data of the applicants
     */
    applicants: {
      type: Array,
      default: () => []
    },
    /*
     *  Prop used to show the actions button in the applicant item [Enroll, reject]
     */
    showActions: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onEnrollApplicant', 'onRejectApplicant'],
  methods: {
    onEnrollApplicant (data) {
      /**
       * This event is emitted when the user do click in enroll for an list's applicant
       */
      this.$emit('onEnrollApplicant', data)
    },
    onRejectApplicant (data) {
      /**
       * This event is emitted when the user do click in reject for an list's applicant
       */
      this.$emit('onRejectApplicant', data)
    }
  }
}
</script>
