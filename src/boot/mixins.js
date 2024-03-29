/* eslint-disable dot-notation */
// import Vue from 'vue'
import notifications from '~/mixins/notifications'
import errorHandler from '~/mixins/errorHandler'
import { customIcons } from '~/mixins/icons'
import TInput from '~/components/common/input/t-input.vue'
import HInput from '~/components/common/input/h-input.vue'
import AccountInput from '~/components/common/account-input.vue'
import MoneyInput from '~/components/common/input/money-input.vue'
// import { validation } from '~/mixins/validation'
export default async ({ app }) => {
  app.mixin(notifications)
  app.mixin(errorHandler)
  app.mixin(customIcons)
  app.component('TInput', TInput)
  app.component('HInput', HInput)
  app.component('AccountInput', AccountInput)
  app.component('MoneyInput', MoneyInput)
  // app.mixin(validation)
}
