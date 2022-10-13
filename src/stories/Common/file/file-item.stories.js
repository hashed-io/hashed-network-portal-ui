import { expect } from '@storybook/jest'
import FileItem from '~/components/common/file/file-item.vue'
import { within, userEvent } from '@storybook/testing-library'
import asset from '../../../assets/portal/luhnLights.png'
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
const file = new File([asset], 'image.png', { type: 'image/png' })
export const FileElement = Template.bind({})
FileElement.args = {
  cid: 'QmPrjgMKdNbeq3aHFaapwgQY5CJsA9UoZWtayo2QZ9TZPz',
  displayName: 'image.png',
  payload: file
}

FileElement.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const fileElement = canvas.getByTestId('fileElement')
  await userEvent.click(fileElement)
  const displayName = canvas.getByTestId('displayName')
  await expect(displayName).toBeInTheDocument()
  const fileSize = canvas.getByTestId('fileSize')
  await expect(fileSize).toBeInTheDocument()
}
