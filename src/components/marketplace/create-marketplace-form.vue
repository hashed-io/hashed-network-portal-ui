<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
  q-btn.float-right(
    icon="close"
    round
    unelevated
    color="secondary"
    v-close-popup
    size="sm"
  )
  .text-h4.q-mb-lg {{ $t('pages.marketplace.createForm.title') }}
  h-input(
    data-testid
    :label="$t('pages.marketplace.createForm.label')"
    v-model="label"
    outlined
    :rules="[rules.required]"
    :placeholder="$t('pages.marketplace.createForm.placeholder')"
    autofocus
  )
  AccountInput(
    v-model="admin"
    :label="$t('pages.marketplace.adminInput')"
    :rules="admin ? [rules.isValidPolkadotAddress] : []"
  )
  .row
    h-input.col-2(
      v-model="fee"
      :label="$t('pages.marketplace.createForm.feeLabel')"
      :placeholder="$t('pages.marketplace.createForm.feePlaceholder')"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      unmasked-value
      input-class="text-right"
      :rules="[rules.required, rules.isFeeValid(9900,99)]"
      data-testid="fee-input"
    )
      template(v-slot:append)
        q-icon.q-pt-md.q-px-xs(name="percent")
  q-btn.float-right.q-mb-md(
    data-testid="submit_btn"
    outline
    unelevated
    :label="$t('pages.marketplace.createForm.button')"
    color="secondary"
    size="md"
    type="submit"
    no-caps
  )
</template>

<script>
import { validation } from '~/mixins/validation'
import AccountInput from '~/components/common/account-input.vue'

/**
 * This component is used to fill form to create a new marketplace
 */
export default {
  name: 'CreateMarketplaceForm',
  components: { AccountInput },
  mixins: [validation],
  emits: ['onSubmittedForm'],
  data () {
    return {
      label: undefined,
      admin: undefined,
      fee: undefined
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          label: this.label,
          admin: this.admin,
          fee: this.fee
        }
        /**
         * This event is emitted when the form is filled and submitted
         */
        this.$emit('onSubmittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    }
  }
}
</script>
