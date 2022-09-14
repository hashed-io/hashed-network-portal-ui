import { expect } from '@storybook/jest'
import NFTInput from '~/components/marketplace/NFTs/NFT-input.vue'
import { userEvent, within } from '@storybook/testing-library'
import { ref } from 'vue'
// import { mapMutations } from 'vuex'
export default {
  title: 'NFT/NFTInput',
  component: NFTInput
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NFTInput },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    const value = ref()
    const label = ref()
    // Story args can be spread into the returned object
    return { value, label, args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<NFTInput v-bind="args" v-model:label="label" v-model:value="value"  @onRemoveAttribute="args.onRemoveAttribute" />'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  label: 'label',
  value: 'value',
  index: 1,
  rulesLabel: [],
  rulesValue: []
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const NFTLabel = await canvas.getByTestId('nft-label')
  await expect(NFTLabel).toBeInTheDocument()

  const NFTValue = await canvas.getByTestId('nft-value')
  await expect(NFTValue).toBeInTheDocument()

  await userEvent.type(NFTLabel, 'Lorem ipsum', { delay: 1 })
  await userEvent.type(NFTValue, 'Lorem ipsum', { delay: 1 })

  const removeAttr = await canvas.getByTestId('remove-attribute')
  await userEvent.click(removeAttr)
  await expect(args.onRemoveAttribute).toHaveBeenCalledTimes(1)
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
}
