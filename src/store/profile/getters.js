export function isLogged ({ profileName, loginType, polkadotAddress }) {
  return !!(polkadotAddress && profileName && loginType)
}

export function profileInfo (state) {
  return state
}

export function polkadotAddress ({ polkadotAddress }) {
  return polkadotAddress
}
