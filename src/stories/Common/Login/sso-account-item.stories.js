import SSOAccountItem from '~/components/common/login/sso-account-item.vue'

export default {
  title: 'Common/Login/SSOAccountItem',
  component: SSOAccountItem
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SSOAccountItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // methods,
  // Then, the spread values can be accessed directly in the template
  template: '<SSOAccountItem v-bind="args" />'
})

export const Base = Template.bind({})
Base.args = {
  profilePicture: 'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png',
  displayName: 'jmgayosso'
}
