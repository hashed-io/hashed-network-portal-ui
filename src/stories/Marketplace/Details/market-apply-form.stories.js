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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))

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
  await expect(submitButton).toBeInTheDocument()
  await userEvent.click(submitButton)
  await sleep(1000)
  await expect(args.onSubmitApplyForm).toHaveBeenCalledTimes(1)
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
  await expect(args.onSubmitApplyForm).toHaveBeenCalledTimes(1)
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
  await userEvent.type(custodian, '')

  const addFilesButton = canvas.getByTestId('add_files_button')
  await expect(addFilesButton).toBeInTheDocument()

  const submitButton = canvas.getByTestId('submit_apply_btn')
  await userEvent.click(submitButton)
  await expect(args.onSubmitApplyForm).toHaveBeenCalledTimes(0)
}

export const ApplyFormManyFiles = Template.bind({})
ApplyFormManyFiles.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' }
  }
}
ApplyFormManyFiles.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const notesInput = await canvas.getByTestId('notes_input')
  await userEvent.type(notesInput, 'Lorem ipsum', { delay: 1 })

  const addFilesButton = canvas.getByTestId('add_files_button')
  await expect(addFilesButton).toBeInTheDocument()
  await userEvent.click(addFilesButton)

  const filenameInputs = canvas.getAllByTestId('filename')
  await expect(filenameInputs.length).toBe(4)

  const filenames = canvas.getAllByTestId('filename')
  const fileInputs = canvas.getAllByTestId('qFile')
  const filenameInput = filenames[1]
  const fileInput = fileInputs[0]

  await userEvent.type(filenameInput, 'File 1')

  const file = new File([asset], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(fileInput, file)

  const filenameInput2 = filenames[3]
  const fileInput2 = fileInputs[1]

  await userEvent.type(filenameInput2, 'File 2')

  const file2 = new File([asset], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(fileInput2, file2)
  const submitButton = canvas.getByTestId('submit_apply_btn')
  await userEvent.click(submitButton)
  await expect(args.onSubmitApplyForm).toHaveBeenCalledTimes(1)
}
