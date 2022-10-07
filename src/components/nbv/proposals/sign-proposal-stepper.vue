<template lang="pug">
#container
  q-stepper(
    v-model="step"
    animated
    ref="stepper"
    flat
  )
    q-step.minH(
      :name="steps.exportPsbt"
      :title="$t('pages.nbv.proposals.titleStep1')"
      icon="qr_code"
      :done="step > steps.exportPsbt"
    )
      .row
        .col-6
          psbt-qr-viewer(v-if="psbtQR" :qrs="psbtQR")
        .col
          .text-bold Notes:
          ul
            li First you have to import the vault on Blue Wallet, if you don't know how do that, please check the
              a(href="https://github.com/hashed-io/hashed-network-portal-ui/blob/dev/docs/tutorials/native_bitcoin_vault_user_guide.md#refExportVault" target="_blank").span.link  documentation.
            //- li.q-mt-sm If is the first time you sign a transaction using this vault you must import your XPUB's seeds on Blue Wallet, please check the
            //-   span.link  documentation.
          #Steps
            .text-bold How to sign a transaction:
            .text-caption Follow the next steps from Blue Wallet app. Also you can see ours
              a(href="https://github.com/hashed-io/hashed-network-portal-ui/blob/dev/docs/tutorials/native_bitcoin_vault_user_guide.md#refSignProposal" target="_blank").span.link  tutorials.
            ol
              li Enter on 'name vault'
              li Tap on "Send" button.
              li Tap on "..." button, positioned on top right corner.
              li Tap on "Sign a transaction" option.
              li Scan this qr from Blue Wallet.
              li When appear "Co-sign this transaction" message tap on "Yes" button.
              li Tap on "Provide signature" button, now you should see a QR.
              li Finally click on "Continue" button on this modal (Web).
          //- .text-body2.q-mt-md {{ $t('pages.nbv.proposals.signPsbtStep1') }}
    q-step.minH(
      :name="steps.importPsbt"
      :title="$t('pages.nbv.proposals.titleStep2')"
      icon="qr_code_scanner"
      :done="step > steps.importPsbt"
    )
      .row
        .col-7
          psbt-qr-scanner.q-pa-md(@onScanned="onPSBTScanned")
        .col
          .text-bold How to import and save a signed transaction:
          .text-caption You can see ours tutorials.
              a(href="https://github.com/hashed-io/hashed-network-portal-ui/blob/dev/docs/tutorials/native_bitcoin_vault_user_guide.md#refSignProposal" target="_blank").span.link  How to sign a proposal.
          ol
            li Tap on "Provide signature" button, now you should see a QR.
            li {{ $t('pages.nbv.proposals.signPsbtStep2') }}
            li Sign "Save" transaction using Polkadot extension.
    //- q-step.minH(
    //-   :name="steps.finalize"
    //-   :title="$t('pages.nbv.proposals.titleStep3')"
    //-   icon="settings"
    //-   :done="step > steps.finalize"
    //-   :disable="!canShowLastStep"
    //- )
    //-   .column.minH
    //-     .col
    //-         .row.items-center.q-col-gutter-sm.q-mb-md
    //-             .col-6
    //-                 q-btn.full-width(
    //-                     :label="$t('pages.nbv.proposals.saveBtn')"
    //-                     color="secondary"
    //-                     no-caps
    //-                     outline
    //-                     @click="savePsbt"
    //-                     :disabled="!signedPsbt"
    //-                 )
    //-                 q-tooltip(v-if="alreadySigned") You already signed
    //-             .col
    //-                 .text-body2 {{ $t('pages.nbv.proposals.signPsbtSaveDesc') }}
    //-     .col
    //-         .row.items-center.q-col-gutter-sm.q-mb-md
    //-             .col-6
    //-                 q-btn.full-width(
    //-                     :label="$t('pages.nbv.proposals.finalizeBtn')"
    //-                     color="secondary"
    //-                     no-caps
    //-                     outline
    //-                     @click="finalizePsbt"
    //-                     :disabled="(!canFinalize || isFinalized || isBroadcasted)"
    //-                 )
    //-                 q-tooltip(v-if="(isFinalized || isBroadcasted)") Already finalized
    //-             .col
    //-                 .text-body2 {{ $t('pages.nbv.proposals.signPsbtFinalizeDesc') }}
    //-     .col
    //-         .row.items-center.q-col-gutter-sm.q-mb-md
    //-             .col-6
    //-                 q-btn.full-width(
    //-                     :label="$t('pages.nbv.proposals.broadcastBtn')"
    //-                     color="secondary"
    //-                     no-caps
    //-                     outline
    //-                     @click="broadcastPsbt"
    //-                     :disabled="(!canBroadcast || isBroadcasted)"
    //-                 )
    //-                 q-tooltip(v-if="isBroadcasted") Already broadcasted
    //-             .col
    //-                 .text-body2 {{ $t('pages.nbv.proposals.signPsbtBroadcastDesc') }}
    template(v-slot:navigation)
      q-stepper-navigation
        .row.justify-between
          q-btn(:disabled="!(step > 1)" @click="$refs.stepper.previous()" flat color="primary" label="Back" class="q-ml-sm")
          q-btn(v-if="step !== steps.importPsbt" @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'")
</template>

<script>
import PsbtQrViewer from '~/components/nbv/proposals/psbt-qr-viewer'
import PsbtQrScanner from '~/components/nbv/proposals/psbt-qr-scanner'
import { Encoder, Decoder } from '@smontero/nbv-ur-codec'

/**
 * This component handler all status to sign a psbt
 */
export default {
  name: 'SignProposalStepper',
  components: { PsbtQrViewer, PsbtQrScanner },
  props: {
    /**
     * Proposal PSBT
     */
    psbt: {
      type: String,
      default: undefined
    },
    /**
     * Boolean to know if the proposal can be finalized
     */
    canFinalize: {
      type: Boolean,
      default: false
    },
    /**
     * Boolean to know if the proposal can be broadcasted
     */
    canBroadcast: {
      type: Boolean,
      default: false
    },
    /**
     * Boolean to know if the current user already sign the psbt
     */
    alreadySigned: {
      type: Boolean,
      default: false
    },
    /**
     * Boolean to know if the proposal was broadcasted
     */
    isBroadcasted: {
      type: Boolean,
      default: false
    },
    /**
     * Boolean to know if the proposal was finalized
     */
    isFinalized: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onSavePsbt', 'onFinalizePsbt', 'onBroadcastPsbt'],
  data () {
    return {
      step: 1,
      steps: {
        exportPsbt: 1,
        importPsbt: 2,
        finalize: 3
      },
      psbtQR: undefined,
      signedPsbt: undefined
    }
  },
  computed: {
    canShowLastStep () {
      return (this.signedPsbt || this.canFinalize || this.alreadySigned)
    }
  },
  watch: {
    psbt () {
      this.getPsbtQR()
    }
  },
  beforeMount () {
    this.getPsbtQR()
    if (this.alreadySigned) {
      this.step = this.steps.finalize
    }
  },
  methods: {
    getPsbtQR () {
      try {
        this.showLoading()
        const encoder = new Encoder()
        this.psbtQR = encoder.psbtToQRCode(this.psbt, 200)
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onPSBTScanned (data) {
      try {
        this.showLoading()
        const decoder = new Decoder()
        this.signedPsbt = decoder.decodePSBT(data)
        await this.$nextTick()
        // this.savePsbt()
        setTimeout(() => {
          this.savePsbt()
          // this.$refs.stepper.next()
        }, 500)
      } catch (e) {
        console.error('error', e)
        this.showNotification({ message: e.message || e, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    savePsbt () {
      /**
       * Emitted when the user click on save psbt button
       */
      this.$emit('onSavePsbt', this.signedPsbt)
    },
    finalizePsbt () {
      /**
       * Emitted when the user click on finalize psbt button
       */
      this.$emit('onFinalizePsbt', this.signedPsbt)
    },
    broadcastPsbt () {
      /**
       * Emitted when the user click on broadcast psbt button
       */
      this.$emit('onBroadcastPsbt', this.signedPsbt)
    }
  }
}
</script>

<style lang="stylus" scoped>
.stepContainer
  width: 25vw
  max-width: 80vw

.minH
 height: 70vh
</style>
