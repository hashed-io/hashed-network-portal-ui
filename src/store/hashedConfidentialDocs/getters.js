export function isLogged ({ ssoAccount }) {
  return !!ssoAccount
}

export function accountInfo ({ ssoAccount }) {
  return ssoAccount
}

export function polkadotAddress ({ polkadotAddress }) {
  return polkadotAddress
}
