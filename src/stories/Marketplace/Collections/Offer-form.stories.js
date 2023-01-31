// import { expect } from '@storybook/jest'
import OfferForm from '~/components/marketplace/collections/OfferForm.vue'
import { userEvent, within } from '@storybook/testing-library'
export default {
  title: 'Collection/Offer Form',
  component: OfferForm,
  argTypes: {
    onSubmitForm: { action: 'onSubmitForm' }
  }
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { OfferForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<OfferForm v-bind="args" @onSubmitForm="args.onSubmitForm"/>'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  collectionId: '12',
  instanceId: '34'
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const PriceInput = await canvas.getByTestId('price-input')
  const SelectMarket = await canvas.getByTestId('selector-market')
  const SliderPercent = await canvas.getByTestId('slider-percent')

  const submitBtn = await canvas.getByTestId('btn')

  await userEvent.type(PriceInput, '5000', { delay: 10 })
  await userEvent.click(SelectMarket)

  await userEvent.click(submitBtn)

  // await expect(args.onSubmitForm).toHaveBeenCalled()
}
