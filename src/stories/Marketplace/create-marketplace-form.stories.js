import { expect } from '@storybook/jest'
import CreateMarketplaceForm from '~/components/marketplace/create-marketplace-form.vue'
import { userEvent, within } from '@storybook/testing-library'

export default {
  title: 'Marketplace/MarketplaceForm',
  component: CreateMarketplaceForm
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CreateMarketplaceForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CreateMarketplaceForm v-bind="args" @onSubmittedForm="args.onSubmittedForm"/>'
})

export const MarketplaceForm = Template.bind({})
MarketplaceForm.args = {
}

MarketplaceForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const labelInput = canvas.getByTestId('label-input')
  const accountInput = canvas.getByTestId('account_input')
  const feeInput = canvas.getByTestId('fee-input')

  await userEvent.type(labelInput, 'Marketplace 1', { delay: 10 })
  await userEvent.type(accountInput, '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym', { delay: 10 })
  await userEvent.type(feeInput, '7', { delay: 10 })

  const submitButton = canvas.getByTestId('submit_btn')
  await userEvent.click(submitButton)
  await expect(args.onSubmittedForm).toHaveBeenCalledTimes(1)
}
export const MarketplaceFormFailed = Template.bind({})
MarketplaceFormFailed.args = {
}

MarketplaceFormFailed.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const labelInput = canvas.getByTestId('label-input')
  const accountInput = canvas.getByTestId('account_input')
  const feeInput = canvas.getByTestId('fee-input')

  await userEvent.clear(labelInput)
  await userEvent.type(accountInput, 'lorem', { delay: 10 })
  await userEvent.type(feeInput, '5', { delay: 10 })
  await userEvent.clear(feeInput)

  const submitButton = canvas.getByTestId('submit_btn')

  await userEvent.click(submitButton)
  await expect(args.onSubmittedForm).toHaveBeenCalledTimes(0)
}
