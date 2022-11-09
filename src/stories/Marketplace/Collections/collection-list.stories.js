import { expect } from '@storybook/jest'
import CollectionList from '~/components/marketplace/collections/collection-list.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'Collection/Collection List',
  component: CollectionList
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CollectionList },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<CollectionList v-bind="args" @onClickCollection="args.onClickCollection"/>'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  collectionList: [
    {
      owner: '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG',
      data: 'Panini Album',
      classId: '123'

    },
    {
      owner: '5Gk52HXvLkmzyvzxyGUPaNXH3XzKbDHpVuEH2usif7pK8kFg',
      data: 'The Best Album',
      classId: '433'
    }
  ]
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const owner = await canvas.getAllByTestId('owner')
  const name = await canvas.getAllByTestId('name')
  const _class = await canvas.getAllByTestId('class')
  const item = await canvas.getAllByTestId('collection-item')

  await expect(owner[0]).toBeInTheDocument()
  await expect(name[0]).toBeInTheDocument()
  await expect(_class[0]).toBeInTheDocument()

  await userEvent.click(item[0])
  await expect(args.onClickCollection).toHaveBeenCalledTimes(1)
}

export const EmptyList = Template.bind({})
EmptyList.args = {
  collectionList: []
}
EmptyList.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const empty = await canvas.getByTestId('empty-list')
  await expect(empty).toBeInTheDocument()
}
