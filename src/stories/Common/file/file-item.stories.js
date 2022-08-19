import FileItem from '~/components/common/file/file-item.vue'
import { within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'
import asset from '../../../assets/portal/logo-gradient-white.png'
export default {
  title: 'Common/FileItem',
  component: FileItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { FileItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<FileItem v-bind="args" />'
})

export const FileElement = Template.bind({})
FileElement.args = {
  cid: 'QmPrjgMKdNbeq3aHFaapwgQY5CJsA9UoZWtayo2QZ9TZPz',
  displayName: 'kycDocument.pdf',
  payload: new File([asset], 'kycDocument.pdf', { type: 'image/png' })
}

FileElement.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  console.log(canvas)
}
