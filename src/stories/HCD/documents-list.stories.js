import DocumentList from '~/components/hcd/documents-list'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'HCD/DocumentList',
  component: DocumentList
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DocumentList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<DocumentList v-bind="args" @onRemoveDocument="args.onRemoveDocument" @onEditDocument="args.onEditDocument" @onShareDocument="args.onShareDocument" @onDownloadDocument="args.onDownloadDocument"/>'
})

export const ListingItems = Template.bind({})
ListingItems.args = {
  documents: [
    {
      name: 'My Own document',
      description: 'This is just a document test',
      cid: 'ADsdhjsa786asdg',
      owner: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
      from: undefined,
      to: undefined,
      payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
      isOwner: true,
      isSharedWithMe: false,
      isShared: false
    },
    {
      name: 'My Shared document',
      description: 'This is just a document test',
      cid: 'ADsdhjsa786asdg',
      owner: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
      from: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
      to: '5HmrDB399VYxWyaz3HYsVxMt4oWMAvNd7r2DQ2FUGYSjub4V',
      payload: new File(['file test'], 'testFile.pdf', { type: 'file/pdf' }),
      isOwner: false,
      isSharedWithMe: false,
      isShared: true
    },
    {
      name: 'Document shared with me',
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
  ]
}

export const ListEmpty = Template.bind({})
ListEmpty.args = {
  documents: []
}

ListingItems.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const downloadBtn = canvas.getAllByTestId('downloadBtn')[0]
  const editBtn = canvas.getAllByTestId('editBtn')[0]
  const shareBtn = canvas.getAllByTestId('shareBtn')[0]
  const removeBtn = canvas.getAllByTestId('removeBtn')[0]

  await userEvent.click(downloadBtn)
  await expect(downloadBtn).toBeInTheDocument()
  await expect(args.onDownloadDocument).toHaveBeenCalledTimes(1)

  await expect(editBtn).toBeInTheDocument()
  await userEvent.click(editBtn)
  await expect(args.onEditDocument).toHaveBeenCalledTimes(1)

  await expect(shareBtn).toBeInTheDocument()
  await userEvent.click(shareBtn)
  await expect(args.onShareDocument).toHaveBeenCalledTimes(1)

  await expect(removeBtn).toBeInTheDocument()
  await userEvent.click(removeBtn)
  await expect(args.onRemoveDocument).toHaveBeenCalledTimes(1)
}

ListEmpty.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const emptyLabel = canvas.getByTestId('emptyLabel')
  await expect(emptyLabel).toBeInTheDocument()
}
