<template lang='pug'>
q-form(
  @submit="onSubmit"
)
  .row.justify-around(v-if="withData")
    .col-4
      h-input(
        v-model="form.metadata"
        label="Title for your internal use on our site"
        placeholder="Title of tax credit"
        :rules="[rules.required]"
      )
      h-input(
        v-model="form.initialAmount"
        label="Initial Amount (as shown on grant)"
        placeholder="Ex. $10000"
        :rules="[rules.required]"
      )
      h-input(
        v-model="form.currentBalance"
        label="Current Credit Balance"
        :rules="[rules.required]"
      )
      h-input(
        v-model="state"
        disable
        label="State"
        :rules="[rules.required]"
      )
      h-input(
        v-model="typeCredit"
        label="Type of Credit"
        disable
        :rules="[rules.required]"
      )
      h-input(
        v-model="form.expirationDate"
        label="Expiration Date"
        placeholder="Ex. 2024"
        :rules="[rules.required]"
      )
      #CaliforniaForm.q-py-md(v-if="isCalifornia")
        .section.row.justify-between.cursor-pointer(@click="this.hidden = !this.hidden")
          .text-subtitle1.text-bold {{'Original Tax Credit Recipient'}}
          q-icon(
            :name="hidden ? 'expand_more' : 'chevron_right' "
            size="24px"
          )
        .formContainer.q-pt-md(v-show="hidden")
          q-checkbox.q-py-md(
            v-model="recipient.SMLLC"
            label="Check this box if the seller is a Single Member Limited Liability Company (SMLLC)"
            :rules="[rules.required]"
          )
          .q-py-sm.q-pl-sm {{'If you are an LLC please choose the appropiate box selecting your election to be treated as a'}}
          q-option-group(
            v-model="recipient.LLCTreatedAs"
            type="radio"
            :options="optionsLLC"
            inline
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="recipient.CFCTaxCreditCertificate"
            label="Name on CFC Tax Credit Certificate (Legal Name)"
            :rules="[rules.required]"
          )
          .q-py-md.q-pl-sm {{'Credit Holder Identification type'}}
          q-option-group(
            v-model="creditHolder"
            type="radio"
            :options="optionsCreditHolder"
            inline
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="recipient.creditHolderIDNumber"
            label="Credit Holder Identification Number"
            :rules="[rules.required]"
            :typeProp="isPwd ? 'password' : 'text'"
            :mask="getMask"
            fill-mask
          )
            template(v-slot:append)
              q-icon(
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pt-md"
                size="20px"
                @click="isPwd = !isPwd"
              )
          h-input.q-py-sm(
            v-model="recipient.streetAddress"
            label="Street Address or P.O. Box Number"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="recipient.CASecretaryNumber"
            label="CA Secretary of State File Number"
            :rules="[rules.required, val => /^(19|20)([0-9]){10}/.test(val) || 'Please enter a valid CA Secretary of State File Number. (Begin with 19 or 20)' ]"
            maxlength="12"
          )
          h-input.q-py-sm(
            v-model="recipient.city"
            label="City"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="recipient.state"
            label="State"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="recipient.zipCode"
            label="Zip Code"
            :rules="[rules.required, rules.lessOrEqualThanString(5)]"
            maxlength="5"
          )
      #WisconsinForm.q-py-md(v-if="isWisconsin")
        .section.row.justify-between.cursor-pointer(@click="this.hidden = !this.hidden")
          .text-subtitle1.text-bold {{'Transferor Information'}}
          q-icon(
            :name="hidden ? 'expand_more' : 'chevron_right' "
            size="24px"
          )
        .formContainer.q-pt-md(v-show="hidden")
          h-input.q-py-sm(
            v-model="transferorInfo.entityLegalName"
            label="Entity Legal Name"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.federalEmployerIDNumber"
            label="Federal Employer ID Number (last 4 digits)"
            :rules="[rules.required, rules.lessOrEqualThanString(4)]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.legalFirstName"
            label="Legal First Name"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.legalLastName"
            label="Legal Last Name"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.MI"
            label="M.I."
          )
          h-input.q-py-sm(
            v-model="transferorInfo.city"
            label="City"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.state"
            label="State"
            :rules="[rules.required]"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.zipCode"
            label="Zip Code"
            :rules="[rules.required, rules.lessOrEqualThanString(5)]"
            maxlength="5"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.email"
            label="Email"
            :rules="[rules.required, 'email']"
          )
          h-input.q-py-sm(
            v-model="transferorInfo.phoneNumber"
            label="Phone Number"
            fill-mask
            mask="(###) ### - ####"
            :rules="[rules.required]"
          )
      q-btn.full-width(
        type="submit"
        label="Create NFT"
        outline
        color="primary"
      )
    .col-6
      .row.justify-center
        .row.custom-width
          .col-12
            .label {{'Upload Tax Credit to be Confirmed'}}
          .col-12
            q-file(
              v-model="form.file"
              :rules="[rules.required]"
              label="Browse to Upload Tax Credit Documentation"
              outlined
              accept=".pdf"
            )
      .fileViewer
        embed(
            v-if="form.file"
            :src="getFile"
            height="800px"
            width="100%"
          )

</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'TaxcreditForm',
  components: {

  },
  mixins: [validation],
  props: {
    state: {
      type: String,
      default: undefined
    },
    typeCredit: {
      type: String,
      default: undefined
    }
  },
  emits: ['onSubmitForm'],
  data () {
    return {
      form: {
        metadata: undefined,
        initialAmount: undefined,
        currentBalance: undefined,
        expirationDate: undefined,
        file: undefined
      },
      recipient: {
        SMLLC: false,
        LLCTreatedAs: undefined,
        CFCTaxCreditCertificate: undefined,
        creditHolderIDNumber: undefined,
        streetAddress: undefined,
        CASecretaryNumber: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined
      },
      transferorInfo: {
        entityLegalName: undefined,
        federalEmployerIDNumber: undefined,
        legalFirstName: undefined,
        legalLastName: undefined,
        MI: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined,
        email: undefined,
        phoneNumber: undefined
      },
      creditHolder: undefined,
      optionsLLC: [
        {
          label: 'Partnership',
          value: 'partnership'
        },
        {
          label: 'Corporation',
          value: 'corporation'
        },
        {
          label: 'N/A',
          value: 'n/a'
        }
      ],
      optionsCreditHolder: [
        {
          label: 'CA Corporation No.',
          value: 'CACorporationNo'
        },
        {
          label: 'FEIN',
          value: 'FEIN'
        }
      ],
      hidden: true,
      isPwd: false
    }
  },
  computed: {
    isCalifornia () {
      return this.state === 'California' && this.typeCredit?.includes('California')
    },
    isWisconsin () {
      return this.state === 'Wisconsin' && this.typeCredit?.includes('Wisconsin')
    },
    withData () {
      return this.state && this.typeCredit
    },
    getMask () {
      return this.creditHolder === 'FEIN' ? '##-#######' : 'C#######'
    },
    getFile () {
      const blob = new Blob([this.form.file], { type: 'application/pdf' })
      const blobURL = URL.createObjectURL(blob)
      return blobURL || undefined
    }
  },
  methods: {
    onSubmit () {
      const form = this.state === 'California' ? { publicData: { ...this.form }, toEncrypt: { ...this.recipient } } : { publicData: { ...this.form }, toEncrypt: { ...this.transferorInfo } }
      this.$emit('onSubmitForm', form)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~/css/app.styl'
.section
  background: $primary
  border-radius: 10px
  color: white
  padding: 0.5em 0.75em 0.5em
</style>
