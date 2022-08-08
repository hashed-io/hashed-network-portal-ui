export function setAccount (state, { ssoProvider, ssoUserId, ssoImage, ssoAccount }) {
  state.ssoProvider = ssoProvider
  state.ssoUserId = ssoUserId
  state.ssoImage = ssoImage
  state.ssoAccount = ssoAccount
}

export function cleanAccount (state) {
  state.ssoProvider = undefined
  state.ssoUserId = undefined
  state.ssoImage = undefined
  state.ssoAccount = undefined
}
