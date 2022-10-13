export function isLogged ({ profileName, loginType, polkadotAddress }) {
  return !!(polkadotAddress && profileName && loginType)
}

export function profileInfo (state) {
  return state
}

export function xpub (state) {
  return state.xpub
}

export function polkadotAddress ({ polkadotAddress }) {
  return polkadotAddress
}

export function loginType ({ loginType }) {
  return loginType
}
