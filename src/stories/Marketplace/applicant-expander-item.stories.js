import { expect } from '@storybook/jest'
import ApplicantExpanderItem from '~/components/marketplace/applicant-expander-item.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'
import asset from '../../assets/portal/logo-gradient-white.png'
export default {
  title: 'Marketplace/ApplicantExpanderItem',
  component: ApplicantExpanderItem,
  argTypes: {
    status: {
      options: ['Pending', 'Rejected', 'Approved'],
      control: { type: 'radio' }
    }
  }
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

export const ApplicantPending = Template.bind({})
ApplicantPending.args = {
  showActions: true,
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
  // marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'

}

ApplicantPending.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const statusChip = canvas.getByTestId('statusChip')
  await expect(statusChip).toHaveTextContent('Pending')
  const expansionItem = canvas.getByTestId('accountItem')
  await userEvent.click(expansionItem)
  const feedbackInput = canvas.getByTestId('feedbackInput')
  await userEvent.type(feedbackInput, 'I like this applicant')
  const enrollButton = canvas.getByTestId('enrollButton')
  const rejectButton = canvas.getByTestId('rejectButton')
  await expect(enrollButton).toBeEnabled()
  await expect(rejectButton).toBeEnabled()
  await userEvent.click(enrollButton)
  await expect(args.onEnroll).toHaveBeenCalledTimes(1)
  await userEvent.click(rejectButton)
  await expect(args.onReject).toHaveBeenCalledTimes(1)
  const fileItems = canvas.getAllByTestId('fileItem')
  await expect(fileItems).toHaveLength(2)
}

export const ApplicantRejected = Template.bind({})
ApplicantRejected.args = {
  showActions: true,
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
  // marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
}
ApplicantRejected.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const statusChip = canvas.getByTestId('statusChip')
  await expect(statusChip).toHaveTextContent('Rejected')
  const expansionItem = canvas.getByTestId('accountItem')
  await userEvent.click(expansionItem)
  const feedbackInput = canvas.getByTestId('feedbackInput')
  await userEvent.type(feedbackInput, 'I don\'t like this applicant')
  const enrollButton = canvas.getByTestId('enrollButton')
  const rejectButton = canvas.queryByTestId('rejectButton')
  await expect(rejectButton).toBeFalsy()
  await expect(enrollButton).toBeEnabled()
  await userEvent.click(enrollButton)
  await expect(args.onEnroll).toHaveBeenCalledTimes(1)
  const fileItems = canvas.getAllByTestId('fileItem')
  await expect(fileItems).toHaveLength(2)
}
export const ApplicantApproved = Template.bind({})
ApplicantApproved.args = {
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
  // marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
}
ApplicantApproved.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const statusChip = canvas.getByTestId('statusChip')
  await expect(statusChip).toHaveTextContent('Approved')
  const expansionItem = canvas.getByTestId('accountItem')
  await userEvent.click(expansionItem)
  const feedbackInput = canvas.queryByTestId('feedbackInput')
  await expect(feedbackInput).toBeFalsy()
  const enrollButton = canvas.queryByTestId('enrollButton')
  const rejectButton = canvas.queryByTestId('rejectButton')
  await expect(rejectButton).toBeFalsy()
  await expect(enrollButton).toBeFalsy()
  const fileItems = canvas.getAllByTestId('fileItem')
  await expect(fileItems).toHaveLength(2)
}
export const Custodian = Template.bind({})
Custodian.args = {
  showActions: false,
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
  marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
}
Custodian.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const statusChip = canvas.getByTestId('marketLabelChip')
  await expect(statusChip).not.toHaveTextContent('Approved')
  await expect(statusChip).not.toHaveTextContent('Rejected')
  await expect(statusChip).not.toHaveTextContent('Pending')
  const expansionItem = canvas.getByTestId('accountItem')
  await userEvent.click(expansionItem)
  const feedbackInput = canvas.queryByTestId('feedbackInput')
  await expect(feedbackInput).toBeFalsy()
  const enrollButton = canvas.queryByTestId('enrollButton')
  const rejectButton = canvas.queryByTestId('rejectButton')
  await expect(rejectButton).toBeFalsy()
  await expect(enrollButton).toBeFalsy()
  const fileItems = canvas.getAllByTestId('fileItem')
  await expect(fileItems).toHaveLength(2)
}

export const ApplicantWithoutFeedback = Template.bind({})
ApplicantWithoutFeedback.args = {
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
  // marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e',
  address: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
}
ApplicantWithoutFeedback.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const statusChip = canvas.getByTestId('statusChip')
  await expect(statusChip).toHaveTextContent('Approved')
  const expansionItem = canvas.getByTestId('accountItem')
  await userEvent.click(expansionItem)
  const enrollButton = canvas.queryByTestId('enrollButton')
  const rejectButton = canvas.queryByTestId('rejectButton')
  await expect(rejectButton).toBeFalsy()
  await expect(enrollButton).toBeFalsy()
}
