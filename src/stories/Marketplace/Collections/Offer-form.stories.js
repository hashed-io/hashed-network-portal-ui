import { expect } from '@storybook/jest'
import OfferForm from '~/components/marketplace/collections/OfferForm.vue'
import { userEvent, within } from '@storybook/testing-library'
import { action } from '@storybook/addon-actions'
export default {
  title: 'Collection/Offer Form',
  component: OfferForm,
  argTypes: {
    onSubmitForm: { action: action('onSubmitForm') }
  }
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { OfferForm },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    const onSubmitForm = action('submitForm')
    return { args, onSubmitForm }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<OfferForm v-bind="args" @onSubmitForm="onSubmitForm"/>'
})
const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  collectionId: '12',
  instanceId: '34'
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const HInput = await canvas.getByTestId('HInput')

  await userEvent.type(HInput, '5000', { delay: 10 })

  const submitBtn = await canvas.getByTestId('btn')
  await expect(submitBtn).toBeInTheDocument()
  await userEvent.click(submitBtn)

  await sleep(100)

  await expect(args.onSubmitForm).toHaveBeenCalledTimes(1)
}
