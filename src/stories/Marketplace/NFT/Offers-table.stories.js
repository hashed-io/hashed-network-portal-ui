import { expect } from '@storybook/jest'
import OffersTable from '~/components/marketplace/NFTs/offers-table.vue'
import { within, userEvent } from '@storybook/testing-library'
import { ref } from 'vue'
import { action } from '@storybook/addon-actions'
export default {
  title: 'NFT/OffersTable',
  component: OffersTable
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { OffersTable },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<OffersTable v-bind="args" @onDeleteOffer="args.onDeleteOffer" @onTakeBuyOffer="args.onTakeBuyOffer" @onTakeSellOffer="args.onTakeSellOffer" @openModalSell="args.openModalSell" @openModalBuy="args.openModalBuy" />'
})

export const BaseInput = Template.bind({})
BaseInput.args = {
  offers: [
    {
      offerId: '0x194638334eff34ff5965ed0b335e5647106788053bbe3cf763793a6c467557eb',
      marketplaceId: '0xb3914e1762ff9ca8caec57959715350885632a8a323b8c160fc814600669ad33',
      collectionId: '0',
      itemId: '0',
      percentage: '1.00%',
      creator: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      price: '2,000',
      fee: '7.00%',
      status: 'Open',
      creationDate: '1,674,065,724,000',
      expirationDate: '1,674,670,524,000',
      offerType: 'SellOrder',
      buyer: null,
      label: 'Afloat M3',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      verified: null
    },
    {
      offerId: '0x739ec3070b79646040d4358b91eab7cb48002429f80c218e57f98e4b74a3c5d7',
      marketplaceId: '0xb3914e1762ff9ca8caec57959715350885632a8a323b8c160fc814600669ad33',
      collectionId: '0',
      itemId: '0',
      percentage: '5.00%',
      creator: '5ChSU9uHtrePYHfwUgdcQ6MFaAK6ACc9GQYMthgyiMovvGDG',
      price: '4,000',
      fee: '7.00%',
      status: 'Open',
      creationDate: '1,674,065,754,000',
      expirationDate: '1,674,670,554,000',
      offerType: 'BuyOrder',
      buyer: null,
      label: 'Afloat M3',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      verified: null
    }
  ],
  ownerTax: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB'
}
BaseInput.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const deleteOffer = canvas.getByTestId('delete-button')
  const takeBuyOffer = canvas.getByTestId('take-buy-offer-button')

  await expect(deleteOffer).toBeInTheDocument()
  await expect(takeBuyOffer).toBeInTheDocument()

  await userEvent.click(deleteOffer)
  await expect(args.onDeleteOffer).toHaveBeenCalledTimes(1)

  await userEvent.click(takeBuyOffer)
  await expect(args.onTakeBuyOffer).toHaveBeenCalledTimes(1)
}

export const OwnerTable = Template.bind({})
OwnerTable.args = {
  offers: [],
  ownerTax: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB'
}

export const BuyerTable = Template.bind({})
BuyerTable.args = {
  offers: [
    {
      offerId: '0x194638334eff34ff5965ed0b335e5647106788053bbe3cf763793a6c467557eb',
      marketplaceId: '0xb3914e1762ff9ca8caec57959715350885632a8a323b8c160fc814600669ad33',
      collectionId: '0',
      itemId: '0',
      percentage: '1.00%',
      creator: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      price: '2,000',
      fee: '7.00%',
      status: 'Open',
      creationDate: '1,674,065,724,000',
      expirationDate: '1,674,670,524,000',
      offerType: 'SellOrder',
      buyer: null,
      label: 'Afloat M3',
      owner: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym',
      verified: null
    }
  ],
  ownerTax: '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
}
