import { expect } from '@storybook/jest'
import NFTItem from '~/components/marketplace/NFTs/NFT-item.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'NFT/NFTItem',
  component: NFTItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTItem },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTItem v-bind="args" @onClickItem="args.onClickItem" />'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  unique: {
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
  }
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const uniqueItem = await canvas.getByTestId('nft-item')
  await expect(uniqueItem).toBeInTheDocument()

  await userEvent.click(uniqueItem)
  await expect(args.onClickItem).toHaveBeenCalledTimes(1)
}
