export function isLogged ({ profileName, loginType, profilePicture }) {
  return !!(polkadotAddress && profileName && loginType && profilePicture)
}

export function profileInfo (state) {
  return state
}

export function polkadotAddress ({ polkadotAddress }) {
  return polkadotAddress
}
