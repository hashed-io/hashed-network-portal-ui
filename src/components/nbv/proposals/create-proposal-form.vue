<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm")
    q-btn.float-right(
      icon="close"
      round
      color="negative"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg {{ $t('pages.nbv.proposals.create_proposal') }}
    #info
      .text-overline Current balance
      .text-body2 {{ currentBalanceLabel.label }}
        span.link.text-body2.q-ml-md(@click="isShowingInBTC = !isShowingInBTC") Show in {{ isShowingInBTC ? 'sats' : 'BTC' }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        .row.items-center.q-col-gutter-sm
          .col-8
            q-input.q-pt-sm(
              data-testid="amount"
              outlined
              :label="$t('pages.nbv.proposals.amountInSatoshi')"
              v-model="amountInSats"
              :rules="[rules.required, rules.positiveInteger, rules.lessOrEqualThan(currentBalanceLabel.amount || 0), rules.greaterOrEqualThan(isShowingInBTC ? 0.00000246 : 546)]"
              :suffix="isShowingInBTC ? 'BTC' : 'sats'"
            )
          .col
            q-btn.full-width.q-mb-md(
              label="Max"
              dense
              no-caps
              color="secondary"
              @click="useMaxBalance"
            )
      .col
        .text-body2 {{ $t('pages.nbv.proposals.amountDesc')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        .row.items-center.q-col-gutter-sm
          .col-8
            q-input.q-pt-sm(
              data-testid="recipient"
              outlined
              :label="$t('pages.nbv.proposals.recipientAddress')"
              v-model="recipientAddress"
              :rules="[rules.required, rules.isValidMainetBTC]"
            )
          .col
            q-btn.full-width.q-mb-md(
              label="Scan Qr"
              dense
              no-caps
              color="secondary"
              @click="modals.qrScanner = true"
            )
      .col
        .text-body2 {{ $t('pages.nbv.proposals.recipientAddressDesc')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          data-testid="description"
          outlined
          :label="$t('pages.nbv.proposals.description')"
          v-model="description"
          :rules="[rules.required]"
        )
      .col
        .text-body2 {{ $t('pages.nbv.proposals.descriptionDesc')  }}
    q-btn.float-right.q-mb-md(
        data-testid="submitButton"
        :label="$t('pages.nbv.proposals.createProposal')"
        color="primary"
        size="md"
        type="submit"
        no-caps
    )
    #modals
      q-dialog(v-model="modals.qrScanner")
        q-card.modalQrSize.q-pa-md
          .text-body2.text-weight-light Scan a valid BTC address.
          QrStream(
            ref="qrReader"
            @decode="onQrDetected"
          )
</template>

<script>
import { validation } from '~/mixins/validation'
import { QrStream } from 'vue3-qr-reader'

/**
 * Form to create a new proposal
 */
export default {
  name: 'CreateProposalForm',
  components: { QrStream },
  mixins: [validation],
  props: {
    /**
     * Current vault balance
     */
    currentBalance: {
      type: Number,
      default: undefined
    }
  },
  emits: ['submittedForm'],
  data () {
    return {
      recipientAddress: undefined,
      amountInSats: undefined,
      description: undefined,
      btcSatsRelation: 100000000,
      isShowingInBTC: false,
      modals: {
        qrScanner: false
      }
    }
  },
  computed: {
    currentBalanceLabel () {
      if (this.isShowingInBTC) {
        return {
          label: `${this.currentBalance / this.btcSatsRelation} BTC`,
          amount: this.currentBalance / this.btcSatsRelation
        }
      }
      return {
        label: `${this.currentBalance} sats`,
        amount: this.currentBalance
      }
    }
  },
  watch: {
    isShowingInBTC (v) {
      this.changeAmountTo()
    }
  },
  methods: {
    onQrDetected (v) {
      try {
        let address = v
        address = address.replace('bitcoin:', '')
        this.recipientAddress = address
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.modals.qrScanner = false
      }
    },
    changeAmountTo () {
      // const currentCurrency = this.isAmountInBTC
      const currentAmount = this.amountInSats
      if (Number.isNaN(currentAmount) || !currentAmount) {
        this.amountInSats = 0
        return
      }
      // this.isAmountInBTC = !this.isAmountInBTC
      if (this.isShowingInBTC) {
        this.amountInSats = currentAmount / this.btcSatsRelation
      } else {
        this.amountInSats = currentAmount * this.btcSatsRelation
      }
    },
    useMaxBalance () {
      if (this.isShowingInBTC) {
        this.amountInSats = this.currentBalance / this.btcSatsRelation
      } else {
        this.amountInSats = this.currentBalance
      }
    },
    async submitForm () {
      try {
        const data = {
          recipientAddress: this.recipientAddress,
          amountInSats: this.isShowingInBTC ? this.amountInSats * this.btcSatsRelation : this.amountInSats,
          description: this.description
        }
        /**
         * This event return all data from form when is filled correctly
         */
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    }
  }
}
</script>
