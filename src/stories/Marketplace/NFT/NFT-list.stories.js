import { expect } from '@storybook/jest'
import NFTList from '~/components/marketplace/NFTs/NFT-list.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'NFT/NFTList',
  component: NFTList
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTList },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTList v-bind="args" @onClickUnique="args.onClickUnique" />'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  uniquesList: [
    {
      classId: '4',
      owner: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      issuer: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      admin: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      freezer: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      totalDeposit: '546,666,661,200',
      freeHolding: false,
      items: '1',
      itemMetadatas: '0',
      attributes: [
        {
          attribute: 'Expiration Date',
          value: '2030'
        },
        {
          attribute: 'Title',
          value: 'VA Land Prez Credit'
        }
      ],
      isFrozen: false
    },
    {

      classId: '8',
      owner: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      issuer: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      admin: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      freezer: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S',
      totalDeposit: '646,666,660,200',
      freeHolding: false,
      items: '1',
      itemMetadatas: '0',
      attributes: [
        {
          attribute: '$num_value',
          value: '0x00000000'
        },
        {
          attribute: 'KYC file',
          value: 'File:QmPXfBHCrLYW2aVpDA3tcJjPDu7YCBVd29kvSReHqF396B'
        }
      ],
      isFrozen: false
    }
  ]
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const uniqueItems = await canvas.getAllByTestId('nft-item')
  await expect(uniqueItems.length).toBeGreaterThan(0)

  const uniqueItem = uniqueItems[0]
  await userEvent.click(uniqueItem)
  await expect(args.onClickUnique).toHaveBeenCalledTimes(1)
}

export const EmptyList = Template.bind({})
EmptyList.args = { uniquesList: [] }
EmptyList.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const emptyList = await canvas.getByTestId('empty-list')
  await expect(emptyList).toBeInTheDocument()
}
