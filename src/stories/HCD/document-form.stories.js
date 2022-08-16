import DocumentForm from '~/components/hcd/document-form'
import { userEvent, within } from '@storybook/testing-library'
import { action } from '@storybook/addon-actions'
import { expect } from '@storybook/jest'

export default {
  title: 'HCD/DocumentForm',
  component: DocumentForm,
  argTypes: {
    onShareSubmitted: { action: action('onShareSubmitted') },
    onEditSubmitted: { action: action('onEditSubmitted') },
    onAddSubmitted: { action: action('onAddSubmitted') }
  }
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DocumentForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<DocumentForm v-bind="args" @onShareSubmitted="args.onShareSubmitted" @onEditSubmitted="args.onEditSubmitted" @onAddSubmitted="args.onAddSubmitted"/>'
})

export const AddDocument = Template.bind({})
AddDocument.args = {
  name: undefined,
  description: undefined,
  cid: 'a45asd654ads',
  payload: undefined,
  isEditing: false,
  isAdding: true,
  isSharing: false,
  shared: false
}

export const EditDocument = Template.bind({})
EditDocument.args = {
  name: 'Old document name',
  description: 'This is my old document description',
  cid: 'a45asd654ads',
  payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
  isEditing: true,
  isAdding: false,
  isSharing: false,
  shared: false
}

AddDocument.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const nameInput = canvas.getByTestId('nameInput')
  const descriptionInput = canvas.getByTestId('descriptionInput')
  const fileInput = canvas.getByTestId('fileInput')

  await userEvent.type(nameInput, 'This is a name to test')
  await userEvent.type(descriptionInput, 'This is a short description')

  const file = new File(['file test'], 'testFile.pdf', { type: 'file/pdf' })
  await userEvent.upload(fileInput, file)

  await userEvent.click(canvas.getByTestId('submitBtn'))

  await expect(args.onAddSubmitted).toHaveBeenCalledTimes(1)
}

EditDocument.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const nameInput = canvas.getByTestId('nameInput')
  const descriptionInput = canvas.getByTestId('descriptionInput')
  // const shareToggleInput = canvas.getByTestId('shareToggleInput')
  // const accountInput = canvas.getByTestId('accountInput')
  // const submitBtn = canvas.getByTestId('submitBtn')

  await userEvent.clear(nameInput)
  await userEvent.type(nameInput, 'This is a new name to test')
  await userEvent.clear(descriptionInput)
  await userEvent.type(descriptionInput, 'This is a new short description')

  await userEvent.click(canvas.getByTestId('submitBtn'))

  await expect(args.onEditSubmitted).toHaveBeenCalledTimes(1)
  // await expect(args.onAddSubmitted).toHaveBeenCalledTimes(1)
}
