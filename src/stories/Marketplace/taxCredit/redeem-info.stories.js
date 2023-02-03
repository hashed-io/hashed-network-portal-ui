import RedeemInfo from '~/components/marketplace/taxCredit/redeem-info.vue'
import { RedeemStatus, Roles } from '~/const'
export default {
  title: 'TaxCredits/RedeemInfo',
  component: RedeemInfo
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { RedeemInfo },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<QCard flat bordered><RedeemInfo v-bind="args" class="q-pa-md"/></QCard>'
})

export const OwnerRequest = Template.bind({})
OwnerRequest.args = {
  status: RedeemStatus.REDEEM_NOT_REQUESTED,
  role: Roles.OWNER
}

export const OwnerRequested = Template.bind({})
OwnerRequested.args = {
  status: RedeemStatus.REDEEM_REQUESTED,
  role: Roles.OWNER
}

export const AdminRequest = Template.bind({})
AdminRequest.args = {
  status: RedeemStatus.REDEEM_REQUESTED,
  role: Roles.ADMIN
}

export const AdminApproved = Template.bind({})
AdminApproved.args = {
  status: RedeemStatus.REDEEM_APPROVED,
  role: Roles.ADMIN
}
