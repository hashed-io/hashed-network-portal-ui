import PasswordConfidentialDocs from '~/components/common/login/password-confidential-docs.vue'
import { userEvent, within } from '@storybook/testing-library'
import { action } from '@storybook/addon-actions'
// import { expect, jest } from '@storybook/jest'
import { expect } from '@storybook/jest'

export default {
  title: 'Common/Login/PasswordConfidentialDocs',
  component: PasswordConfidentialDocs,
  argTypes: {
    onSubmitted: { action: action('onSubmitted') }
  }
}

// const methods = {
//   onSubmitted: action('onSubmitted')
// }

// const spyOnSubmitted = jest.spyOn(methods, 'onSubmitted')

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { PasswordConfidentialDocs },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // methods,
  // Then, the spread values can be accessed directly in the template
  template: '<passwordConfidentialDocs v-bind="args" @onSubmit="args.onSubmitted"/>'
})

export const Base = Template.bind({})
Base.args = {
  ssoProvider: 'Google',
  ssoUserId: '123',
  ssoImage: 'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png',
  displayName: 'jmgayosso',
  ssoAccount: {}
}

Base.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const passwordInput = canvas.getByTestId('passwordInput')
  await userEvent.type(passwordInput, 'P4sswordT3st!')
  await userEvent.click(canvas.getByTestId('loginBtn'))
  await expect(args.onSubmitted).toHaveBeenCalledTimes(1)
  // await expect(spyOnSubmitted).toHaveBeenCalledTimes(1)
}
