import { expect } from '@storybook/jest'
import CollectionForm from '~/components/marketplace/collections/collection-form.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'Collection/Collection Form',
  component: CollectionForm
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CollectionForm },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CollectionForm v-bind="args" @onSubmitForm="args.onSubmitForm" />'
})
const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))

export const BaseComponent = Template.bind({})

BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const input = await canvas.getByTestId('HInput')
  const btn = await canvas.getByTestId('submit-btn')

  await expect(input).toBeInTheDocument()
  await expect(btn).toBeInTheDocument()

  await userEvent.type(input, 'The best collection', { delay: 10 })
  await userEvent.click(btn)
  await sleep(400)
  await expect(args.onSubmitForm).toBeCalledTimes(1)
}
