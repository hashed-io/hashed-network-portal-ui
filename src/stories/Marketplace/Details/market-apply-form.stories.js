import { expect } from '@storybook/jest'
// import { expect } from '@storybook/jest'
import MarketApplyForm from '~/components/marketplace/details/market-apply-form.vue'
import { userEvent, within } from '@storybook/testing-library'
import { mapMutations } from 'vuex'
import asset from '../../../assets/portal/logo-gradient-white.png'
export default {
  title: 'Marketplace/ApplyForm',
  component: MarketApplyForm
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketApplyForm },
  beforeMount () {
    this.setSelectedAccount('5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym')
  },
  methods: {
    ...mapMutations('polkadotWallet', ['setSelectedAccount'])
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<MarketApplyForm v-bind="args" @onSubmitApplyForm="args.onSubmitApplyForm"/>'
})

export const ApplyFormSuccessWithoutCustodian = Template.bind({})
ApplyFormSuccessWithoutCustodian.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' }
  }
}

ApplyFormSuccessWithoutCustodian.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const notesInput = await canvas.getByTestId('notes_input')
  await userEvent.type(notesInput, 'Important notes')
  // const custodianToggle = await canvas.getByTestId('custodian_toggle')
  // await userEvent.click(custodianToggle)
  const addFilesButton = canvas.getByTestId('add_files_button')
  await expect(addFilesButton).toBeInTheDocument()

  const filenameInput = canvas.getAllByTestId('filename')[1]
  await userEvent.type(filenameInput, 'File 1')

  const fileInput = canvas.getAllByTestId('qFile')[0]
  const file = new File([asset], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(fileInput, file)

  const submitButton = canvas.getByTestId('submit_apply_btn')
  await userEvent.click(submitButton)
}

export const ApplyFormSuccessWithCustodian = Template.bind({})
ApplyFormSuccessWithCustodian.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' }
  }
}
ApplyFormSuccessWithCustodian.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const custodianAddress = '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG'
  const notesInput = await canvas.getByTestId('notes_input')
  await userEvent.type(notesInput, 'Important notes', { delay: 1 })
  const custodianToggle = await canvas.getByTestId('custodian_toggle')
  await userEvent.click(custodianToggle)
  const custodian = canvas.getByTestId('account_input')
  await userEvent.type(custodian, custodianAddress, { delay: 1 })
  const addFilesButton = canvas.getByTestId('add_files_button')
  await expect(addFilesButton).toBeInTheDocument()
  const filenameInput = canvas.getAllByTestId('filename')[1]
  await userEvent.type(filenameInput, 'File 1', { delay: 1 })

  const fileInput = canvas.getAllByTestId('qFile')[0]
  const file = new File([asset], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(fileInput, file)

  const submitButton = canvas.getByTestId('submit_apply_btn')
  await userEvent.click(submitButton)
}
export const ApplyFormFailure = Template.bind({})
ApplyFormFailure.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' }
  }
}
ApplyFormFailure.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const notesInput = await canvas.getByTestId('notes_input')
  await userEvent.clear(notesInput)

  const custodianToggle = await canvas.getByTestId('custodian_toggle')
  await userEvent.click(custodianToggle)

  const custodian = canvas.getByTestId('account_input')
  await userEvent.clear(custodian)

  const addFilesButton = canvas.getByTestId('add_files_button')
  await expect(addFilesButton).toBeInTheDocument()

  const filenameInput = canvas.getAllByTestId('filename')[1]
  await userEvent.clear(filenameInput)

  const fileInput = canvas.getAllByTestId('qFile')[0]
  await userEvent.clear(fileInput)

  const submitButton = canvas.getByTestId('submit_apply_btn')
  await userEvent.click(submitButton)
}

// export const MarketplaceFormFailed = Template.bind({})
// MarketplaceFormFailed.args = {
// }

// MarketplaceFormFailed.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   const labelInput = canvas.getByTestId('HInput')
//   await userEvent.clear(labelInput)
//   const submitButton = canvas.getByTestId('submit_btn')
//   await userEvent.click(submitButton)
//   await expect(args.onSubmittedForm).toHaveBeenCalledTimes(0)
// }
