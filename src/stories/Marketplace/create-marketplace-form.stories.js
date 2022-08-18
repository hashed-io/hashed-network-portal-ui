import CreateMarketplaceForm from '~/components/marketplace/create-marketplace-form.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

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
    function test (data) {
      console.log('test', data)
    }
    return { args, test }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CreateMarketplaceForm v-bind="args" @submittedForm="args.submittedForm"/>'
})

export const MarketplaceForm = Template.bind({})
MarketplaceForm.args = {
}

MarketplaceForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const submitButton = canvas.getByTestId('submit_btn')
  const labelInput = canvas.getByTestId('label_input')
  await userEvent.type(labelInput, 'Marketplace 1')
  await userEvent.click(submitButton)
  // await expect(args.submittedForm).toHaveBeenCalledTimes(1)
}
