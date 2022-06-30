/* eslint-disable dot-notation */
// import Vue from 'vue'
import notifications from '~/mixins/notifications'
import { customIcons } from '~/mixins/icons'
// import { validation } from '~/mixins/validation'
export default async ({ app }) => {
  app.mixin(notifications)
  app.mixin(customIcons)
  // app.mixin(validation)
}
