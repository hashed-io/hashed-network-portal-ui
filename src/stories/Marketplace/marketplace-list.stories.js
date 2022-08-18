import MarketplaceList from '~/components/marketplace/marketplace-list'
// import { userEvent, within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

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
  // Then, the spread values can be accessed directly in the template
  template: '<MarketplaceList v-bind="args" @selectedMarketplace="args.selectMarketplace" @onLoadMarkets="args.loadMoreMarkets"/>'
})

export const ListingMarketplaces = Template.bind({})
ListingMarketplaces.args = {
  marketplaces: [
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace 1'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    },
    {
      key: 'Uint8Array',
      id: '0x13af37a45160c31bd5818ea3ceefbfdac4d72d1d571d4a69f0ecddb9f0949586',
      value: {
        label: 'Marketplace 1'
      },
      administrator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      owner: '5GEEZx22MqCvBDKtFPgTiKAVkoHp1vMTsw8e7fjtRH8Ldzsu'
    }

  ]
}

// export const ListEmpty = Template.bind({})
// ListEmpty.args = {
//   documents: []
// }

ListingMarketplaces.play = async ({ args, canvasElement }) => {
  // const canvas = within(canvasElement)
  // const downloadBtn = canvas.getAllByTestId('downloadBtn')[0]
  // const editBtn = canvas.getAllByTestId('editBtn')[0]
  // const shareBtn = canvas.getAllByTestId('shareBtn')[0]
  // const removeBtn = canvas.getAllByTestId('removeBtn')[0]

  // await userEvent.click(downloadBtn)
  // await expect(downloadBtn).toBeInTheDocument()
  // await expect(args.onDownloadDocument).toHaveBeenCalledTimes(1)

  // await expect(editBtn).toBeInTheDocument()
  // await userEvent.click(editBtn)
  // await expect(args.onEditDocument).toHaveBeenCalledTimes(1)

  // await expect(shareBtn).toBeInTheDocument()
  // await userEvent.click(shareBtn)
  // await expect(args.onShareDocument).toHaveBeenCalledTimes(1)

  // await expect(removeBtn).toBeInTheDocument()
  // await userEvent.click(removeBtn)
  // await expect(args.onRemoveDocument).toHaveBeenCalledTimes(1)
}

// ListEmpty.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   const emptyLabel = canvas.getByTestId('emptyLabel')
//   await expect(emptyLabel).toBeInTheDocument()
// }
