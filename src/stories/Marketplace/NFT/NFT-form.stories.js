import { expect } from '@storybook/jest'
import NFTForm from '~/components/marketplace/NFTs/NFT-form.vue'
import { userEvent, within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'NFT/NFTForm',
  component: NFTForm
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTForm v-bind="args" @onSubmitForm="args.onSubmitForm" />'
})
const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))
export const BaseComponent = Template.bind({})
BaseComponent.args = {
  adminMarketAddress: '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG'
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const letters = 'Lorem Ipsum'

  const name = await canvas.getByTestId('metadata')
  await userEvent.type(name, 'The best NFT', { delay: 10 })

  const addAttr = await canvas.getByTestId('add-attribute')
  await expect(addAttr).toBeInTheDocument()

  await userEvent.click(addAttr)

  const NFTLabelArray = await canvas.getAllByTestId('nft-label')
  const NFTValueArray = await canvas.getAllByTestId('nft-plaintext')

  await expect(NFTLabelArray[0]).toBeInTheDocument()
  await expect(NFTValueArray[0]).toBeInTheDocument()
  await expect(NFTLabelArray[1]).toBeInTheDocument()
  await expect(NFTValueArray[1]).toBeInTheDocument()

  await userEvent.type(NFTLabelArray[0], letters, { delay: 1 })
  await userEvent.type(NFTValueArray[0], letters, { delay: 1 })
  await userEvent.type(NFTLabelArray[1], letters + '2', { delay: 1 })
  await userEvent.type(NFTValueArray[1], letters + '2', { delay: 1 })

  const submitBtn = await canvas.getByTestId('submit-btn')
  await userEvent.click(submitBtn)
  await sleep(1000)
  await expect(args.onSubmitForm).toBeCalledTimes(1)
}

export const WithFileInput = Template.bind({})
WithFileInput.args = {
  adminMarketAddress: '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG'
}
WithFileInput.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const letters = 'Lorem Ipsum'

  const name = await canvas.getByTestId('metadata')
  await userEvent.type(name, 'The best NFT', { delay: 10 })

  const NFTLabelArray = await canvas.getAllByTestId('nft-label')
  const options = await canvas.getAllByRole('radio')

  await expect(NFTLabelArray[0]).toBeInTheDocument()
  await expect(options[0]).toBeInTheDocument()

  await userEvent.click(options[0])

  const toggle = await canvas.getByTestId('toggle')
  await expect(toggle).toBeInTheDocument()
  await userEvent.click(toggle)

  await userEvent.type(NFTLabelArray[0], letters, { delay: 1 })
  const file = new File(['Lorem Ipsum'], 'Doc.pdf', { type: 'file/pdf' })

  const NFTValueArray = await canvas.getAllByTestId('nft-file')
  await expect(NFTValueArray[0]).toBeInTheDocument()
  await userEvent.upload(NFTValueArray[0], file)

  const submitBtn = await canvas.getByTestId('submit-btn')
  await userEvent.click(submitBtn)
  await sleep(10)
  await expect(args.onSubmitForm).toBeCalledTimes(1)
}
