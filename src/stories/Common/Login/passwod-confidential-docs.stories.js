import PasswordConfidentialDocs from '~/components/common/login/password-confidential-docs.vue'
import { userEvent, within } from '@storybook/testing-library'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Common/Login/PasswordConfidentialDocs',
  component: PasswordConfidentialDocs,
  argTypes: {
    selectAccount: { action: action('selectAccount') }
  }
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { PasswordConfidentialDocs },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  methods: {
    submit: action('onSubmit')
  },
  // Then, the spread values can be accessed directly in the template
  template: '<passwordConfidentialDocs v-bind="args" @onSubmit="submit"/>'
})

export const Base = Template.bind({})
Base.args = {
  ssoProvider: 'Google',
  ssoUserId: '123',
  ssoImage: '',
  displayName: 'jmgayosso',
  ssoAccount: {}
}

Base.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const passwordInput = canvas.getByTestId('passwordInput')
  console.log('passwordInput', passwordInput)
  await userEvent.type(passwordInput, 'P4sswordT3st!')
  await userEvent.click(canvas.getByTestId('loginBtn'))
}
