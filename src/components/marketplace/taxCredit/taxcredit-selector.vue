<template lang='pug'>
.container
  q-form(ref="taxCreditForm" @submit="onSubmit")
    .row.justify-center.text-h5.text-bold Tax Credit Information
    .row.justify-center.q-pt-md
      .row.custom-width
        .col-12
          .label {{'Select the state of your tax credit'}}
        .col-12
          q-select(
            v-model="form.state"
            :rules="[rules.required]"
            :label="'Please select'"
            :options="selectors.state"
            outlined
            @update:model-value="onChangeState"
          )
    .row.justify-center.q-pt-md
      .row.custom-width
        .col-12
          .label {{'Tax Credit Type'}}
        .col-12
          q-select(
            v-model="form.type"
            :rules="[rules.required]"
            :label="'Please select'"
            :options="type[form.state]"
            outlined
          )
    .row.justify-center.q-pt-md
      .row.custom-width
        .col-12
          .label {{'Entity Type'}}
        .col-12
          q-select(
            v-model="form.entity"
            :rules="[rules.required]"
            :label="'Please select'"
            :options="selectors.entity"
            outlined
          )
    .row.justify-center
      q-btn(
        type="submit"
        label="Show Tax Credit form"
        color="primary"
        outline
      )
</template>
<script>
import { validation } from '~/mixins/validation'
export default {
  mixins: [validation],
  emits: ['onSubmit'],
  data () {
    return {
      form: {
        state: undefined,
        type: undefined,
        entity: undefined
      },
      selectors: {
        state: [
          'California',
          'Wisconsin'
        ],
        entity: [
          'Business'
        ]
      },
      type: {
        California: ['California Film Production Credit'],
        Wisconsin: ['Wisconsin Historic Preservation']
      }
    }
  },
  methods: {
    onChangeState (value) {
      this.form.type = undefined
      this.form.entity = undefined
      this.$emit('onSubmit', this.form)
    },
    onSubmit () {
      this.$refs.taxCreditForm.validate().then(success => {
        if (success) {
          this.$emit('onSubmit', this.form)
        // yay, models are correct
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
        console.log({ success })
      // const isValid = this.$refs.taxCreditForm.validate()
      // console.log({ isValid })
      // if (isValid) {
      // }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.custom-width
  width: 60%
</style>
