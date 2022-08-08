<template lang="pug">
#containerComponent
 .row.justify-center
  .col-10
    .row.justify-center.q-my-sm
      q-avatar(size="100px")
        img(:src="ssoImage")
    .text-body2.text-center {{ displayName }}
    #desc
      .text-body2.text-bold.q-my-md You are trying to login through  {{ ssoProvider }}, please write your 'Hashed Confidential Docs' password.
    q-form(@submit="onSubmit")
        q-input(
          v-model="password"
          label="Password"
          type="password"
          outlined
          :rules="[rules.required, rules.password]"
          lazy-rules
          autofocus
        )
        .row.q-mt-sm.reverse.q-col-gutter-sm
          .col
            q-btn.full-width(
              label="Login"
              color="primary"
              no-caps
              type="submit"
            )
          .col
            q-btn.full-width(
              label="Cancel"
              color="negative"
              no-caps
              v-close-popup
            )
</template>

<script>
import { validation } from '~/mixins/validation'

/**
 * Form to get password used to HCD
 */
export default {
  name: 'PasswordConfidentialDocs',
  mixins: [validation],
  props: {
    ssoProvider: {
      type: String,
      default: undefined
    },
    ssoUserId: {
      type: String,
      default: undefined
    },
    ssoImage: {
      type: String,
      default: undefined
    },
    displayName: {
      type: String,
      default: undefined
    },
    ssoAccount: {
      type: Object,
      default: () => undefined
    }
  },
  emits: ['onSubmit'],
  data () {
    return {
      password: undefined
    }
  },
  methods: {
    onSubmit () {
      const data = {
        password: this.password,
        ssoProvider: this.ssoProvider,
        ssoUserId: this.ssoUserId,
        ssoImage: this.ssoImage,
        ssoAccount: this.ssoAccount
      }
      this.$emit('onSubmit', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
