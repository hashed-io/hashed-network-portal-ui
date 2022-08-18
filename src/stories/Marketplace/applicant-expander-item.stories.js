import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item.vue'
// import { within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'
import asset from '../../assets/portal/logo-gradient-white.png'
export default {
  title: 'Marketplace/ApplicantExpanderItem',
  component: ApplicantExpanderItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ApplicantExpanderItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<ApplicantExpanderItem v-bind="args" @onEnroll="args.onEnroll" @onReject="args.onReject" />'
})

export const ApplicantItem = Template.bind({})
ApplicantItem.args = {
  showActions: true,
  status: 'Approved',
  fields: [
    {
      description: 'Notes',
      displayName: "I'd like to enter!",
      payload: "I'd like to enter!",
      cid: 'QmPrjgMKdNbeq3aHFaapwgQY5CJsA9UoZWtayo2QZ9TZPz'
    },
    {
      description: 'KYC FIle 1',
      displayName: 'kycDocument.pdf',
      payload: new File([asset], 'kycDocument1.pdf', { type: 'image/png' }),
      cid: 'QmRgxycMC2EftzaFrcGpuWAhq5iwgcodbaYqgqgQzKYBUZ'
    },
    {
      description: 'KYC File 2',
      displayName: 'kycDocument2.pdf',
      payload: new File([asset], 'kycDocument2.pdf', { type: 'image/png' }),
      cid: 'QmRKhL8XbSgJxo5Uupfdisy4A7ZAXgJC94kf1oGSbKxmP8'
    }
  ],
  feedback: 'Welcome!',
  marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'

}

ApplicantItem.play = async ({ args, canvasElement }) => {
  // const canvas = within(canvasElement)
  // const item = canvas.getAllByTestId('applicantExpanderItem')
  // await expect(item).toHaveLength(3)
  // await expect(item[0]).toHaveTextContent('Approved')
  // await expect(item[1]).toHaveTextContent('Rejected')
  // await expect(item[2]).toHaveTextContent('Pending')
}
