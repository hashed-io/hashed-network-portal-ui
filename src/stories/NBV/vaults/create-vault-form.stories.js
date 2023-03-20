import CreateVaultForm from '../../../components/nbv/vaults/create-vault-form.vue'
// import { expect } from '@storybook/jest'
import { userEvent, within } from '@storybook/testing-library'
import polkadotAddresses from './polkadotAddresses'
export default {
  title: 'NBV/Vaults/CreateVaultForm',
  component: CreateVaultForm
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CreateVaultForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CreateVaultForm v-bind="args" @submittedForm="args.submittedForm"/>'
})

export const Base = Template.bind({})
Base.args = {
  signer: undefined
}
export const SuccessSubmit = Template.bind({})
SuccessSubmit.args = {
  signer: undefined
}
SuccessSubmit.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getByTestId('vault-name-input'), 'Test Vault')

  await userEvent.click(canvas.getByTestId('toggle-include'))
  const cosignerInputs = canvas.getAllByTestId('vault-cosigner-input')
  cosignerInputs.forEach(async (input, index) => {
    await userEvent.type(canvas.getAllByTestId('account_input')[index], polkadotAddresses[index], { await: 1000 })
  })

  await userEvent.click(canvas.getByTestId('submitButton'))
  // await expect(args.submittedForm).toHaveBeenCalled()
}

export const FailSubmit = Template.bind({})
FailSubmit.args = {
  signer: undefined
}
FailSubmit.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getByTestId('vault-name-input'), '')

  const cosignerInputs = canvas.getAllByTestId('vault-cosigner-input')
  cosignerInputs.forEach(async (input, index) => {
    await userEvent.type(canvas.getAllByTestId('account_input')[index], polkadotAddresses[1])
  })

  await userEvent.click(canvas.getByTestId('submitButton'))
}
