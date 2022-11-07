import { expect } from '@storybook/jest'
import CollectionItem from '~/components/marketplace/collections/collection-item.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'Collection/Collection Item',
  component: CollectionItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CollectionItem },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CollectionItem v-bind="args" @onClickItem="args.onClickItem"/>'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  collection: {
    owner: '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG',
    data: 'Panini Album',
    classId: '123'

  }
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const owner = await canvas.getByTestId('owner')
  const name = await canvas.getByTestId('name')
  const _class = await canvas.getByTestId('class')
  const item = await canvas.getByTestId('collection-item')

  await expect(owner).toBeInTheDocument()
  await expect(name).toBeInTheDocument()
  await expect(_class).toBeInTheDocument()

  await userEvent.click(item)
  await expect(args.onClickItem).toHaveBeenCalledTimes(1)
}
