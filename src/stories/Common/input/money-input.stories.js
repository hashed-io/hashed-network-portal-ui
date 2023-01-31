// import { expect } from '@storybook/jest'
import MoneyInput from '~/components/common/input/money-input.vue'
import { within, userEvent } from '@storybook/testing-library'
import { ref } from 'vue'
// import { expect } from '@storybook/jest'
export default {
  title: 'Common/MoneyInput',
  component: MoneyInput
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MoneyInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    const data = ref(undefined)
    return { args, data }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<MoneyInput v-bind="args" v-model="data" />'
})

export const BaseInput = Template.bind({})
BaseInput.args = {
  isMoney: true,
  justRead: false,
  labelText: 'Lorem Ipsum',
  moneyConfig: {
    disabled: false,
    thousands: ',',
    decimal: '.',
    precision: 2
  }
}
BaseInput.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('HInput')
  await userEvent.type(input, 'Example', { delay: 10 })
}
