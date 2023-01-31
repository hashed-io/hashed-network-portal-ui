// import { expect } from '@storybook/jest'
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
  template: '<NFTTree v-bind="args" />'
})

export const BaseInput = Template.bind({})
BaseInput.args = {
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
      children: undefined,
      lazy: false
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
