export function setAccount (state, { ssoProvider, ssoUserId, ssoImage, ssoAccount }) {
  state.ssoProvider = ssoProvider
  state.ssoUserId = ssoUserId
  state.ssoImage = ssoImage
  state.ssoAccount = ssoAccount
}
