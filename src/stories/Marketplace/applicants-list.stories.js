import ApplicantsList from '~/components/marketplace/applicants-list.vue'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import asset from '../../assets/portal/logo-gradient-white.png'
export default {
  title: 'Marketplace/ApplicantsList',
  component: ApplicantsList
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ApplicantsList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<ApplicantsList v-bind="args" @onEnrollApplicant="args.onEnrollApplicant" @onRejectApplicant="args.onRejectApplicant" />'
})

export const ListApplicants = Template.bind({})
ListApplicants.args = {
  showActions: true,
  applicants: [
    {
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
      address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      status: 'Rejected',
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
      address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      status: 'Pending',
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
      address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    }
  ]
}

ListApplicants.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const item = canvas.getAllByTestId('applicantExpanderItem')
  const items = canvas.getAllByTestId('accountItem')
  await expect(item).toHaveLength(3)
  await expect(item[0]).toHaveTextContent('Approved')
  await expect(item[1]).toHaveTextContent('Rejected')
  await expect(item[2]).toHaveTextContent('Pending')
  await userEvent.click(items[2])
  const feedbackInput = canvas.getAllByTestId('feedbackInput')
  await userEvent.type(feedbackInput[1], 'Lorem ipsum', { delay: 10 })

  const enrollButton = canvas.getAllByTestId('enrollButton')
  const rejectButton = canvas.getAllByTestId('rejectButton')
  await userEvent.click(enrollButton[1])
  await userEvent.click(rejectButton[0])
  await expect(args.onEnrollApplicant).toBeCalled()
  await expect(args.onRejectApplicant).toBeCalled()
}
export const EmptyList = Template.bind({})
EmptyList.args = {
  showActions: true,
  applicants: []
}
EmptyList.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const emptyCard = canvas.getByTestId('emptyApplicantsCard')
  await expect(emptyCard).toHaveTextContent('No applicants yet')
}
