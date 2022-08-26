import MarketplaceList from '~/components/marketplace/marketplace-list'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'Marketplace/MarketplaceList',
  component: MarketplaceList
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketplaceList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  methods: {
    // Example to stop the loading state
    loadMoreMarkets ({ index, done, stop }) {
      done()
    }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<MarketplaceList v-bind="args" @onSelectedMarketplace="args.onSelectedMarketplace" @onLoadMarkets="args.onLoadMarkets"/>'
})

export const ListingMarketplaces = Template.bind({})
ListingMarketplaces.args = {
  marketplaces: [
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace lorem'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace ipsum'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    }

  ]
}
ListingMarketplaces.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const marketplaceItems = canvas.getAllByTestId('marketplaceItem')
  await expect(marketplaceItems.length).toBeGreaterThan(0)
  const item = canvas.getAllByTestId('marketplaceItem')[0]
  await expect(item).toBeInTheDocument()
  await userEvent.click(item)
  await expect(args.onSelectedMarketplace).toHaveBeenCalledTimes(1)
}

export const ListingMarketplacesFiltering = Template.bind({})
ListingMarketplacesFiltering.args = {
  marketplaces: [
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace lorem'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace ipsum'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    }

  ]
}
ListingMarketplacesFiltering.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const marketplaceItems = canvas.getAllByTestId('marketplaceItem')
  await expect(marketplaceItems.length).toBeGreaterThan(0)
  const labelInput = canvas.getByTestId('HInput')
  await expect(labelInput).toBeInTheDocument()
  await userEvent.type(labelInput, 'lorem')
  await expect(labelInput).toHaveValue('lorem')
}

export const ListEmpty = Template.bind({})
ListEmpty.args = {
  marketplaces: []
}
ListEmpty.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const emptyLabel = canvas.getByTestId('emptyLabel')
  await expect(emptyLabel).toBeInTheDocument()
}
