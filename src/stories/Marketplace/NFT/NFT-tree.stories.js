import { expect } from '@storybook/jest'
import NFTTree from '~/components/marketplace/NFTs/NFT-tree.vue'
import { within, userEvent } from '@storybook/testing-library'
import { ref } from 'vue'
// import { expect } from '@storybook/jest'
export default {
  title: 'NFT/NFTTree',
  component: NFTTree
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTTree },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTTree ref v-bind="args" />'
})

export const BaseInput = Template.bind({})
BaseInput.args = {
  uniquesList: [
    {
      collection: '0',
      instance: '0',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: true,
      isFrozen: false,
      deposit: '0',
      data: 'California Port Volume 0',
      metadata: 'California Port Volume',
      weight: '85.00%',
      parent: null,
      children: [
        {
          collectionId: '0',
          childId: '1',
          weightInherited: '15.00%',
          isHierarchical: true
        }
      ],
      onSale: {
        collection: '0',
        instance: '0',
        offerId: '0x194638334eff34ff5965ed0b335e5647106788053bbe3cf763793a6c467557eb',
        offerInfo: {
          marketplaceId: '0xb3914e1762ff9ca8caec57959715350885632a8a323b8c160fc814600669ad33',
          collectionId: '0',
          itemId: '0',
          percentage: '1.00%',
          creator: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
          price: '2,000',
          fee: '140',
          status: 'Open',
          creationDate: '1,674,065,724,000',
          expirationDate: '1,674,670,524,000',
          offerType: 'SellOrder',
          buyer: null
        }
      },
      redeem: false,
      askingForRedemption: false,
      lazy: true
    },
    {
      collection: '0',
      instance: '0',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: true,
      data: 'Wisconsin Tax',
      isFrozen: false,
      weight: '45.00%',
      parent: null,
      children: undefined,
      lazy: false
    }
  ],
  isTaxCredit: true
}
BaseInput.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
}

export const LazyLoading = Template.bind({})
LazyLoading.args = {
  uniquesList: [
    {
      collection: '0',
      instance: '0',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      data: 'California Port Volume',
      isFrozen: false,
      weight: '85.00%',
      parent: null,
      children: [{
        collectionId: '0',
        childId: '1',
        weightInherited: '15.00%',
        isHierarchical: true
      }],
      lazy: false
    }
  ],
  isTaxCredit: true
}
LazyLoading.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
}

export const SearchNode = Template.bind({})
SearchNode.args = {
  uniquesList: [
    {
      collection: '0',
      instance: '0',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      isFrozen: false,
      deposit: '0',
      data: 'California Port Volume 0',
      metadata: 'California Port Volume',
      weight: '85.00%',
      parent: null,
      children: [
        {
          collectionId: '0',
          childId: '1',
          weightInherited: '15.00%',
          isHierarchical: true
        }
      ],
      onSale: {
        collection: '0',
        instance: '0',
        offerId: '0x194638334eff34ff5965ed0b335e5647106788053bbe3cf763793a6c467557eb',
        offerInfo: {
          marketplaceId: '0xb3914e1762ff9ca8caec57959715350885632a8a323b8c160fc814600669ad33',
          collectionId: '0',
          itemId: '0',
          percentage: '1.00%',
          creator: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
          price: '2,000',
          fee: '140',
          status: 'Open',
          creationDate: '1,674,065,724,000',
          expirationDate: '1,674,670,524,000',
          offerType: 'SellOrder',
          buyer: null
        }
      },
      redeem: false,
      askingForRedemption: false,
      lazy: true
    },
    {
      collection: '0',
      instance: '2',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      isFrozen: false,
      deposit: '0',
      data: 'Wisconsin Historic Preservation 2',
      metadata: 'Wisconsin Historic Preservation',
      weight: '100.00%',
      parent: null,
      children: null,
      redeem: false,
      askingForRedemption: false,
      lazy: true
    },
    {
      collection: '0',
      instance: '3',
      owner: '5CnwFXzJ2BPyftoT9pD55pZtkK5kCXtPZy3Fg8qMq5aCwJ6E',
      approved: null,
      isFrozen: false,
      deposit: '0',
      data: 'Wyoming Port 3',
      metadata: 'Wyoming Port',
      weight: '100.00%',
      parent: null,
      children: null,
      redeem: false,
      askingForRedemption: false,
      lazy: true
    },
    {
      collection: '0',
      instance: '4',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      isFrozen: false,
      deposit: '0',
      data: 'Woyming 4',
      metadata: 'Woyming',
      weight: '100.00%',
      parent: null,
      children: null,
      redeem: false,
      askingForRedemption: true,
      lazy: true
    }
  ],
  isTaxCredit: true
}
SearchNode.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const searchInput = await canvas.getByTestId('search-input')
  const nodes = await canvas.getAllByTestId('node')
  // Includes the Child of the first node
  await expect(nodes.length).toBe(5)

  await userEvent.type(searchInput, 'California', { delay: 10 })
}
