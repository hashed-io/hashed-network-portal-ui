export function setProfile (state, { profilePicture, profileName, loginType, polkadotAddress }) {
  state.profilePicture = profilePicture
  state.profileName = profileName
  state.loginType = loginType
  state.polkadotAddress = polkadotAddress
}

export function cleanProfile (state) {
  state.profilePicture = undefined
  state.profileName = undefined
  state.loginType = undefined
  state.polkadotAddress = undefined
}
