<template lang="pug">
q-form.q-pa-xl.q-gutter-y-md(@submit="submitForm" ref="form")
  .minH
    q-btn.float-right(
      icon="close"
      round
      color="negative"
      v-close-popup
      size="sm"
    )
    .text-h4.q-mb-lg {{ $t('pages.nbv.vaults.createNewVault')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-input(
          data-testid="vault-name-input"
          data-cy="vault-name-input"
          outlined
          :label="$t('pages.nbv.vaults.label')"
          v-model="description"
          :rules="[rules.required]"
        )
      .col
        .text-body2 {{ $t('pages.nbv.vaults.descriptionLabel')  }}
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-slider(
          data-testid="vault-cosigner-amount"
          :model-value="cosignersAmount"
          @change="val => { cosignersAmount = val }"
          marker-labels
          markers
          drag-range
          snap
          :inner-min="2"
          :min="1"
          :max="7"
          track-color="grey-4"
          inner-track-color="grey"
          label-always
        )
      .col
        //- .text-body2 {{ $t('pages.nbv.vaults.cosigners')  }} amount
        .text-body2 Number of cosigners
    .row.items-center.q-col-gutter-md.q-my-sm
      .col-7
        q-slider(
          data-testid="vault-cosigner-amount"
          v-model="threshold"
          marker-labels
          markers
          drag-range
          snap
          :inner-min="2"
          :inner-max="cosignersAmount"
          :min="1"
          :max="7"
          track-color="grey-4"
          inner-track-color="grey"
          label-always
        )
      .col
        .text-body2 Minimum {{ $t('pages.nbv.vaults.threshold')  }}
    //- .row.items-center.q-col-gutter-md.q-my-sm
    //-   .col-7
    //-     q-range(
    //-       data-testid="vault-threshold-input"
    //-       v-model="thresholdRange"
    //-       marker-labels
    //-       markers
    //-       drag-range
    //-       snap
    //-       :min="minCosigners"
    //-       :max="7"
    //-       debounce="500"
    //-     )
    //-   .col
    //-     .text-body2 {{ $t('pages.nbv.vaults.cosigners')  }}
    .row.items-center.q-col-gutter-md.q-my-md.q-mb-xl
      .text-body2.text-right You are creating a {{ `${threshold} of ${cosignersAmount}`  }} multisignature vault
      //- .col-7
        //- .text-body2.text-right {{ `${thresholdRange.min} / ${thresholdRange.max}`  }}
      //- .col
      //-   //- .text-body2 {{ $t('pages.nbv.vaults.mOfn')  }}
      //-   .text-body2 Multisignature vault
    #cosigners
      .row
        .col-7
          .row.justify-between.q-mr-sm.q-mb-sm
            .text-subtitle2 {{ $t('pages.nbv.vaults.cosigners')  }}
            //- q-btn(
            //-   icon="add"
            //-   size="sm"
            //-   color="secondary"
            //-   label="Add"
            //-   @click="addNewCosigner"
            //- )
      .row.items-center.q-col-gutter-md.q-mb-sm
        .col-7
          .row.items-center.q-mb-md(v-if="includeOwnerAsCosigner")
            .col
              account-input(
                data-testid="vault-cosigner-input-own"
                data-cy="vault-cosigner-input-own"
                :label="$t('pages.nbv.vaults.accountAddress')"
                v-model="ownerAddress"
                outlined
                readonly
              )
            q-icon.icon-btn.q-mb-md(
              size="md"
              name="delete"
              color="negative"
              @click="includeOwnerAsCosigner = false"
              v-if="cosigners.length > 1"
            )
          .row.items-center(v-for="cosigner in cosigners")
            .col
              account-input(
                data-testid="vault-cosigner-input"
                data-cy="vault-cosigner-input"
                :label="$t('pages.nbv.vaults.accountAddress')"
                v-model="cosigner.address"
                outlined
                :rules="[rules.required, rules.isValidPolkadotAddress, rules.notOwnAccount(signer), notDuplicatedAccounts]"
              )
            q-icon.icon-btn.q-mb-md(
              size="md"
              name="delete"
              color="negative"
              @click="removeCosigner(cosigner.id)"
              v-if="cosigners.length > 1"
            )
        .col
          .text-body2 {{ $t('pages.nbv.vaults.cosignersLabelDesc')  }}
    .q-col-gutter-md.q-my-sm
      q-toggle(data-testid="toggle-include" data-cy="toggle-include" :label="$t('pages.nbv.vaults.includeOwnerAsCosigner')" v-model="includeOwnerAsCosigner")
    q-btn.float-right.q-mb-md(
        data-testid="submitButton"
        data-cy="submitButton"
        :label="$t('pages.nbv.vaults.createVault')"
        color="primary"
        size="md"
        type="submit"
        no-caps
    )
</template>

<script>
import { validation } from '~/mixins/validation'
import AccountInput from '~/components/common/account-input'

/**
 * Form to create a new vault
 */
export default {
  name: 'CreateProposalForm',
  components: { AccountInput },
  mixins: [validation],
  props: {
    /**
     * User address to sign
     * This field is used to some validations
     */
    signer: {
      type: String,
      default: undefined
    }
  },
  emits: ['submittedForm'],
  data () {
    return {
      description: undefined,
      threshold: 2,
      includeOwnerAsCosigner: true,
      thresholdRange: {
        min: 1,
        max: 1
      },
      cosignersAmount: 3,
      cosigners: [{
        id: 0,
        address: undefined
      },
      {
        id: 1,
        address: undefined
      }],
      ownerAddress: undefined
    }
  },
  computed: {
    minCosigners () {
      return 1
    },
    maxCosigners () {
      if (this.includeOwnerAsCosigner) {
        return this.cosigners.length + 1
      }
      return this.cosigners.length
    },
    realCosignerNumber () {
      let result = this.cosignersAmount
      if (this.includeOwnerAsCosigner) {
        result -= 1
      }
      return result
    }
  },
  watch: {
    async includeOwnerAsCosigner () {
      await this.$nextTick()
      this.setCosigners()
      this.$refs.form.validate()
    },
    async cosigners () {
      await this.$nextTick()
      this.$refs.form.resetValidation()
    },
    async 'cosignersAmount' () {
      this.setCosigners()
    }
  },
  mounted () {
    this.thresholdRange.max = 2
    this.ownerAddress = this.signer
  },
  methods: {
    async setCosigners () {
      const newLength = this.realCosignerNumber
      await this.$nextTick()
      const currentLength = this.cosigners.length
      await this.$nextTick()
      if (currentLength > newLength) {
        const diff = currentLength - newLength
        // console.log('dif to remove', diff)
        for (let i = 0; i < diff; i++) {
          await this.$nextTick()
          this.cosigners.splice(this.cosigners.length - 1, 1)
          await this.$nextTick()
        }
      } else if (currentLength < newLength) {
        const diff = newLength - currentLength
        // console.log('dif to add', diff)
        for (let i = 0; i < diff; i++) {
          this.addNewCosigner()
        }
      }
    },
    async submitForm () {
      try {
        const data = {
          description: this.description,
          threshold: this.threshold,
          cosigners: this.cosigners.map(v => v.address),
          includeOwnerAsCosigner: this.includeOwnerAsCosigner
        }
        /**
         * This event return all data from form when is filled correctly
         */
        this.$emit('submittedForm', data)
      } catch (e) {
        console.error('submitProposal', e)
      }
    },
    addNewCosigner () {
      this.cosigners.push({
        id: this.cosigners.length,
        address: undefined
      })
    },
    async removeCosigner (cosignerId) {
      const index = this.cosigners.findIndex(e => e.id === cosignerId)
      this.cosigners.splice(index, 1)
      await this.$nextTick()
      this.thresholdRange.max = this.cosigners.length
    },
    notDuplicatedAccounts (account) {
      const exist = this.cosigners.filter(e => e.address === account)
      if (exist && exist.length > 1) {
        return this.$t('pages.nbv.vaults.accountDuplicated')
      } return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.minH
 height: 640px
</style>
