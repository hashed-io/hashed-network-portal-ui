<template lang="pug">
#container
  div(v-if="status !== 'Pending'" class="q-py-md")
    .headline4(v-if="!isLoggedIn") Please login to apply for this market.
    .container(v-else)
      .row.justify-center
        .col-11
          .text-subtitle1.q-pb-md {{$t('pages.marketplace.applyForm.title')}}
          q-form(ref="applyForm" @submit="onSubmit")
            h-input(
              required
              data-cy="notes_input"
              testid="notes_input"
              class="q-mt-md"
              v-model="form.notes"
              :label="$t('pages.marketplace.applyForm.notes.label')"
              :placeholder="$t('pages.marketplace.applyForm.notes.placeholder')"
              :rules="[rules.required,rules.lessOrEqualThanString(25)]"
            )
            //- .paragraph1.text-weight-regular.q-pb-md {{$t('pages.marketplace.applyForm.subtitle')}}
            //- div.qItem.q-my-lg(@click="() => {this.isCustodian = !this.isCustodian}")
            //-   .row.justify-between.q-gutter-md
            q-toggle(
              @toggle="() => {this.isCustodian = !this.isCustodian}"
              v-model="isCustodian"
              color="primary"
              :label="$t('pages.marketplace.applyForm.custodian.infoLabel')"
            )
            account-input(
              v-if="isCustodian"
              v-model="custodianAddress"
              data-cy="custodian_input"
              testid="custodian_input"
              class="q-mt-md"
              :label="$t('pages.marketplace.applyForm.custodian.label')"
              outlined
              :rules="[rules.isValidPolkadotAddress, rules.notEqual(market.owner?.address), rules.notEqual(selectedAccount.address)]"
            )
            .row.justify-between
              div(class="q-pt-sm headline3 text-weight-regular header q-mb-xl") {{$t('pages.marketplace.applyForm.filesTitle')}}
              div
                q-btn.q-mr-sm.q-mb-md(rounded no-caps color="primary" outline @click="onMoreFiles") {{ $t('pages.marketplace.applyForm.addFilesButton') }}
            .container(v-for="(file, index, key) in form.files" :key="index")
              .row
                hashed-private-file(
                  class="col-11"
                  v-model="form.files[index]"
                  :index="index"
                  :administrator-address="market.admin?.address"
                  @onDelete="onDeleteFile"
                  :rules="[rules.required, rules.greaterOrEqualThanString(6), rules.lessOrEqualThanString(25)]"
                  showDelete
                  )
                q-icon(
                  rounded
                  class="col-1 q-pb-md cursor-pointer"
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
import HashedPrivateFile from '~/components/common/hashedPrivate/hashed-private-file.vue'
import { mapGetters } from 'vuex'
import { authentication } from '~/mixins/authentication'
export default {
  name: 'MarketApplyForm',
  components: { AccountItem, HashedPrivateFile, AccountInput },
  mixins: [validation, authentication],
  props: {
    /**
     * This props contains the market information to display [Required]
     * @type {Object}
     */
    market: {
      type: Object,
      required: true
    },
    /**
     * This props contains the status of the application [Required]
     * @type {Array}
     */
    status: {
      type: String,
      required: true,
      default: () => undefined
    }
  },
  emits: ['submit'],
  data () {
    return {
      isCustodian: false,
      custodianAddress: undefined,
      form: {
        notes: undefined,
        files: [
          {
            label: undefined,
            files: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('polkadotWallet', ['isLoggedIn', 'selectedAccount'])
  },
  methods: {
    onSubmit () {
      this.$refs.applyForm.validate().then(async () => {
        const data = {
          custodian: this.isCustodian ? this.custodianAddress : undefined,
          fields: [{ label: 'Notes', file: this.form.notes }, ...this.form.files]
        }
        console.log('data', data)
        // console.log('data submitted', data)
        this.$emit('submit', data)
      })
    },
    onMoreFiles () {
      this.form.files.push({
        label: undefined,
        files: []
      })
    },
    async onDeleteFile (index) {
      console.log(index)
      this.form.files.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
