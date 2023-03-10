import PolkadotApi from '~/services/polkadotApi'

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

export function encodedAddress ({ polkadotAddress }) {
  const polkadotApi = new PolkadotApi()
  return polkadotAddress && polkadotApi.parseAddressToss58(polkadotAddress, '9072')
}

export function loginType ({ loginType }) {
  return loginType
}

export function isHCDLogged ({ loginType }) {
  return (loginType === 'hcd')
}
