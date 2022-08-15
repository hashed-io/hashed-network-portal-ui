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
          data-testid="passwordInput"
        )
        .row.q-mt-sm.reverse.q-col-gutter-sm
          .col
            q-btn.full-width(
              label="Login"
              color="primary"
              no-caps
              type="submit"
              data-testid="loginBtn"
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
 * Form to write password used to HCD
 */
export default {
  name: 'PasswordConfidentialDocs',
  mixins: [validation],
  props: {
    /**
     * SSO Provider name
     */
    ssoProvider: {
      type: String,
      default: undefined
    },
    /**
     * SSO unique user id
     */
    ssoUserId: {
      type: String,
      default: undefined
    },
    /**
     * SSO URL for image profile
     */
    ssoImage: {
      type: String,
      default: undefined
    },
    /**
     * SSO user display name
     */
    displayName: {
      type: String,
      default: undefined
    },
    /**
     * SSO general account info
     */
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
      /**
       * When password is submitted
       */
      this.$emit('onSubmit', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
