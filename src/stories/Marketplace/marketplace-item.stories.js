import MarketplaceItem from '~/components/marketplace/marketplace-item.vue'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'Marketplace/MarketplaceItem',
  component: MarketplaceItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketplaceItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<div class="flex flex-center"><MarketplaceItem v-bind="args" @onClickItem="args.onClickItem"/> </div>'
})

export const Item = Template.bind({})
Item.args = {
  marketplace: {
    id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
    value: {
      label: 'Marketplace 1'
    },
    administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
    owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
  }
}

Item.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const item = canvas.getByTestId('marketplaceItem')
  await expect(item).toBeInTheDocument()
  await userEvent.click(item)
  await expect(args.onClickItem).toHaveBeenCalledTimes(1)
}
