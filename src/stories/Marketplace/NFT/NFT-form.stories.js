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

export const BaseComponent = Template.bind({})
BaseComponent.args = {}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const letters = 'Lorem Ipsum'
  const addAttr = await canvas.getByTestId('add-attribute')
  await expect(addAttr).toBeInTheDocument()
  await userEvent.click(addAttr)

  const NFTLabelArray = await canvas.getAllByTestId('nft-label')
  const NFTValueArray = await canvas.getAllByTestId('nft-value')

  await expect(NFTLabelArray[0]).toBeInTheDocument()
  await expect(NFTValueArray[0]).toBeInTheDocument()
  await expect(NFTLabelArray[1]).toBeInTheDocument()
  await expect(NFTValueArray[1]).toBeInTheDocument()

  await userEvent.type(NFTLabelArray[0], letters, { delay: 1 })
  await userEvent.type(NFTValueArray[0], letters, { delay: 1 })
  await userEvent.type(NFTLabelArray[1], letters + '2', { delay: 1 })
  await userEvent.type(NFTValueArray[1], letters + '2', { delay: 1 })

  const submitBtn = canvas.getByTestId('submit-btn')
  await userEvent.click(submitBtn)
  await expect(args.onSubmitForm).toBeCalledTimes(1)
}

export const WithFileInput = Template.bind({})
WithFileInput.args = {
  label: 'label',
  value: 'value',
  index: 1,
  rulesLabel: [],
  rulesValue: []
}
WithFileInput.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const NFTValue = await canvas.getByTestId('nft-value')
  await expect(NFTValue).toBeInTheDocument()

  const toggle = canvas.getByTestId('toggle')
  await userEvent.click(toggle)

  const NFTFile = await canvas.getByTestId('qFile')
  const file = new File(['file test'], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(NFTFile, file)
  await expect(NFTFile).toBeInTheDocument()

  const NFTLabel = await canvas.getByTestId('nft-label')
  await userEvent.type(NFTLabel, 'Lorem ipsum', { delay: 1 })

  const submitBtn = canvas.getByTestId('submit-btn')
  await userEvent.click(submitBtn)
  await expect(args.onSubmitForm).toBeCalledTimes(1)
}
