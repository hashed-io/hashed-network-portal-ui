import { expect } from '@storybook/jest'
import NFTTable from '~/components/marketplace/NFTs/NFT-table.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'NFT/NFTTable',
  component: NFTTable
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTTable },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTTable v-bind="args" @onClickRow="args.onClickRow" @onClickDeleteOffer="args.onClickDeleteOffer" @onClickDeleteOffer="args.onClickEnlistSellOffer" />'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  uniquesList: [
    {
      collection: '0',
      instance: '2',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      isFrozen: false,
      onSale: {
        collection: '0',
        instance: '2',
        offerId: '0xd3e1d2b0f5726905c358a318ba232e22b4a4c317df9b1d0357bf62de60eacc7c'
      }
    },
    {
      collection: '0',
      instance: '1',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      isFrozen: false,
      onSale: {
        collection: '0',
        instance: '2',
        offerId: '0xd3e1d2b0f5726905c358a318ba232e22b4a4c317df9b1d0357bf62de60eacc7c'
      }
    },
    {
      collection: '0',
      instance: '3',
      owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB',
      approved: null,
      data: 'Hirving Lozano',
      isFrozen: false
    }
  ]

}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const nftName = await canvas.getAllByTestId('nft-name')
  const accountIcon = await canvas.getAllByTestId('account-icon')
  const onSaleChip = await canvas.getAllByTestId('on-sale-chip')
  const notOnSaleChip = await canvas.getAllByTestId('not-on-sale-chip')
  const deleteButton = await canvas.getAllByTestId('delete-button')
  const enlistButton = await canvas.getAllByTestId('enlist-button')

  await expect(nftName.length).toBeGreaterThan(0)
  await expect(accountIcon.length).toBeGreaterThan(0)
  await expect(notOnSaleChip.length).toBeGreaterThan(0)
  await expect(onSaleChip.length).toBeGreaterThan(0)
  await expect(deleteButton.length).toBeGreaterThan(0)
  await expect(enlistButton.length).toBeGreaterThan(0)

  await userEvent.click(deleteButton[0])
  await sleep(300)
  await expect(args.onClickDeleteOffer).toBeCalledTimes(1)
  await userEvent.click(enlistButton[0])
  await sleep(300)
  await expect(args.onClickEnlistSellOffer).toBeCalledTimes(1)
}
