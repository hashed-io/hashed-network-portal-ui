import DocumentItem from '~/components/hcd/document-item'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'HCD/DocumentItem',
  component: DocumentItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DocumentItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<DocumentItem v-bind="args" @onDownload="args.onDownload" @onEdit="args.onEdit" @onShare="args.onShare" @onRemove="args.onRemove"/>'
})

export const IsOwner = Template.bind({})
IsOwner.args = {
  name: 'My Custom document',
  description: 'This is just a document test',
  cid: 'ADsdhjsa786asdg',
  owner: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  from: undefined,
  to: undefined,
  payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
  isOwner: true,
  isSharedWithMe: false,
  isShared: false
}

export const IsShared = Template.bind({})
IsShared.args = {
  name: 'My Custom document',
  description: 'This is just a document test',
  cid: 'ADsdhjsa786asdg',
  owner: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  from: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  to: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
  isOwner: false,
  isSharedWithMe: false,
  isShared: true
}

export const IsSharedWithMe = Template.bind({})
IsSharedWithMe.args = {
  name: 'My Custom document',
  description: 'This is just a document test',
  cid: 'ADsdhjsa786asdg',
  owner: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  from: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  to: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
  payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
  isOwner: false,
  isSharedWithMe: true,
  isShared: false
}

IsOwner.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const downloadBtn = canvas.getByTestId('downloadBtn')
  const editBtn = canvas.getByTestId('editBtn')
  const shareBtn = canvas.getByTestId('shareBtn')
  const removeBtn = canvas.getByTestId('removeBtn')

  await expect(downloadBtn).toBeInTheDocument()
  await userEvent.click(downloadBtn)
  await expect(args.onDownload).toHaveBeenCalledTimes(1)

  await expect(editBtn).toBeInTheDocument()
  await userEvent.click(editBtn)
  await expect(args.onEdit).toHaveBeenCalledTimes(1)

  await expect(shareBtn).toBeInTheDocument()
  await userEvent.click(shareBtn)
  await expect(args.onShare).toHaveBeenCalledTimes(1)

  await expect(removeBtn).toBeInTheDocument()
  await userEvent.click(removeBtn)
  await expect(args.onRemove).toHaveBeenCalledTimes(1)
}

IsShared.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const downloadBtn = canvas.getByTestId('downloadBtn')

  await expect(downloadBtn).toBeInTheDocument()
  await userEvent.click(downloadBtn)
  await expect(args.onDownload).toHaveBeenCalledTimes(1)
}

IsSharedWithMe.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const downloadBtn = canvas.getByTestId('downloadBtn')
  const editBtn = canvas.getByTestId('editBtn')
  const removeBtn = canvas.getByTestId('removeBtn')

  await expect(downloadBtn).toBeInTheDocument()
  await userEvent.click(downloadBtn)
  await expect(args.onDownload).toHaveBeenCalledTimes(1)

  await expect(editBtn).toBeInTheDocument()
  await userEvent.click(editBtn)
  await expect(args.onEdit).toHaveBeenCalledTimes(1)

  await expect(removeBtn).toBeInTheDocument()
  await userEvent.click(removeBtn)
  await expect(args.onRemove).toHaveBeenCalledTimes(1)
}
