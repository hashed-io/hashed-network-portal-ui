import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import SignProposalHCD from '../../../components/nbv/proposals/sign-proposal-hcd.vue'

export default {
  title: 'NBV/Proposals/SignProposalHCD',
  component: SignProposalHCD
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SignProposalHCD },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  methods: {
    onSignPsbt ({ next, psbt }) {
      args.onSignPsbt({ next, psbt })
      next()
    }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<SignProposalHCD v-bind="args" @onSignPsbt="onSignPsbt" @onSavePsbt="args.onSavePsbt" />'
})

export const Base = Template.bind({})
Base.args = {
  psbt: '78687abs6d75v6as5d67v4a5s6d4cas65d'
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve(), ms))

Base.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const stepTriggerBtn = await canvas.getByTestId('stepTriggerBtn')

  await expect(stepTriggerBtn).toHaveTextContent('Continue')
  await expect(canvas.getAllByText('Click continue to sign PSBT.')[0]).toBeInTheDocument()
  await userEvent.click(stepTriggerBtn)
  await sleep(1000)
  await expect(args.onSignPsbt).toBeCalledTimes(1)
  await expect(stepTriggerBtn).toHaveTextContent('Finish')
  await expect(canvas.getAllByText('Click finish to save signed PSBT.')[0]).toBeInTheDocument()
  await userEvent.click(stepTriggerBtn)
  await sleep(1000)
  await expect(args.onSavePsbt).toBeCalledTimes(1)
}
